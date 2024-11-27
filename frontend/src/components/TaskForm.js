import React, { useState, useEffect } from 'react';
import { addTask, updateTask } from './api';

const TaskForm = ({ onAddTask, onUpdateTask, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    } else {
      setTitle('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      // Cập nhật task
      updateTask(editingTask.id, { title }).then((updatedTask) => {
        onUpdateTask(updatedTask);
        setEditingTask(null);
      });
    } else {
      // Thêm task mới
      addTask({ title }).then((newTask) => {
        onAddTask(newTask);
      });
    }
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <button type="submit">{editingTask ? 'Update' : 'Add'} Task</button>
      {editingTask && <button onClick={() => setEditingTask(null)}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
