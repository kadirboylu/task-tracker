import { FaTimes, FaCheck } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle, taskDone }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        <div style={{ textDecoration: task.done ? "line-through" : "" }}>
          {task.text}
        </div>
        <div className="icons">
          {<FaCheck className="done" onClick={() => taskDone(task.id)} />}
          {<FaTimes className="delete" onClick={() => onDelete(task.id)} />}
        </div>
      </h3>
      <p style={{ textDecoration: task.done ? "line-through" : "" }}>
        {task.day}
      </p>
    </div>
  );
};

export default Task;
