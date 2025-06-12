import ErrorMessage from "@/components/ErrorMessage"
import InputSubmit from "@/components/InputSubmit"
import Label from "@/components/Label"
import TitleDescription from "@/components/TitleDescription"
import profileService from "@/services/profileService"
import type { ChangePasswordForm } from "@/types/index"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

export default function ChangePasswordView() {
  const initialValues : ChangePasswordForm = {
    current_password: '',
    new_password: '',
    new_password_repeat: '',
  }

  const { register, handleSubmit, watch, reset, formState: {errors} } = useForm({defaultValues: initialValues})

  const { mutate, isPending } = useMutation({
    mutationFn: profileService.changePassword,
    onSuccess: (msg) => {
      toast.success(msg)
      reset()
    },
    onError: ({message}) => {
      toast.error(message)
    }
  })
  
  const handleChangePassword = (formData : ChangePasswordForm) => {
    mutate({formData})
  }

  const password = watch('new_password')

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <TitleDescription title={"Cambiar Password"} description={"Utiliza este formulario para cambiar tu password"} />
        
        <form 
          noValidate
          className="space-y-6 mt-6 bg-white dark:bg-gray-700/80 rounded-xl p-10 shadow-lg"
          onSubmit={handleSubmit(handleChangePassword)}
        >
          <div className="div-input">
            <Label htmlFor={"current_password"} label={"Password Actual:"}/>
            <input 
              type="password" 
              id="current_password"
              className="input"
              {...register('current_password', {
                required: 'El password actual es obligatorio',
                minLength: {
                  value: 8,
                  message: 'El password tiene que tener 8 caracteres como mínimo'
                }
              })}
            />
            { errors.current_password && <ErrorMessage>{ errors.current_password.message }</ErrorMessage> }
          </div>

          <div className="div-input">
            <Label htmlFor={"new_password"} label={"Nuevo Password:"}/>
            <input 
              type="password" 
              id="new_password"
              className="input"
              {...register('new_password', {
                required: 'El password actual es obligatorio',
                minLength: {
                  value: 8,
                  message: 'El password tiene que tener 8 caracteres como mínimo'
                }
              })}
            />
            { errors.new_password && <ErrorMessage>{ errors.new_password.message }</ErrorMessage> }
          </div>

          <div className="div-input">
            <Label htmlFor={"new_password_repeat"} label={"Repetir Password:"}/>
            <input 
              type="password" 
              id="new_password_repeat"
              className="input"
              {...register('new_password_repeat', {
                required: 'El password actual es obligatorio',
                validate: value => value === password || 'Los passwords no son iguales'
              })}
            />
            { errors.new_password_repeat && <ErrorMessage>{ errors.new_password_repeat.message }</ErrorMessage> }
          </div>

          <InputSubmit value={['Cambiar Password', 'Guardando...']} isPending={isPending}/>
        </form>
      </div>
    </>
  )
}
