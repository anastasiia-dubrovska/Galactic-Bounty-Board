const express = require("express");
const router = express.Router();
const {
  getAllBounties,
  createBounty,
  acceptBounty,
  getMyBounties,
} = require("../controllers/bountyController");
const auth = require("../middleware/authMiddleware");

router.get("/", getAllBounties);
router.post("/", auth, createBounty);
router.post("/accept/:id", auth, acceptBounty);
router.get("/my", auth, getMyBounties);

module.exports = router;
