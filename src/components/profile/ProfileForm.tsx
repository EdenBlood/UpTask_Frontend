import { useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, UserProfileForm } from '@/types/index';
import profileService from '@/services/profileService';
import { toast } from 'react-toastify';
import TitleDescription from '../TitleDescription';
import Label from '../Label';
import InputSubmit from '../InputSubmit';

type ProfileFormProps = {
  user: User
}

export default function ProfileForm({user}: ProfileFormProps) {
  const initialValues : UserProfileForm = {
    name: user.name,
    email: user.email
  }

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: profileService.updateUserData,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({queryKey: ['user']})
    },
    onError: ({message}) => {
      toast.error(message)
    }
  })
  
  const { register, handleSubmit, formState: {errors} } = useForm<UserProfileForm>({defaultValues: initialValues})
  
  const handleEditProfile = (userData: UserProfileForm) => {
    mutate({userData})
  }

  return (
    <>
      <div className="mx-auto max-w-3xl 2xl:max-w-4xl">
        <TitleDescription title={"Mi Perfil"} description={"Aquí puedes actualizar tu información"} />

        <form 
          className='space-y-6 mt-6 bg-white dark:bg-gray-700/80 rounded-xl p-10 shadow-lg'
          noValidate
          onSubmit={handleSubmit(handleEditProfile)}
        >

          <div className='div-input'>
            <Label htmlFor={"name"} label={"Nombre:"}/>
            <input 
              type="text" 
              id='name'
              className='input'
              {...register('name', {
                required: 'El nombre es obligatorio'
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className='div-input'>
            <Label htmlFor={"email"} label={"Email:"}/>
            <input 
              type="email" 
              id='email'
              className='input'
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Email no valido'
                }
              })}
              />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>

          <InputSubmit value={["Guardar Cambios", "Guardando..."]} isPending={isPending} />
        </form>
      </div>
    </>
  )  
}