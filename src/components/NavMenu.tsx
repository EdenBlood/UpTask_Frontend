import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import type { User } from '../types'


type NavMenuProps = {
  name: User['name']
}

export default function NavMenu({name}: NavMenuProps) {

  const queryClient = useQueryClient()
  
  const handleLogout = () => {
    localStorage.removeItem('AUTH_TOKEN_UP_TASK')
    queryClient.invalidateQueries({queryKey: ['user']})
  }

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-400 cursor-pointer">
        <Bars3Icon className='size-7 text-white ' />
      </Popover.Button>
    
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-46 shrink rounded-xl overflow-hidden bg-white text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 dark:bg-slate-800 dark:text-slate-100 dark:dark:ring-slate-500/10">
            <div className='py-3'>
              <p className='text-lg text-center'>Hola {name}</p>
            </div>
            <Link
              to='/profile'
              className='block p-2 dark:text-slate-100 hover:bg-black text-center text-black cursor-pointer w-full hover:text-white dark:hover:text-black dark:hover:bg-white duration 300 transition-colors'
            >Mi Perfil</Link>
            <Link
              to='/'
              className='block p-2 dark:text-slate-100 hover:bg-indigo-500/80 text-center text-black cursor-pointer w-full hover:text-white duration 300 transition-colors'
            >Mis Proyectos</Link>
            <button
              className='block p-2 text-red-600 hover:bg-red-700 text-center cursor-pointer w-full hover:text-white duration 300 transition-colors'
              type='button'
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}