import React from 'react';

interface Props {
  totalExpenses: number;
  budget: number;
  setBudget: (budget: number) => void;
}

const BudgetProgress: React.FC<Props> = ({ totalExpenses, budget, setBudget }) => {
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseFloat(e.target.value) || 0);
  };

  const progress = Math.min((totalExpenses / budget) * 100, 100);

  return (
    <div>
      <h2>Monthly Budget</h2>
      <div>
        <label>Set Budget: </label>
        <input
          type="number"
          value={budget || ''}
          onChange={handleBudgetChange}
          placeholder="Enter your budget"
        />
      </div>
      <div>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Budget: ${budget || 0}</p>
        <div style={{ background: '#ddd', width: '100%', height: '20px', borderRadius: '5px' }}>
          <div
            style={{
              width: `${progress}%`,
              background: totalExpenses > budget ? 'red' : 'green',
              height: '100%',
              borderRadius: '5px',
            }}
          ></div>
        </div>
        {totalExpenses > budget && <p style={{ color: 'red' }}>Warning: Budget Exceeded!</p>}
      </div>
    </div>
  );
};

export default BudgetProgress;
