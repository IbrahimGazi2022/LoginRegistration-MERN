const express = require("express");
const {
  getAllUser,
  registerController,
  loginController,
} = require("../controllers/userController");

// Router Object
const router = express.Router();

// GET ALL USERS || GET
router.get("/all-users", getAllUser);

// REGISTER USER || POST
router.post("/register", registerController);

// LOGIN USER || POST
router.post("/login", loginController);

module.exports = router;
  