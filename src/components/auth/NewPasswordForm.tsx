import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { RequestNewPasswordForm } from "@/types/index"
import ErrorMessage from "../ErrorMessage"



type NewPasswordFormProps = {
  register: UseFormRegister<RequestNewPasswordForm>,
  errors: FieldErrors<RequestNewPasswordForm>
  password: string
}

export default function NewPasswordForm({register, errors, password} : NewPasswordFormProps) {
  return (
    <>
      <div className='flex flex-col gap-3'>
        <label className="font-normal text-2xl" htmlFor="password">Password:</label>
        <input
          className='w-full p-2.5 border-gray-300 border'
          type="password" 
          id="password"
          placeholder='Ingresa un Nuevo Password...'
          {...register('password', {
            required: 'El Password es obligatorio',
            minLength: {
              value: 8,
              message: 'El Password debe ser de mínimo 8 caracteres'
            }
          })}
        />
        {errors.password && (<ErrorMessage>{errors.password.message}</ErrorMessage>)}
      </div>

      <div className='flex flex-col gap-3'>
        <label className="font-normal text-2xl" htmlFor="password_confirmation">Repetir Password:</label>
        <input
          className='w-full p-2.5 border-gray-300 border'
          type="password" 
          id="password_confirmation"
          placeholder='Ingresa un Nuevo Password...'
          {...register('password_confirmation', {
            required: 'Repetir el password es obligatorio',
            validate: value => value === password || "Los Password deben ser iguales"
          })}
        />
        {errors.password_confirmation && (<ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>)}
      </div>
    </>


  )
}
