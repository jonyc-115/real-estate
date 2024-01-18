import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const passwordScript = await bcryptjs.hash(password, 10);

  const userFound = await User.findOne({ email });

  if (userFound)
    return res.status(400).json({ message: "el email ya esta en uso" });

  const newUser = new User({
    username: username,
    email: email,
    password: passwordScript,
  });

  const userSaved = await newUser.save();

  res.json(userSaved);
}

export async function login(req, res) {
  const { password, email } = req.body;

  const userFound = await User.findOne({ email });

  if (!userFound)
    return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcryptjs.compare(password, userFound.password);

  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json(userFound);
}
