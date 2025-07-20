import React, { useEffect, useState } from "react";
import Add from "./components/Add-goal";
import List from "./components/List";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then(res => res.json())
      .then(data => setGoals(data));
  }, []);

  function addGoal(name, desc) {
    const newGoal = {
      id: Date.now(),
      name,
      description: desc,
      savedAmount: 0
    };

    fetch("http://localhost:3001/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal)
    })
      .then(res => res.json())
      .then(data => setGoals([...goals, data]));
  }

  function deposit(id) {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, savedAmount: goal.savedAmount + 100 } : goal
    );
    setGoals(updatedGoals);
  }

  function deleteGoal(id) {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: "DELETE"
    }).then(() => {
      setGoals(goals.filter(goal => goal.id !== id));
    });
  }

  return (
    <div className="app-container">
      <h1>Smart Goal Planner</h1>
      <Add onAdd={addGoal} />
      <List goals={goals} onDeposit={deposit} onDelete={deleteGoal} />
    </div>
  );
}

export default App;
