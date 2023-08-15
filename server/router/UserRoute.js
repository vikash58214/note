import express, { response } from "express";
import UserModel from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { UserName, Password } = req.body;

  const userr = await UserModel.findOne({ UserName });

  if (userr) {
    return res.json({ message: "user already exist" });
  }
  const hassedPassword = await bcrypt.hash(Password, 10);
  const newUser = new UserModel({ UserName, Password: hassedPassword });
  await newUser.save();
  res.json({ message: "user Register successfully" });
});

router.post("/login", async (req, res) => {
  const { UserName, Password } = req.body;
  const user = await UserModel.findOne({ UserName });
  if (!user) {
    return res.json({ message: "invalid" });
  }
  const validPassword = await bcrypt.compare(Password, user.Password);
  if (!validPassword) {
    return res.json({ message: "invalid Password" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, UserName, user: user._id });
});

export { router as userRouterr };
