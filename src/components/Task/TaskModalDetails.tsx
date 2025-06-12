import { Fragment, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation, useParams, Navigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import taskService from '@/services/taskService';
import { toast } from 'react-toastify';
import { formatDate, fullFormatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es'
import type { TaskStatus } from '@/types/index';
import { textStatusColors } from '@/styles/theme/statusColors';
import NotesPanel from '../notes/NotesPanel';
import Label from '../Label';

export default function TaskModalDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(() => new URLSearchParams( location.search ), [location.search]);
  const taskId = queryParams.get('viewTask')!
  const show = taskId ? true : false

  const params = useParams()
  const projectId = params.projectId!

  const { data, isError, error } = useQuery({
    queryKey: ['viewTask', taskId],
    queryFn: () => taskService.getTaskById({projectId, taskId}),
    enabled: !!taskId, //* Solamente se muestra si existe un taskId
    retry: false,
    refetchOnWindowFocus: false
  })  

  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: taskService.updateStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (msg) => {
      queryClient.invalidateQueries({queryKey: ['viewTask', taskId]})
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      toast.success(msg)
      navigate(location.pathname, {replace: false})
    }
  })

  const handleChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as TaskStatus 
    const sendData = {
      projectId, 
      taskId, 
      status
    }
    mutate(sendData)
  }

  if (isError) {
    toast.error(error.message, { toastId: 'error'})
    return <Navigate to={`/project/${projectId}`} /> //* Diferencia entre useNavigate y <Navigate /> es que el segundo te redirige de forma programada de una pagina a otra.
  }

  if (data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true}) }>
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
                  <p className='text-sm text-slate-700 dark:text-slate-400'>Agregada el: <span className='text-slate-500 dark:text-slate-300'>{formatDate(data.task.createdAt)}</span></p>
                  <p className='text-sm text-slate-700 dark:text-slate-400'>Última actualización: <span className='text-slate-500 dark:text-slate-300'>{formatDate(data.task.updatedAt)}</span></p>
                  <Dialog.Title
                    as="h3"
                    className="font-black text-5xl text-slate-600 dark:text-slate-100 my-3"
                  >{data.task.name}
                  </Dialog.Title>
                  <p className='text-lg font-bold text-slate-900 mb-6 dark:text-slate-300/80'>Descripción: <span className='font-normal text-slate-500 dark:text-slate-100'>{data.task.description}</span></p>

                  { data.task.completedBy.length > 0 && 
                    (
                      <div>
                        <p className='font-bold text-lg mb-2'>Historial:</p>

                        <ul className='list-decimal list-inside space-y-1'>
                          {data.task.completedBy.map( activityLog => (
                            <li className='text-sm font-normal text-slate-700 dark:text-slate-100' key={activityLog._id}>

                              <span className={`font-bold ${textStatusColors[activityLog.status]}`}>
                                {statusTranslations[activityLog.status]}
                              </span>
                              
                              {' '}- {activityLog.user.name} - {fullFormatDate(activityLog.date.toString())}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) 
                  }

                  <div className='my-5'>
                    <Label htmlFor='status' label='Estado Actual:' />
                    <select
                      className='disabled:bg-slate-300 disabled:border-slate-700 disabled:cursor-not-allowed cursor-pointer mt-2 w-full p-2 bg-white dark:bg-transparent border border-slate-300'
                      id='status'
                      defaultValue={data.task.status}
                      onChange={handleChange}
                      disabled={isPending}
                    >
                      {Object.entries(statusTranslations).map(([key, value]) => (
                        <option className='dark:text-black' key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>

                  <NotesPanel 
                    notes={data.task.notes} manager={data.manager}
                  />

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}