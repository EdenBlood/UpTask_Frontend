import TaskCard from '@/components/Task/TaskCard'
import type { Task } from "@/types/index"
import { statusTranslations } from '@/locales/es';
import { useMemo } from 'react';
import { statusColors } from '@/styles/theme/statusColors';

//** Types */
type TaskListProps = {
  tasks: Omit<Task, 'notes'>[]
  hasAuthorization: boolean
}

type GroupedTask = {
  [key: string]: Omit<Task, 'notes'>[]
}

//** Status Inicial */
function getInitialStatusGroups(): GroupedTask {
  return {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: []
  }
}

//** Colecciones */


export default function TaskList({tasks, hasAuthorization}: TaskListProps) {
  const groupedTasks = useMemo(() => {
    return tasks.reduce( (acc, task) => {
        if(!acc[task.status]) {
          acc[task.status] = []
        }
        acc[task.status].push(task);
        return acc;
    }, getInitialStatusGroups())
  }, [tasks])

  return(
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-3 overflow-x-scroll xl:overflow-auto pb-20">

        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div className="min-w-[300px] xl:min-w-0 xl:w-1/5" key={status}>

            <h3 className={`capitalize text-black dark:text-slate-100 text-lg font-semibold border border-slate-300 dark:border-slate-500 bg-white dark:bg-gray-800 p-3 border-t-8 text-center ${statusColors[status]}`}>{statusTranslations[status]}</h3>

            <ul className="mt-5 space-y-5">
              {tasks.length === 0 ? (
                <li className="text-gray-600 dark:text-slate-400 text-center pt-6">No hay Tareas</li>
              ) : (
                tasks.map( task => <TaskCard key={task._id} task={task} hasAuthorization={hasAuthorization}/>)
              )}
            </ul>
          </div>
        ))
        }

      </div>
    </>
  )
}