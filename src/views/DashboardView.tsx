import NavButton from "@/components/NavButton"
import projectService from "@/services/projectService"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "react-toastify"
import ProjectCard from "@/components/Projects/ProjectCard"
import TitleDescription from "@/components/TitleDescription"


export default function DashboardView() {
  const queryClient = useQueryClient();

  const { data: user, isLoading: authLoading } = useAuth()
  
  const { data, isLoading } = useQuery({
    queryKey: ['projects'], //* único
    queryFn: projectService.getProjects,
  })

  const { mutate} = useMutation({
    mutationFn: projectService.deleteProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (msg) => {
      queryClient.invalidateQueries({queryKey: ['projects']})
      toast.success(msg);
    }
  })

  if (isLoading && authLoading) return 'Cargando...'

  if (data && user) return (
    <>
      <div className="space-y-5">
        <TitleDescription title={"Mis Proyectos"} description={"Maneja y Administra tus Proyectos"} />
      </div>

      <NavButton path="/projects/create">
        Crear Nuevo Proyecto
      </ NavButton>

      {data.length
        ? (
          <ul role="list" className="divide-y-2 divide-gray-100 dark:divide-slate-700 border border-gray-100 dark:border-slate-500 mt-8 bg-white dark:bg-gray-800 shadow-lg">
            {data.map( project => (
              <ProjectCard key={project._id} project={project} mutate={mutate} user={user} />
            ))}
          </ul>
        )
        : (
          <p className="text-gray-800 dark:text-slate-200 py-25 text-center">
            No hay Proyectos aún,{''}
            <Link to="/projects/create" className="text-fuchsia-600 hover:text-fuchsia-700 font-bold cursor-pointer transition-colors duration-300">
              Crear Proyecto.
            </Link>
          </p>
        )}
    </>
  )
}