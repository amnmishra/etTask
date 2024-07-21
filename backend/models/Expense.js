import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;
