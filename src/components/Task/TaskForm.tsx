import type { TaskFormData } from "@/types/index"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import Label from "../Label"

type TaskFormProps = {
  register: UseFormRegister<TaskFormData>,
  errors: FieldErrors<TaskFormData>
}

export default function TaskForm({register, errors}: TaskFormProps) {
  
  return (
    <>
      <div className="div-input">
        <Label htmlFor="name" label="Nombre de la Tarea:" />
        <input 
          type="text"
          id="name"
          placeholder="Ingrese el nombre de la Tarea..."
          className="input"
          {...register("name", { required: "El Nombre de la Tarea es obligatorio"})}
          />
          { errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          )}
      </div>
      <div className="div-input">
        <Label htmlFor="description" label="Descripción de la Tarea:" />
        <textarea 
          id="description"
          placeholder="Ingrese la descripción de la Tarea..."
          className="input"
          {...register('description', {required: "La Descripción de la Tarea es obligatoria"})}
          />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>    
  )
}