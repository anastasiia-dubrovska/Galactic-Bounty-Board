const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const bountyRoutes = require("./routes/bountyRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/bounties", bountyRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API works");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
