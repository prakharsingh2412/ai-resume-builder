import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ message: "User registered", user: { id: user._id, name, email } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "2d" });
    res.json({ message: "Login successful", token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
