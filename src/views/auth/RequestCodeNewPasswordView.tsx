import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import ErrorMessage from "@/components/ErrorMessage"
import authService from "@/services/authService"
import { toast } from "react-toastify"
import type { RequestNewPasswordCodeForm } from "@/types/index"
import InputSubmit from "@/components/InputSubmit"


export default function RequestCodeNewPasswordView() {
  const initialValues : RequestNewPasswordCodeForm = {
    email: ""
  }

  const {register, handleSubmit, reset,formState: {errors}} = useForm({defaultValues: initialValues})

  const { mutate, isPending } = useMutation({
    mutationFn: authService.requestCodeNewPassword,
    onSuccess: (msg) => {
      toast.success(msg);
      reset()
    },
    onError: ({message}) => {
      toast.error(message)
    }
  })
  
  const handleRequestNewPasswordCode = (formData: RequestNewPasswordCodeForm) => mutate(formData)
  
  return (
    <>
      <h1 className="text-5xl font-black text-white">Solicita Cambio de Contraseña</h1>
      <p className="text-2xl font-light text-white mt-5">Coloca tu Email para recibir {''}
        <span className="text-fuchsia-500 font-bold">un código</span>
      </p>

      <form
        className='form-auth'
        onSubmit={handleSubmit(handleRequestNewPasswordCode)}
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
        
        <InputSubmit value={['Cambio de Password', 'Enviando Email...']} isPending={isPending} color='purple'/>
      </form>

      <nav className='mt-5 flex flex-col gap-5'>
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