import React, {useState, useEffect} from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import {deleteTask, fetchTasks} from './components/api';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks().then(data => setTasks(data));
    }, []);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const handleUpdateTask = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <TaskForm
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />
            <TaskList
                tasks={tasks}
                onEditTask={setEditingTask}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
};

export default App;
