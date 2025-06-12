import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid'
import type { Project, User } from '@/types/index'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { UseMutateFunction } from '@tanstack/react-query'
import type { UpdateProjectProps } from '@/services/projectService'
import isManager from '@/utils/policies'
import DeleteProjectModal from './DeleteProjectModal'


export type ProjectCardProps = {
  project: Project,
  mutate: UseMutateFunction<string | undefined, Error, Pick<UpdateProjectProps, "projectId">, unknown>
  user: User,
}

export default function ProjectCard({project, mutate, user}: ProjectCardProps) {
  const location = useLocation()
  const navigate = useNavigate()
  return (  
    <>
      <li key={project._id} className="flex justify-between gap-x-6 px-5 py-8">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto space-y-2">

            { project.manager === user._id 
              ? (
                <div className='w-24 border-2 border-purple-500 text-purple-500 bg-purple-200 rounded-lg py-0.5'><p className='text-xs font-semibold  text-center  '>Manager</p></div>
              ) 
              : (
                <div className='w-24 border-2 border-indigo-500 text-indigo-500 bg-indigo-200 rounded-lg py-0.5'><p className='text-xs font-semibold  text-center  '>Colaborador</p></div>
              )}
              
            <Link to={`/project/${project._id}`}
              className="block text-slate-600 dark:text-slate-100 cursor-pointer hover:underline text-3xl font-bold"
            >{project.projectName}</Link>
            <p className="text-sm text-slate-400 dark:text-slate-300">
              Cliente: {project.clientName}
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-300">
              {project.description}
            </p>
          </div>
        </div>
        
        <div className="flex shrink-0 items-center gap-x-6">
          <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-black dark:text-slate-300 dark:hover:text-white cursor-pointer transition-colors duration-300">
              <span className="sr-only">opciones</span>
              <EllipsisVerticalIcon className="size-9" aria-hidden="true" />
            </Menu.Button>
            <Transition as={Fragment} enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-lg ring-1 ring-slate-900/10 dark:ring-slate-500/10 focus:outline-none"
              >

                <Menu.Item>
                  <Link to={`/project/${project._id}`}
                    className='block px-3 py-1.5 text-sm leading-6  hover:text-white w-full text-start hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors duration-300'>
                    Ver Proyecto
                  </Link>
                </Menu.Item>

                { isManager(project.manager, user._id) && (
                  <>
                    <Menu.Item>
                      <Link to={`/project/${project._id}/edit`}
                        className='block px-3 py-1.5 text-sm leading-6  hover:text-white w-full text-start hover:bg-indigo-600  transition-colors duration-300'>
                        Editar Proyecto
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        type='button'
                        className='block w-full cursor-pointer transition-colors hover:bg-red-800 duration-300 px-3 py-1.5 text-sm leading-6 text-red-500 hover:text-white  text-start'
                        onClick={() => navigate( `${location.pathname}?deleteProject=${project._id}` ) }
                      >
                        Eliminar Proyecto
                      </button>
                    </Menu.Item>
                  </>
                )}
                
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        
      </li>

      <DeleteProjectModal mutate={mutate} />
    </>
  )
}
