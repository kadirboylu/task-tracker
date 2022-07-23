import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const baseURI = "http://192.168.0.29:5000/tasks";
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch(baseURI);
    const data = await response.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${baseURI}/${id}`);
    const data = await res.json();

    return data;
  };

  //Add Task
  const addTask = async (task) => {
    const res = await fetch(baseURI, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${baseURI}/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder,
      done: false,
    };

    const res = await fetch(`${baseURI}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, reminder: data.reminder, done: data.done }
          : task
      )
    );
  };

  const taskDone = async (id) => {
    const taskToDone = await fetchTask(id);
    const updTask = { ...taskToDone, done: !taskToDone.done, reminder: false };

    const res = await fetch(`${baseURI}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: data.done, reminder: data.reminder }
          : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* {showAddTask ? <AddTask onAdd={addTask} /> : ""} */}
                {/* This is the short way*/}
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                    taskDone={taskDone}
                  />
                ) : (
                  <p style={{ color: "white" }}>NO TASK TO SHOW</p>
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
