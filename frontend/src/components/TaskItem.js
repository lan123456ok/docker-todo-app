import React from 'react';

const TaskItem = ({ task, onEditTask, onDeleteTask }) => {
  return (
    <li>
      {task.title}
      <button onClick={() => onEditTask(task)}>Edit</button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
