import Category from '../models/Category.js';

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name, user: req.user._id });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getCategories, addCategory };
