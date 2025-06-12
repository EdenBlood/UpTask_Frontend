import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import type { ConfirmToken } from '@/types/index'
import TokenForm from '@/components/auth/TokenForm'
import NewPasswordToken from '@/components/auth/NewPasswordToken'
import authService from '@/services/authService'

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken] = useState<boolean>(false)

  

  const { mutate, isPending } = useMutation({
    mutationFn: authService.confirmTokenNewPassword,
    onSuccess: (msg: string | undefined) => {
      toast.success(msg)
      setIsValidToken(true)
    },
    onError: ({message}: {message: string}) => {
      toast.error(message)
    }
  })
  
  const handleChange = (token: ConfirmToken['token']) => setToken(token)

  const handleComplete = (token: ConfirmToken['token']) => mutate({token})

  return ( 
    <>
      <h1 className="text-5xl font-black text-white">Restablecer el Password</h1>
      <p className="text-2xl font-light text-white mt-5">Llena el formulario y recibirás un {''}
        <span className="text-fuchsia-500 font-bold"> código de confirmación</span>
      </p>

      {!isValidToken ? (
        <>
          <TokenForm token={token} isPending={isPending} handleChange={handleChange} handleComplete={handleComplete} />
        </>
      ) : (
        <NewPasswordToken token={token}/>
      )}
      <nav className='mt-5 flex flex-col gap-5'>
        <Link 
        className='text-center text-md text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal' 
        to="/auth/request-change-password-code">Solicitar un nuevo Código</Link>

        <Link 
          className='text-center text-md text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal' 
          to="/auth/login">¿Ya tienes una cuenta? Inicia sesión aquí</Link>


        <Link 
          className='text-center text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal text-md' 
          to="/auth/register">¿No tienes cuenta? Regístrate aquí</Link>
      </nav>
    </>
  )
}