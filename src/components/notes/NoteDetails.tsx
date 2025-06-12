import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from 'react-router-dom'
import { useAuth } from "@/hooks/useAuth"
import noteService from "@/services/noteService"
import type { Note, Project } from "@/types/index"
import { fullFormatDate } from "@/utils/utils"
import { toast } from "react-toastify"

type NoteDetailsProps = {
  note: Note;
  manager: Project['manager']
}

export default function NoteDetails({ note, manager }: NoteDetailsProps) {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('viewTask')!

  const params = useParams();
  const projectId = params.projectId!;

  const { data: user, isLoading } = useAuth()

  
  const queryClient = useQueryClient()
  
  const { mutate, isPending } = useMutation({
    mutationFn: noteService.deleteNote,
    onSuccess: (msg) => {
      toast.success(msg)
      queryClient.invalidateQueries({queryKey: ['viewTask', taskId]})
    },
    onError: ({message}) => {
      toast.error(message)
    }
  })

  const canDelete = useMemo(() => {
    if (user) {
      return user._id === note.createdBy._id || user._id === manager
    }
  },[user, note.createdBy._id, manager])

  if (isLoading) return "Cargando..."

  if (user) return (
    <>
      <li className='flex relative bg-indigo-50 dark:bg-fuchsia-800 pb-3 flex-col shadow-md rounded-md'>

        <div className='px-3 py-1 bg-purple-300/85 dark:bg-fuchsia-950 rounded-t-md flex justify-between items-center'>
          <p>
            <span className='font-bold'>Creada por: </span>{note.createdBy.name}
          </p>

          {canDelete && (
            <button 
              disabled={isPending}
              className="block w-max bg-red-600  disabled:bg-red-300 disabled:hover:bg-red-300 disabled:text-gray-700 disabled:cursor-not-allowed hover:bg-red-800 px-2 py-0.5 text-white text-md font-bold cursor-pointer transition-colors duration-300"
              onClick={() => mutate({projectId, taskId, noteId: note._id})}
            >
              { isPending ? "Eliminando..." : "Eliminar" }
            </button>
          )}
        </div>
        
        <div className='font-medium p-3 rounded-b-md'>
          <p>{note.content}</p>
        </div>

        <div className='absolute right-1 bottom-1'>
          <p className='text-xs text-slate-600 dark:text-slate-100'><span className='font-bold'>Fecha: </span>{fullFormatDate(note.createdAt)} horas</p>
        </div>
      </li>
    </>
  )
}
