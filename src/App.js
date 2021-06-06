import Header from "./components/Header";
import Tasks from './components/Tasks';
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  const title = "Task Scheduler"
  const [showAddTask, setAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter((task) => task.id !== id));
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });
    const data = await res.json();

    setTasks(tasks.map((task) => {
      if (task.id === id) {
        task.reminder = data.reminder;
      }
      return task;
    }))
  }

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    console.log(data);
    setTasks([...tasks, data]);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id: id, ...task };
    // setTasks([...tasks, newTask]);
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Header title={title} number={101} addTask={showAddTask} onFormToggle={() => setAddTask(!showAddTask)} />
        <Route path='/' exact render={() => {
          return (<>

            {showAddTask && <AddTask addTask={addTask} />}
            {tasks.length > 0
              ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)
              : ('No tasks')
            }
          </>)
        }} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;