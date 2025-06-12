import type { ConfirmToken, RequestNewPasswordForm } from "@/types/index"
import { useForm } from "react-hook-form"
import NewPasswordForm from "./NewPasswordForm"
import { useMutation } from "@tanstack/react-query"
import authService from "@/services/authService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import InputSubmit from "../InputSubmit"

type NewPasswordTokenProps = {
  token: ConfirmToken['token']
}

export default function NewPasswordToken({token} : NewPasswordTokenProps) {
  const navigate = useNavigate()
  
  const initialValues: RequestNewPasswordForm = {
    password: '',
    password_confirmation: '',
  }
  
  const { register, handleSubmit, formState: {errors}, reset, watch } = useForm({defaultValues: initialValues}) 

  const password = watch("password")

  const { mutate, isPending } = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: (msg) => {
      toast.success(msg)
      reset()
      navigate('/auth/login')
    },
    onError: ({message}) => {
      toast.error(message);
    }

  })
  
  const handleNewPassword = (formData: RequestNewPasswordForm) => {
    const sendData = {formData, token}
    mutate(sendData)
  }
  
  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="form-auth"
        noValidate
      >
        <NewPasswordForm register={register} errors={errors} password={password}/>

        <InputSubmit value={['Nuevo Password', 'Enviando...']} isPending={isPending} color="purple" />
      </form> 
    </>
  )
}
