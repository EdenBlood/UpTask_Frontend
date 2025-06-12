import AddTaskModal from "@/components/Task/AddTaskModal"
import projectService from "@/services/projectService"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation, useNavigate, useParams, Link } from "react-router-dom"
import TaskList from '@/components/Task/TaskList'
import EditTaskData from '@/components/Task/EditTaskData'
import TaskModalDetails from '@/components/Task/TaskModalDetails';
import { useAuth } from "@/hooks/useAuth"
import isManager from "@/utils/policies"
import { useMemo } from "react"
import TitleDescription from "@/components/TitleDescription"

export default function ProjectDetailsView() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const param = useParams()
  const projectId = param.projectId!

  const { data: user, isLoading: authLoading } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getProjectById({projectId}),
    retry: false,
    refetchOnWindowFocus: false
  })

  const hasAuthorization = useMemo(() => user?._id === data?.manager ,[data, user])

  if (isLoading && authLoading) return 'Cargando...'
  if (isError) return <Navigate to="/404" />
  if (data && user) return (
    <>
      <TitleDescription title={data.projectName} description={data.description} />

      { isManager(data.manager, user._id) && (
        <>
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="block w-max bg-purple-400 hover:bg-purple-600 px-6 py-2.5 text-white text-lg font-semibold cursor-pointer transition-tranform hover:scale-105 duration-300"
              onClick={() => navigate(location.pathname + '?newTask=true')}
            >
              Agregar Tarea
            </button>

            <Link 
              to={"team"}
              className="block w-max bg-purple-400 hover:bg-purple-600 px-6 py-2.5 text-white text-lg font-semibold cursor-pointer transition-tranform hover:scale-105 duration-300"
            >Colaboradores</Link>
          </nav>
        </>
      ) }

      <TaskList 
        tasks={data.tasks} hasAuthorization={hasAuthorization}
      />
      { isManager(data.manager, user._id) && (
        <>
          <AddTaskModal />
          <EditTaskData />
        </>
      )}
      <TaskModalDetails />
    </>
  )
}
