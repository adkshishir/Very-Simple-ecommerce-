import Link from 'next/link';
import prisma from '@/db';
import TodoItems from '@/components/TodoItems';
import { redirect } from 'next/navigation';

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className='p-4 px-20'>
      <div className=' w-3/6 mx-auto mt-5 bg-primary rounded-2xl p-4 text-white items-center'>
        <div className='flex justify-between'>
          
          <h1>Todo App</h1>
          <Link href={'/new'} className='btn btn-secondary'>
            Add New
          </Link>
        </div>
        <ul>
          {todos.map((todo) => (
            // <li key={todo.id}>{todo.title}</li>
            <TodoItems key={todo.id} {...todo} toggleTodo={toggleTodo} />
          ))}
        </ul>
      </div>
      <form action={deleteComplete}>
        <button className='btn btn-error text-white'>Delete</button>
      </form>
    </main>
  );
}

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  'use server';
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      complete,
    },
  });
}
async function deleteComplete() {
  'use server';
  await prisma.todo.deleteMany({
    where: {
      complete: true,
    },
  });
  redirect('/');
}
