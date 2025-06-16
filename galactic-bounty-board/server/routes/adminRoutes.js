const express = require("express");
const db = require("../db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

  const result = await db.query(`
    SELECT h.id, h.username, 
    COUNT(b.id) FILTER (WHERE b.accepted_by = h.id) AS accepted_count,
    COUNT(b.id) FILTER (WHERE b.created_by = h.id) AS posted_count
    FROM hunters h
    LEFT JOIN bounties b ON h.id = b.accepted_by OR h.id = b.created_by
    GROUP BY h.id
  `);

  res.json(result.rows);
});

module.exports = router;
