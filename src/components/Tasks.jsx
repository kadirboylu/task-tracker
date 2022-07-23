import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle, taskDone }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          taskDone={taskDone}
        />
      ))}
    </>
  );
};

export default Tasks;
