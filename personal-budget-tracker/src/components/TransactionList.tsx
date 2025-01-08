// src/components/TransactionList.tsx
import React from 'react';

interface Transaction {
  description: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
}

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => (
  <div>
    <h2>Transaction List</h2>
    <ul>
      {transactions.map((txn, index) => (
        <li key={index}>
          <strong>{txn.description}</strong> - {txn.category} - ${txn.amount} ({txn.type}) on {txn.date}
        </li>
      ))}
    </ul>
  </div>
);

export default TransactionList;
