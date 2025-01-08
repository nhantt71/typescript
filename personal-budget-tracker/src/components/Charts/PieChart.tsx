// src/components/Charts/PieChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  transactions: { category: string; amount: number; type: 'income' | 'expense' }[];
}

const PieChart: React.FC<Props> = ({ transactions }) => {
  const expenseData = transactions.filter((txn) => txn.type === 'expense');

  const data = {
    labels: [...new Set(expenseData.map((txn) => txn.category))],
    datasets: [
      {
        label: 'Expenses by Category',
        data: [...new Set(expenseData.map((txn) => txn.category))].map((category) =>
          expenseData
            .filter((txn) => txn.category === category)
            .reduce((sum, txn) => sum + txn.amount, 0)
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5722'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF5722'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
