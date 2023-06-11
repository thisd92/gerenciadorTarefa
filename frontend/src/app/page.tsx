'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateToken } from '@/services/validateToken';

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    validateToken({router});

  }, []);

  return (
    <main className="flex flex-grow flex-col items-center justify-center">
      <h1>Hello World!</h1>
    </main>
  )
}
