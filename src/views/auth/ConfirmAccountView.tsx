import { useState } from 'react'
import { Link } from "react-router-dom";
import type { ConfirmToken } from '@/types/index';
import { useMutation } from '@tanstack/react-query'
import authService from '@/services/authService';
import { toast } from 'react-toastify';
import TokenForm from '@/components/auth/TokenForm';

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  
  const { mutate, isPending } = useMutation({
    mutationFn: authService.confirmAccount,
    onSuccess: (msg: string | undefined) => {
      toast.success(msg);
      setToken('')
    },
    onError: ({message}: {message: string}) => {
      toast.error(message)
    }
  })
  
  const handleChange = (token: ConfirmToken['token']) => setToken(token)

  const handleComplete = (token: ConfirmToken['token']) => mutate({token})
  
  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">Ingresa el código que recibiste {''}
        <span className="text-fuchsia-500 font-bold">por Email</span>
      </p>

      <TokenForm token={token} isPending={isPending} handleChange={handleChange} handleComplete={handleComplete}/>

      <nav className='mt-5 flex flex-col gap-5'>
        <Link 
          className='text-center text-md text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal' 
          to="/auth/request-code">Solicitar un nuevo Código</Link>

        <Link 
          className='text-center text-md text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal' 
          to="/auth/login">¿Ya tienes una cuenta? Inicia sesión aquí</Link>

        <Link 
          className='text-center text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal text-md' 
          to="/auth/request-change-password-code">¿No recuerdas tu Contraseña? Recupérala aquí</Link>

        <Link 
          className='text-center text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal text-md' 
          to="/auth/register">¿No tienes cuenta? Regístrate aquí</Link>
      </nav>
    </>
  )
}