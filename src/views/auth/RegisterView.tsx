import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import authService from '@/services/authService'

import type { UserRegistrationForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import InputSubmit from '@/components/InputSubmit'

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  }
  
  const { register, handleSubmit, watch, reset, formState: {errors} } = useForm({defaultValues: initialValues})

  const password = watch("password");

  const { mutate, isPending } = useMutation({
    mutationFn: authService.createAccount,
    onSuccess: (msg: string | undefined) => {
      toast.success(msg)
      reset()
    },
    onError: ({message} : {message:string}) => {
      toast.error(message)
    }
  })

  const handleRegister = (formData: UserRegistrationForm) => mutate(formData);
  
  return(
    <>
      <h1 className="text-5xl font-black text-white">Regístrate y Crea una cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">Llena el formulario y recibirás un {''}
        <span className="text-fuchsia-500 font-bold"> código de confirmación</span>
      </p>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="form-auth"
        noValidate
      >
        <div className='flex flex-col gap-3'>
          <label className="font-normal text-2xl" htmlFor="name">Nombre:</label>
          <input
            className='w-full p-2.5 border-gray-300 border'
            type="text" 
            id="name"
            placeholder='Ingresa un Nombre de Usuario...'
            {...register('name', {required: 'El Nombre es obligatorio'})}
          />
          {errors.name && (<ErrorMessage>{errors.name.message}</ErrorMessage>)}
        </div>

        <div className='flex flex-col gap-3'>
          <label className="font-normal text-2xl" htmlFor="email">Email:</label>
          <input
            className='w-full p-2.5 border-gray-300 border'
            type="email" 
            id='email'
            placeholder='Ingresar tu Email...'
            {...register('email', {
              required: 'El Email es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email no valido"
              }
            })}
          />
          {errors.email && (<ErrorMessage>{errors.email.message}</ErrorMessage>)}
        </div>

        <div className='flex flex-col gap-3'>
          <label className="font-normal text-2xl" htmlFor="password">Password</label>
          <input
            className='w-full p-2.5 border-gray-300 border'
            type="password" 
            id='password'
            placeholder='Ingresar el Password de registro...'
            {...register('password', {
              required: 'El Password es obligatorio',
              minLength: {
                value: 8,
                message: "El Password debe ser de mínimo 8 caracteres"
              }
            })}
          />
          {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>)}
        </div>

        <div className='flex flex-col gap-3'>
          <label className="font-normal text-2xl" htmlFor="password_confirmation">Repetir Password</label>
          <input
            className='w-full p-2.5 border-gray-300 border'
            type="password" 
            id='password_confirmation'
            placeholder='Repite el Password de registro...'
            {...register('password_confirmation', {
              required: 'Repetir el password es obligatorio',
              validate: value => value === password || "Los Password deben ser iguales"
            })}
          />
          {errors.password_confirmation && (<ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>)}
        </div>

        <InputSubmit value={['Registrarme', 'Registrando...']} isPending={isPending} color='purple'/>
      </form>

      <nav className='mt-5 flex flex-col gap-5'>
        <Link 
          className='text-center text-md text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal' 
          to="/auth/login">¿Ya tienes una cuenta? Inicia sesión aquí</Link>

        <Link 
          className='text-center text-md text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal' 
          to="/auth/request-code">Solicitar un nuevo Código</Link>

        <Link 
          className='text-center text-white hover:text-fuchsia-400 transform hover:scale-105 duration-150 font-normal text-md' 
          to="/auth/request-change-password-code">¿No recuerdas tu Contraseña? Recupérala aquí</Link>
      </nav>
    </>
  )
}