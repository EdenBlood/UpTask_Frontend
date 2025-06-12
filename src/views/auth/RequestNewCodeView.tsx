import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import type { RequestConfirmationCodeForm } from '@/types/index';
import ErrorMessage from '@/components/ErrorMessage';
import authService from '@/services/authService';
import InputSubmit from '@/components/InputSubmit';

export default function RequestNewCodeView() {
  const initialValues: RequestConfirmationCodeForm = { 
    email: ""
  }
  
  const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

  const { mutate, isPending } = useMutation({
    mutationFn: authService.requestConfirmationCode,
    onSuccess: (msg: string | undefined) => {
      toast.success(msg);
      reset();
    },
    onError: ({message}: {message: string}) => {
      toast.error(message);
    }
  })
  
  const handleRequestNewCode = (formData: RequestConfirmationCodeForm) => mutate(formData)
  
  return (
    <>
      <h1 className="text-5xl font-black text-white">Solicita Código de Confirmación</h1>
      <p className="text-2xl font-light text-white mt-5">Coloca tu Email para recibir {''}
        <span className="text-fuchsia-500 font-bold">un nuevo código</span>
      </p>

      <form
        className='form-auth'
        onSubmit={handleSubmit(handleRequestNewCode)}
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label className='font-normal text-2xl' htmlFor="email">Email:</label>
          <input 
            className='w-full p-2.5 border-gray-300 border'
            type="email"
            id="email"
            placeholder='Tu email de Registro...'
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no valido"
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <InputSubmit value={['Solicitar Código', 'Enviando Código...']} isPending={isPending} color='purple'/>
      </form>

      <nav className='mt-5 flex flex-col gap-5'>
        <Link 
          className='text-center text-md text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal' 
          to="/auth/login">¿Ya tienes una cuenta? Inicia sesión aquí</Link>

        <Link 
          className='text-center text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal text-md' 
          to="/auth/register">¿No tienes cuenta? Regístrate aquí</Link>

        <Link 
          className='text-center text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal text-md' 
          to="/auth/request-change-password-code">¿No recuerdas tu Contraseña? Recupérala aquí</Link>
      </nav>
    </>
  )
}