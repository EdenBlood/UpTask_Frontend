import { z } from 'zod'

//*Section Auth and Users ***/
export const responseMsgAPISchema = z.object({
  msg: z.string()
})

export const responseJWTSchema = z.object({
  msg: z.string(),
  jwt: z.string()
})

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
})

export type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>
export type ConfirmToken = Pick<Auth, 'token'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type RequestNewPasswordCodeForm = Pick<Auth, 'email'>
export type RequestNewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type UserProfileForm = Pick<Auth, 'name' | 'email'>
export type PasswordForm = Pick<Auth, 'password'>

//*Section Profile ***/ 
export const changePasswordSchema = z.object({
  current_password: z.string(),
  new_password: z.string(),
  new_password_repeat: z.string(),
})

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>

//*Section User ***/ 
export const userSchema = authSchema.pick({
  name: true,
  email: true,
}).extend({
  _id: z.string()
})

export type User = z.infer<typeof userSchema>

//*Section Notes */
export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>



//*Section Task ***/ 
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export const taskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  completedBy: z.array(
    z.object({
      _id: z.string(), //* Esta es requerida como Key en el "map".
      user: userSchema,
      status: taskStatusSchema,
      date: z.string()
    })
  ),  // También se puede hacer con .or(z.null())
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema
    })
  )
})

export const taskProjectSchema = taskSchema.pick({
      _id: true,
      name: true,
      description: true,
      project: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    }).extend({
      completedBy: z.array(
        z.object({
          _id: z.string(), //* Esta es requerida como Key en el "map".
          user: userSchema,
          status: taskStatusSchema,
          date: z.string()
        })
      ),
      notes: z.array(z.string()) 
    })

export const responseTaskAPISchema = z.object({
  msg: z.string(),
  task: taskSchema,
  manager: z.string(), 
})

export type ResponseTaskAPI = z.infer<typeof responseTaskAPISchema>
export type Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'name' | 'description'>
export type TaskStatus = z.infer<typeof taskStatusSchema>
export type TaskProject = z.infer<typeof taskProjectSchema>

//*Section Projects ***/
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string()
})

//* Respuesta de la API 
export const dashboardProjectSchema = z.object({
  project: z.array(
    projectSchema.pick({
      _id: true,
      projectName: true,
      clientName: true,
      description: true,
      manager: true
    })
  ),
  msg: z.string()
}) 

export const responseProjectAPIExtendSchema = z.object({
  project: z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(),
    tasks: z.array(taskProjectSchema),
  }),
  msg: z.string()
})
export const responseProjectAPISchema = z.object({
  project: projectSchema,
  msg: z.string()
})

export const editProjectSchema = z.object({
  msg: z.string(),
  project: projectSchema.pick({
    clientName: true,
    description: true,
    projectName: true
  })
})

export type Project = z.infer<typeof projectSchema>
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description' >

//*Section Team */
export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true
})

export const responseTeamMemberSchema = z.object({
  msg: z.string(),
  user: teamMemberSchema
})

export const responseTeamMemberMSGSchema = responseTeamMemberSchema.pick({
  msg: true
})

export const teamMembersSchema = z.object({
  users: z.object({
    team: z.array(teamMemberSchema),
  }),
  msg: z.string()
})

export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>


