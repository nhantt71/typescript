import React, { useState } from 'react';

interface Transaction {
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

interface Props {
  addTransaction: (transaction: Transaction) => void;
}

const TransactionForm: React.FC<Props> = ({ addTransaction }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    amount: '',
    date: '',
    type: 'expense',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      type: formData.type as 'income' | 'expense',
    };
    addTransaction(newTransaction);
    setFormData({ description: '', category: '', amount: '', date: '', type: 'expense' });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Category</option>
        <option value="groceries">Groceries</option>
        <option value="rent">Rent</option>
        <option value="entertainment">Entertainment</option>
      </select>
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
