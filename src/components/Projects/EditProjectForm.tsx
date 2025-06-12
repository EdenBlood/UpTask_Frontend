import { useForm } from "react-hook-form";
import NavButton from "../NavButton";
import ProjectForm from "./ProjectForm";
import type { Project, ProjectFormData } from "@/types/index";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import projectService from "@/services/projectService";
import { toast } from "react-toastify";
import TitleDescription from "../TitleDescription";
import InputSubmit from "../InputSubmit";

type EditProjectFormProps = {
  data: ProjectFormData,
  projectId: Project['_id']
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {
  
  const navigate = useNavigate()
  
  const {register, handleSubmit, formState: {errors} } = useForm({defaultValues: {
    projectName: data.projectName,
    clientName: data.clientName,
    description: data.description
  }})

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: projectService.updateProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      //* desabilitamos el cache para hacer un nuevo fetching 
      queryClient.invalidateQueries({queryKey: ['projects']})
      queryClient.invalidateQueries({queryKey: ['editProject', projectId]})

      toast.success(data?.msg)
      navigate('/')
    }
  })
  
  const handleForm = (formData: ProjectFormData) => {
    const data = {
      formData,
      projectId
    }

    mutate(data);
  }

  return (
    <>
      <TitleDescription title="Editar Proyecto" description="Llena el siguiente formulario para editar el proyecto" />

      <NavButton path="/">
        Volver a Mis Proyectos
      </ NavButton>

      <div className="max-w-screen-md mx-auto">
        <form 
          className="form"
          onSubmit={handleSubmit( handleForm )}
          noValidate
        >
          <ProjectForm  
            register={register} 
            errors={errors}
          />

          <InputSubmit value={['Guardar Cambios', 'Guardando...']} isPending={isPending} color="fuchsia"/>
          
        </form>
      </div>
    </>
  )
}
