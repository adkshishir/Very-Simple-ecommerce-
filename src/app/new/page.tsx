import prisma from '@/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

async function createTodo(data: FormData) {
  'use server';
  const title = data.get('title')?.valueOf();
  console.log(title);
  const image = data.get('image');
 console.log(image)
  if (typeof title !== 'string') {
    throw new Error('title is required');
  }
  title.length > 0 &&
    (await prisma.todo.create({
      data: {
        title,
        complete: false,
      },
    }));
  redirect('/');
}
const page = () => {
  return (
    <div>
      <h1 className='text-2xl'> New</h1>
      <form
        action={createTodo}
        className=' form-control bg-accent p-4 rounded-2xl'>
        <input type='text' name='title' className='input border-slate-300' />
        <div className='gap-2 float-right flex justify-end m-2'>
          <Link href={'/'} className='btn btn-secondary'>
            cancel
          </Link>
          <div className='mb-3'>
            <label
              htmlFor='formFile'
              className='mb-2 inline-block text-neutral-700 dark:text-neutral-200'>
              Default file input example
            </label>
            <input
              className='relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary'
              type='file'
              id='image'
              name='image'
            />
          </div>
          <button className='btn btn-primary'>Create</button>
        </div>
      </form>
    </div>
  );
};

export default page;
