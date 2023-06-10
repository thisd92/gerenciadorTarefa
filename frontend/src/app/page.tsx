'use client'
import axios from 'axios';
import { getCookie } from 'cookies-next'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '../../utils/request';

export default function Home() {
  const router = useRouter()

  const validarToken = async () => {
    try {
      const token = getCookie('authorization', {})

      if (!token) throw new Error("Token Inválido!")
      await axios.get(`${BASE_URL}/api/home`, {
        headers: {
          Authorization: `${token}` // Envia o token no header Authorization
        },
      });
    } catch (error) {
      const token = getCookie('authorization', {})
      router.push('/');
    }
  };

  useEffect(() => {

    validarToken();
  }, []);

  return (
    <main className="flex flex-grow flex-col items-center justify-center">
      <h1>Hello World!</h1>
    </main>
  )
}
