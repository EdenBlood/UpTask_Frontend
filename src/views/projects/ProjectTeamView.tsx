import AddMemberModal from '@/components/team/AddMemberModal'
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import teamService from '@/services/teamService'
import { Fragment } from 'react/jsx-runtime'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { toast } from 'react-toastify'
import TitleDescription from '@/components/TitleDescription'

export default function ProjectTeamView() {
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => teamService.getProjectTeam({ projectId }),
    retry: false,
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: teamService.removeUserFromProject,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
    },
    onError: ({message}) => {
      toast.error(message)
    }
  })

  if (isLoading) return 'Cargando...'

  if (isError) return <Navigate to={'/404'} /> 

  if (data) return (
    <>
      <TitleDescription title='Administrar Equipo' description='Administrar el equipo de trabajo de este Proyecto' />

      <nav className="my-5 flex gap-3">
        <button
          type="button"
          className="block w-max bg-purple-400 hover:bg-purple-600 px-6 py-2.5 text-white text-lg font-semibold cursor-pointer transition-tranform hover:scale-105 duration-300"
          onClick={() => navigate(location.pathname + '?addMember=true')}
        >
          Agregar Colaborador
        </button>

        <Link
          to={`/project/${projectId}`}
          className="block w-max bg-purple-400 hover:bg-purple-600 px-6 py-2.5 text-white text-lg font-semibold cursor-pointer transition-tranform hover:scale-105 duration-300"
        >Volver al Proyecto</Link>
      </nav>

      <h2 className="text-5xl font-black my-10">Miembros actuales:</h2>
      {data.length ? (
        <ul role="list" className="divide-y-2 divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg dark:divide-slate-700 dark:border-slate-500 dark:bg-gray-800">
          {data?.map((member) => (
            <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <p className="text-2xl font-black text-gray-600 dark:text-slate-100">
                    {member.name}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-slate-300">
                    {member.email}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-black dark:text-slate-300 dark:hover:text-white cursor-pointer transition-colors duration-300">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="size-9" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-50 origin-top-right shadow-lg bg-white dark:bg-slate-900 ring-1 ring-gray-900/5 dark:ring-slate-500/50 rounded-lg focus:outline-none overflow-hidden">
                      <Menu.Item>
                        <button
                          type='button'
                          className='block w-full font-semibold cursor-pointer transition-colors duration-300  hover:bg-red-700 text-red-600 hover:text-white py-2.5 text-md leading-6 disabled:hover:bg-white disabled:hover:text-red-600 disabled:cursor-not-allowed'
                          onClick={() => mutate({id: member._id, projectId})}
                          disabled={isPending}
                        >
                          {isPending ? "Eliminando..." : "Eliminar del Proyecto"}
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center text-slate-800 dark:text-slate-200 py-20'>No hay miembros en este equipo</p>
      )}

      <AddMemberModal />
    </>
  )
}