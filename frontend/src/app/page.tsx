import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className='p-5'>
        <h1>Hello World!</h1>
      </div>
      <div className='bg-zinc-500 rounded-md p-2'>
        <a href="./login" className=''>Login</a>
      </div>
    </main>
  )
}
