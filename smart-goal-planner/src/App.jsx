import React, { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3001/goals";

function App() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    targetAmount: "",
    savedAmount: 0,
    category: "",
    deadline: "",
  });

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setGoals)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      ...form,
      id: Date.now().toString(),
      savedAmount: parseFloat(form.savedAmount || 0),
      targetAmount: parseFloat(form.targetAmount),
      createdAt: new Date().toISOString().split("T")[0],
    };
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        setGoals([...goals, data]);
        setForm({
          name: "",
          description: "",
          targetAmount: "",
          savedAmount: 0,
          category: "",
          deadline: "",
        });
      });
  };

  return (
    <div className="container">
      <h1>Smart Goal Planner</h1>

      <form onSubmit={handleSubmit} className="goal-form">
        <input name="name" placeholder="Goal Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input type="number" name="targetAmount" placeholder="Target Amount" value={form.targetAmount} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
        <button type="submit">Add Goal</button>
      </form>

      <h2>Goals</h2>
      {goals.length === 0 ? (
        <p>No goals yet.</p>
      ) : (
        <ul className="goal-list">
          {goals.map((goal) => (
            <li key={goal.id} className="goal-card">
              <h3>{goal.name}</h3>
              <p>{goal.description}</p>
              <p>Category: {goal.category}</p>
              <p>Saved: ${goal.savedAmount} / ${goal.targetAmount}</p>
              <p>Deadline: {goal.deadline}</p>
              <p>Created: {goal.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

