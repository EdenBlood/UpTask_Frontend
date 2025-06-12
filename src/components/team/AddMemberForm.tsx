import type { TeamMemberForm } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import Label from "../Label";

type AddMemberFormProps = {
  register: UseFormRegister<TeamMemberForm>
  errors: FieldErrors<TeamMemberForm>
}
export default function AddMemberForm({register, errors}: AddMemberFormProps) {
  return (
    <>
        <div className="div-input">
          <Label htmlFor="name" label="E-mail de Usuario" />
          <input
            id="name"
            type="text"
            placeholder="E-mail del usuario a Agregar"
            className="input"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>
    </>
  )
}