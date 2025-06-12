import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { Task, TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation } from '@tanstack/react-query';
import taskService from '@/services/taskService';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import InputSubmit from '../InputSubmit';

type EditTaskModalProps = {
  data: Task,
  taskId: Task['_id']
}

export default function EditTaskModal({data, taskId}: EditTaskModalProps) {
  const navigate = useNavigate()
  const location = useLocation()

  //** Obtener projectId y taskId */
  const params = useParams()
  const projectId = params.projectId!
  
  const queryClient = useQueryClient()
  
  const { mutate, isPending } = useMutation({
    mutationFn: taskService.updatedTask,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
      queryClient.invalidateQueries({queryKey: ['viewTask', taskId]})
      toast.success(msg)
      navigate(location.pathname, {replace: true})
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { register, handleSubmit, formState: {errors} } = useForm<TaskFormData>({defaultValues: {
    name: data.name,
    description: data.description
  }})

  const handleEditTask = (formData: TaskFormData) => {
    const sendData = {formData, projectId, taskId}
    mutate(sendData);
  }
  
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => { navigate(location.pathname, {replace: true})}}>
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16 dark:bg-gray-800">
                <Dialog.Title
                  as="h3"
                  className="font-black text-5xl my-5"
                >
                  Editar Tarea
                </Dialog.Title>

                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                  <span className="text-fuchsia-600">este formulario</span>
                </p>

                <form
                  className="mt-10 space-y-3"
                  noValidate
                  onSubmit={handleSubmit( handleEditTask )}
                >

                  <TaskForm register={register} errors={errors} />

                  <InputSubmit value={['Guardar Edición', 'Guardando...']} isPending={isPending} color='fuchsia' />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}