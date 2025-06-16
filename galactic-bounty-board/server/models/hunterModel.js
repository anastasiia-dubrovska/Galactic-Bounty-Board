const db = require("../db");

const createHunter = async (username, hashedPassword) => {
  const result = await db.query(
    "INSERT INTO hunters (username, password) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );
  return result.rows[0];
};

const findHunterByUsername = async (username) => {
  const result = await db.query(
    "SELECT * FROM hunters WHERE username = $1",
    [username]
  );
  return result.rows[0];
};

module.exports = { createHunter, findHunterByUsername };