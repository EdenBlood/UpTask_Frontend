import { Fragment, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import taskService from '@/services/taskService';
import { toast } from 'react-toastify';

import type { TaskFormData } from '@/types/index';
import InputSubmit from '../InputSubmit';

export default function AddTaskModal() {
  const navigate = useNavigate()

  //** Leer si modal existe **/
  const location = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const modalTask = queryParams.get('newTask');
  const show = modalTask ? true : false;

  //** Obtener projectId **/
  const params = useParams();
  const projectId = params.projectId!;
  
  //** Post **/
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: (msg) => {
      toast.success(msg)
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      reset()
      navigate(location.pathname, {replace: true})
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  
  //** Form **/
  const { register, formState: {errors}, reset, handleSubmit } = useForm<TaskFormData>({defaultValues: {
    name: "",
    description: "",
  }})

  const handleCreateTask = (formData: TaskFormData) => {
    const sendData = {
      formData, projectId
    }
    mutate(sendData)
  }
  
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => { navigate(location.pathname, {replace: true}) }}>
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all p-16 dark:bg-gray-800">
                  <Dialog.Title
                    as="h3"
                    className="font-black text-5xl my-5"
                  >
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">Llena el formulario y crea  {''}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form 
                    className='mt-10 space-y-3'
                    noValidate  
                    onSubmit={handleSubmit( handleCreateTask )}
                    >

                    <TaskForm register={register} errors={errors} />

                    <InputSubmit value={['Guardar Tarea', 'Guardando...']} isPending={isPending} color='fuchsia' />
                  </form>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}