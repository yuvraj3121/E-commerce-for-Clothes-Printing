import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const signUpUser = async (req, res) => {
  const { userName, fullName, phoneNumber, email, password } = req.body;

  if (!userName || !fullName || !phoneNumber || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const user = await User.create({
      userName,
      fullName,
      phoneNumber,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if ((!userName && !email) || !password)
    return res
      .status(400)
      .json({ error: "Username or email and password are required" });

  try {
    const user = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id,
        userName,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export { signUpUser, loginUser };
