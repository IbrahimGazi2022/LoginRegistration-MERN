const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// Create User or Register User
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill all fields",
        success: false,
      });
    }

    // if user exist
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        message: "User allready exisits",
        success: false,
      });
    }

    // Password Hashded
    const hashdedPassword = await bcrypt.hash(password, 10);

    // Save User
    const user = new userModel({ username, email, password: hashdedPassword });
    await user.save();
    return res.status(201).send({
      message: "New user created",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

// Get All User
exports.getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      message: "All user data",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Get all user callback",
      success: false,
      error,
    });
  }
};

// Login User
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(401).send({
        message: "Please provid valid email or password",
        success: false,
      });
    }

    // Valid email or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "Email not registered",
        success: false,
      });
    }

    // Valid password or not
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid Username & Password",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Login Successfull",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Login Callback",
      success: false,
      error,
    });
  }
};
