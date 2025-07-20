import React from 'react';

function List({ goals, onDeposit, onDelete }) {
  return (
    <div>
      <h2>Goals</h2>
      {goals.length === 0 && <p>No goals yet.</p>}

      {goals.map(goal => (
        <div className="goal-card" key={goal.id}>
          <p><b>{goal.name}</b></p>
          <p>Saved: {goal.savedAmount} / {goal.targetAmount}</p>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(goal.savedAmount / goal.targetAmount) * 100}%` }}
            ></div>
          </div>

          <button onClick={() => onDeposit(goal.id)}>+100</button>
          <button onClick={() => onDelete(goal.id)} style={{ backgroundColor: 'red' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default List;
