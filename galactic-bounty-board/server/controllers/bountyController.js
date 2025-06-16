const db = require("../db");
const axios = require("axios");

const getAllBounties = async (req, res) => {
  const { planet, status } = req.query;

  let query = `
    SELECT b.*, u.username AS created_by_username, a.username AS accepted_by_username
    FROM bounties b
    LEFT JOIN hunters u ON b.created_by = u.id
    LEFT JOIN hunters a ON b.accepted_by = a.id
    WHERE 1=1
  `;
  const values = [];

  if (planet) {
    values.push(planet);
    query += ` AND planet = $${values.length}`;
  }

  if (status) {
    values.push(status);
    query += ` AND status = $${values.length}`;
  }

  const result = await db.query(query, values);
  res.json(result.rows);
};


const createBounty = async (req, res) => {
  const { title, description, target_name, planet, reward } = req.body;
  const userId = req.user.id;

  let image_url = null;

  try {
    const swapiRes = await axios.get(`https://swapi.dev/api/people/?search=${target_name}`);
    if (swapiRes.data.results.length > 0) {
      const url = swapiRes.data.results[0].url; 
      const id = url.match(/\/people\/(\d+)\//)?.[1];
      if (id) {
        image_url = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
      }
    }
  } catch (err) {
    console.log("SWAPI failed:", err.message);
  }

  const result = await db.query(`
    INSERT INTO bounties (title, description, target_name, planet, reward, created_by, status, image_url)
    VALUES ($1, $2, $3, $4, $5, $6, 'open', $7)
    RETURNING *
  `, [title, description, target_name, planet, reward, userId, image_url]);

  res.status(201).json(result.rows[0]);
};

const acceptBounty = async (req, res) => {
  const bountyId = req.params.id;
  const userId = req.user.id;

  const bounty = await db.query(`SELECT * FROM bounties WHERE id = $1`, [bountyId]);
  if (!bounty.rows.length || bounty.rows[0].accepted_by) {
    return res.status(400).json({ message: "This task is accepted or not exist" });
  }

  const result = await db.query(`
    UPDATE bounties SET accepted_by = $1, status = 'accepted' WHERE id = $2 RETURNING *
  `, [userId, bountyId]);

  res.json(result.rows[0]);
};

const getMyBounties = async (req, res) => {
  const userId = req.user.id;
  const result = await db.query(`
    SELECT * FROM bounties WHERE created_by = $1 OR accepted_by = $1
  `, [userId]);

  res.json(result.rows);
};

module.exports = { getAllBounties, createBounty, acceptBounty, getMyBounties };
