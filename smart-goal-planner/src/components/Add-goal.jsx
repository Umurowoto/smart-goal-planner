import React, { useState } from "react";

function Add({ onAdd }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  function handleClick() {
    if (!name || !desc) return;
    onAdd(name, desc);
    setName("");
    setDesc("");
  }

  return (
    <div className="add-form">
      <input
        id="goal-name"
        type="text"
        placeholder="Goal Name"
        value={name}
        onClick={() => setName(prompt("Enter goal name") || "")}
        readOnly
      />
      <input
        id="goal-desc"
        type="text"
        placeholder="Goal Description"
        value={desc}
        onClick={() => setDesc(prompt("Enter goal description") || "")}
        readOnly
      />
      <button id="add-btn" onClick={handleClick}>Add Goal</button>
    </div>
  );
}

export default Add;
