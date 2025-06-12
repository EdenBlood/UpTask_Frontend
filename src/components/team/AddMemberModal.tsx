import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime';
import AddMemberForm from './AddMemberForm';
import { useMutation } from '@tanstack/react-query'

import type { TeamMemberForm } from '@/types/index';
import teamService from '@/services/teamService';
import SearchResult from './SearchResult';
import InputSubmit from '../InputSubmit';

export default function AddMemberModal() {
  const navigate = useNavigate()
  const location = useLocation();
  const params = useParams()

  const projectId = params.projectId!

  const queryParams = new URLSearchParams(location.search);
  const addMember = queryParams.get('addMember')
  const show = addMember ? true : false

  const { mutate, isPending, error, data, reset: resetSearch } = useMutation({
    mutationFn: teamService.findUserByEmail,
  })

  const initialValues: TeamMemberForm = {
    email: ''
  }

  const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: initialValues})

  const handleSearchUser = (formData: TeamMemberForm) => {
    const sendData = { formData, projectId}
    mutate(sendData)
  }

  const resetData = () => {
    reset();
    resetSearch();
  }

  
  return (
    <>
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16 dark:bg-gray-800">
                  <Dialog.Title
                    as="h3"
                    className="font-black text-4xl  my-5"
                  >
                    Agregar Integrante al equipo
                  </Dialog.Title>
                  <p className="text-xl font-bold">Busca el nuevo integrante por email {''}
                    <span className="text-fuchsia-600">para agregarlo al proyecto</span>
                  </p>

                  <form
                    className="mt-10 space-y-5"
                    onSubmit={handleSubmit(handleSearchUser)}
                    noValidate
                  >
                    <AddMemberForm register={register} errors={errors} />

                    <InputSubmit value={['Buscar Usuario', 'Buscando...']} isPending={isPending} color='fuchsia'/>
                  </form>

                  { (error || data) && (
                    <div className='mt-10'>
                      {error && <p className='text-center texl-lg font-normal'>{error.message}</p>}
                      {data?.user && <SearchResult user={data.user} resetData={resetData} />}
                    </div>
                  ) }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </>
  )
}
