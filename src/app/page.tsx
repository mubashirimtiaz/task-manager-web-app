import Link from 'next/link';

export default function Home() {
  return (
    <div className='bg-gradient-to-r from-gray-100 to-gray-400 min-h-screen flex flex-col items-center justify-center'>
      <main className='bg-white p-10 rounded-lg shadow-xl text-center max-w-lg'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Welcome to Task Manager!
        </h1>
        <p className='text-lg text-gray-600 mb-8'>
          A simple task manager to keep track of your tasks.
        </p>

        <Link
          href='/tasks'
          className='inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition'
        >
          Get Started
        </Link>

        <div className='mt-8'>
          <div className='w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center mx-auto'>
            <span className='text-4xl text-gray-400'>📋</span>
          </div>
        </div>
      </main>
    </div>
  );
}
