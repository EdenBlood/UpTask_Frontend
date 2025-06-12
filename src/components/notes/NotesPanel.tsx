import AddNoteForm from '@/components/notes/AddNoteForm'
import type { Project, Task } from '@/types/index'
import NoteDetails from './NoteDetails'

type NotesPanelProps = {
  notes: Task['notes'],
  manager: Project['manager']
}

export default function NotesPanel({notes, manager}: NotesPanelProps) {
  return (
    <>
      <AddNoteForm/>

      { notes.length ? (
        <>
          <p className='mt-5 font-bold text-lg text-slate-700 dark:text-slate-100'>Historial de Notas:</p>

          <ul className='mt-4 space-y-3'>
            { notes.map( note => (
              <NoteDetails key={note._id} note={note} manager={manager}/>
              )
            )}
          </ul>
        </>
      ) : (
        <p className='mt-5 font-bold text-lg text-slate-700 dark:text-slate-400 text-center'>~ Aun no hay notas ~</p>
      )}
    </>
  )
}