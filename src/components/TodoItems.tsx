'use client';
import React from 'react';
type TodoItemsProps = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
};
const TodoItems = ({ id, title, complete, toggleTodo }: TodoItemsProps) => {
  return (
    <li className='flex gap-1 items-center m-1'>
      <input
        id={id}
        required
        type='checkbox'
        className='checkbox checkbox-sm cursor-pointer peer'
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
      />
      <label
        htmlFor={id}
        className='peer-checked:line-through peer-checked:text-slate-400'>
        {title}
      </label>
    </li>
  );
};

export default TodoItems;
