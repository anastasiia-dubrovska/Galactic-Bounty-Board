const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createHunter, findHunterByUsername } = require("../models/hunterModel");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findHunterByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "User exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newHunter = await createHunter(username, hashedPassword);

    res.status(201).json({ message: "Sucesses registration", user: newHunter });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findHunterByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "Login or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Login or password is incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Sucess", token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error("Entry error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };