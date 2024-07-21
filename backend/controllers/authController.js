import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export { registerUser, loginUser };
