import type { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { ProjectFormData } from "@/types/index";
import Label from "../Label";

export interface IProjectFormProps {
  register: UseFormRegister<ProjectFormData>,
  errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors}: IProjectFormProps) {
  return (
    <>
      <div className="div-input">
        <Label htmlFor="projectName" label="Nombre del Proyecto" />
        <input
          id="projectName"
          className="input"
          type="text"
          placeholder="Nombre del Proyecto..."
          {...register("projectName", {
            required: "El Titulo del Proyecto es obligatorio",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="div-input">
        <Label htmlFor="clientName" label="Nombre Cliente" />
        <input
          id="clientName"
          className="input"
          type="text"
          placeholder="Nombre del Cliente..."
          {...register("clientName", {
            required: "El Nombre del Cliente es obligatorio",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="div-input">
        <Label htmlFor="description" label="Descripción" />
        <textarea
          id="description"
          className="input"
          placeholder="Descripción del Proyecto..."
          {...register("description", {
            required: "La descripción del proyecto es obligatoria"
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}