import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
// import  jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
//@dsc   fetch all users
//@route POST/api/users
//@access Public

const authUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  // res.send("auth user");
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token:null
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // res.json(users);

  // res.send("auth user");
  // const users = await User.find({});
  // res.json(users);
});

//@dsc   fetch single user
//@route GET /api/users/:id
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  // res.send("auth user");
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token:null
    });
    // });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  //res.send("register user");
});

//@dsc   logout user
//@route GET /api/users/logout
//@access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "logout", {
    httpOnly: true,
    //  secure: process.env.NODE_ENV !== "development",
    // sameSite: "strict",
    expires: new Date(Date.now() + 2 * 1000),
  });
  res.status(200).json({ message: " Logged out successfully" });
  // res.send("logout user");
});

//@dsc   profile user
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // res.send("get user profile");
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token:null
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@dsc   update user profile
//@route PUT /api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  // res.send("update user profile");

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    generateToken(res, updatedUser._id);
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // token:null
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@dsc   Get users
//@route GET /api/users
//@access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

//@dsc   delete user
//@route DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("You cannot delete admin");
    }
    await user.deleteOne({_id:user._id});
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  // res.send("delete user");
});

//@dsc   Get user by id
//@route GET /api/users/:id
//@access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  // res.send("get user by id");
});

//@dsc   update user
//@route PUT /api/users/:id
//@access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      // token:null
    });
  }
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
