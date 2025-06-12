import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, type UseMutateFunction } from '@tanstack/react-query';
import type { UpdateProjectProps } from '@/services/projectService';
import type { PasswordForm } from '@/types/index';
import authService from '@/services/authService';
import { toast } from 'react-toastify';
import InputSubmit from '../InputSubmit';
import Label from '../Label';

type DeleteProjectModalProps = {
  mutate: UseMutateFunction<string | undefined, Error, Pick<UpdateProjectProps, "projectId">, unknown>,
}

export default function DeleteProjectModal({mutate: mutateDelete}: DeleteProjectModalProps) {
  const initialValues : PasswordForm= {
    password: ''
  }
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get('deleteProject')!;
  const show = deleteProjectId ? true : false

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  //* Si la validación del password 
  const { mutate, isPending } = useMutation({
    mutationFn: authService.checkPassword,
    onSuccess: () => {
      mutateDelete({ projectId: deleteProjectId })
      reset()
      navigate(location.pathname, {replace: true})
    },
    onError: ({message}) => {
      toast.error(message)
    }
  })

  const handleForm = async (formData: PasswordForm) => { 
    mutate({formData})
  }


  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 text-left align-middle shadow-xl transition-all p-16">

                <Dialog.Title
                  as="h3"
                  className="font-black text-4xl my-5"
                >Eliminar Proyecto </Dialog.Title>

                <p className="text-xl font-bold">Confirma la eliminación del proyecto {''}
                  <span className="text-fuchsia-600">colocando tu password</span>
                </p>

                <form
                  className="mt-10 space-y-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >

                  <div className="div-input">
                    <Label htmlFor='password' label='Password:'/>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password Inicio de Sesión"
                      className="input"
                      {...register("password", {
                        required: "El password es obligatorio",
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                  </div>

                  <InputSubmit value={['Eliminar Proyecto', 'Eliminando...']} isPending={isPending} color='fuchsia' />

                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}