import NavButton from "@/components/NavButton";
import ProjectForm from "@/components/Projects/ProjectForm";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import projectService from '@/services/projectService'
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify'

import type { ProjectFormData } from "@/types/index"; 
import InputSubmit from "@/components/InputSubmit";
import TitleDescription from "@/components/TitleDescription";

export default function CreateProjectView() {
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: ""
  }
  const navigate = useNavigate()
  
  const {register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

  const { mutate, isPending } = useMutation({
    mutationFn: projectService.createProject,
    onError: (error) => {
      toast.error( error.message )
    },
    onSuccess: (data: {msg: string}) => {
      toast.success(data.msg)
      navigate('/');
    },
  })
  
  const handleForm = (formData: ProjectFormData) => mutate({formData})
  
  return (
    <>
      <TitleDescription title="Crear Proyecto" description="Llena el siguiente formulario para crear un proyecto"/>

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
          
          <InputSubmit value={['Crear Proyecto', 'Creando...']} isPending={isPending} color="fuchsia" />
        </form>
      </div>
    </>
  )
}
