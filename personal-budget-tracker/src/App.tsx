import React, { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import BudgetProgress from './components/BudgetProgress';
import PieChart from './components/Charts/PieChart';
import ExportPDF from './components/ExportPDF';

interface Transaction {
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudget] = useState<number>(0);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const totalExpenses = transactions
    .filter((txn) => txn.type === 'expense')
    .reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div>
      <h1>Personal Budget Tracker</h1>
      <BudgetProgress totalExpenses={totalExpenses} budget={budget} setBudget={setBudget} />
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} />
      <PieChart transactions={transactions} />
      <ExportPDF transactions={transactions} />;
    </div>
  );
};

export default App;
