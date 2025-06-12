import { useLocation, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import noteService from '@/services/noteService'
import type { NoteFormData } from '@/types/index'
import ErrorMessage from '../ErrorMessage'
import Label from '../Label'
import InputSubmit from '../InputSubmit'

export default function AddNoteForm() {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTask')!

  const initialValues : NoteFormData = {content: ''}

  const { register, handleSubmit, formState: {errors}, reset } = useForm({defaultValues: initialValues })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: noteService.createNote,
    onSuccess: (msg) => {
      toast.success(msg)
      reset()
      queryClient.invalidateQueries({queryKey: ['viewTask', taskId]})
    },
    onError: ({message}) => {
      toast.error(message);
    }
  })

  const handleCreateNote = (formData: NoteFormData) => { 
    const sendData = { formData, projectId, taskId}
    mutate(sendData);
  } 

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreateNote)}
        className="space-y-3"
        noValidate
      >
        <div className="div-input">
          <Label htmlFor='content' label='Crear Nota:'/>
          <input 
            type="text" 
            id="content"
            placeholder="Contenido de la nota..."
            className="input"
            {...register('content', {
              required: 'El contenido de la nota es obligatorio'
            })}
          />
          {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
        </div>
        
        <InputSubmit value={['Crear Nota', 'Creando Nota...']} isPending={isPending} color='fuchsia'/>
      </form>
    </>
  )
}