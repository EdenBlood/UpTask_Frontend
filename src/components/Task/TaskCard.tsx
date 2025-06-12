import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react/jsx-runtime'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Task } from '@/types/index'
import taskService from '@/services/taskService'
import { toast } from 'react-toastify'

type TaskCardProps = {
  task: Omit<Task, 'notes'>
  hasAuthorization: boolean
}

export default function TaskCard({ task, hasAuthorization }: TaskCardProps) {

  const navigate = useNavigate();
  const location = useLocation()
  
  const params = useParams()
  const projectId = params.projectId!
  
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: (msg) => {
      queryClient.invalidateQueries({queryKey: ['project', projectId]})
      toast.success(msg)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleDelete = () => {
    const sendData = {
      projectId,
      taskId: task._id
    }
    mutate(sendData)
  }

  
  return (
    <>
      <li>
        <div
          role='button'
          className='cursor-pointer p-5 bg-white dark:bg-gray-800 border border-slate-300 dark:border-slate-500 transform duration-300 flex flex-col gap-2 group hover:shadow-lg/5 dark:shadow-slate-200 dark:hover:shadow-lg/25'
          onClick={() => navigate( `${location.pathname}?viewTask=${task._id}`)}
        >
          <div 
            className='flex justify-between gap-1'>
            <div className='min-w-0'>
              <h3 className='group-hover:text-fuchsia-500 group-hover:scale-105 transform duration-300 text-md text-left font-bold text-slate-800 dark:text-slate-100'>{task.name}</h3>
            </div>

            <div>
              <div className=" shrink-0  gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button 
                    className="-m-2.5 block p-2.5 text-gray-500 hover:text-fuchsia-600 hover:scale-125 cursor-pointer transform duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="size-7" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      className="absolute -right-2 z-20 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-gray-900/5 focus:outline-none overflow-hidden">
                      <Menu.Item>
                        <button 
                          type='button' 
                          className='block px-3 py-1.5  text-sm leading-6 text-gray-900 dark:text-white hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white transition-colors duration-300 w-full text-left font-semibold cursor-pointer '
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate( location.pathname + `?viewTask=${task._id}`)
                          }}
                        >
                          Ver Tarea
                        </button>
                      </Menu.Item>
                      { hasAuthorization === true && (
                        <>
                          <Menu.Item>
                            <button 
                              type='button' 
                              className='block px-3 py-1.5 text-sm leading-6 text-gray-900 dark:text-white hover:text-white hover:bg-indigo-600 transition-colors duration-300 w-full text-left font-semibold cursor-pointer'
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate( location.pathname + `?editTask=${task._id}`)
                              }} 
                            >Editar Tarea</button>
                          </Menu.Item>

                          <Menu.Item>
                            <button 
                              type='button' 
                              className='block px-3 py-1.5 text-sm leading-6 text-red-500 hover:text-white hover:bg-red-800 transition-colors duration-300 w-full text-left font-semibold cursor-pointer'
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete()
                              }}
                            >
                              Eliminar Tarea
                            </button>
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <div>
            <p className='group-hover:text-slate-950 dark:group-hover:text-slate-200 transition-colors duration-300 text-slate-600 dark:text-slate-300 text-sm line-clamp-3 font-medium text-left'>{task.description}</p>
          </div>
        </div>
      </li>
    </>
  )
}