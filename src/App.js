import { useState } from "react";
import "./App.css";

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (taskText.trim() === "") return;
    setTasks([...tasks, { text: taskText, done: false }]);
    setTaskText("");
  }

  function toggleDone(index) {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  }

  function deleteTask(index) {
    const updated = tasks.filter((task, i) => i !== index);
    setTasks(updated);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") addTask();
  }

  return (
    <div className="container">
      <h1>My To-Do App</h1>

      <div className="input-row">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a task..."
        />
        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="stats">
        <div className="stat-box">
          <span>{tasks.length}</span>
          <p>Total Tasks</p>
        </div>
        <div className="stat-box">
          <span>{tasks.filter((t) => !t.done).length}</span>
          <p>Pending</p>
        </div>
        <div className="stat-box">
          <span>{tasks.filter((t) => t.done).length}</span>
          <p>Completed</p>
        </div>
      </div>

      {tasks.length === 0 && (
        <p className="empty">No tasks yet. Add one above!</p>
      )}

      {tasks.map((task, index) => (
        <div className="task-item" key={index}>
          <span className={`task-text ${task.done ? "done" : ""}`}>
            {task.text}
          </span>
          <button
            className={`done-btn ${task.done ? "undo" : ""}`}
            onClick={() => toggleDone(index)}
          >
            {task.done ? "Undo" : "Done"}
          </button>
          <button className="delete-btn" onClick={() => deleteTask(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;