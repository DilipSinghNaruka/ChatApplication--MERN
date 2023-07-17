const express = require("express");
const { registerUser, authUser, allUsers,} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.route("/login").post(authUser);

// Add the callback function for the allUsers route
router.route("/all").get(protect, (req, res) => {
  res.send("Get all users");
});

module.exports = router;
