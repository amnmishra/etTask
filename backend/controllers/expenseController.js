import Expense from '../models/Expense.js';

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addExpense = async (req, res) => {
  const { date, amount, category, description } = req.body;
  try {
    const expense = await Expense.create({ date, amount, category, description, user: req.user._id });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { date, amount, category, description } = req.body;
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    expense.date = date;
    expense.amount = amount;
    expense.category = category;
    expense.description = description;
    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await expense.remove();
    res.json({ message: 'Expense removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getExpenses, addExpense, updateExpense, deleteExpense };
