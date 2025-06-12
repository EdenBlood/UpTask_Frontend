import { isAxiosError } from "axios";
import { responseTeamMemberMSGSchema, responseTeamMemberSchema, teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "../types";
import api from "@/lib/axios";

type Props = {
  formData: TeamMemberForm,
  projectId: Project['_id']
  id: TeamMember['_id']
}

export default {
  findUserByEmail: async ({formData, projectId}: Pick<Props, 'formData' | 'projectId'>) => {
    const url = `/projects/${projectId}/team/find`
    try {
      const { data } = await api.post(url, formData)

      const result = responseTeamMemberSchema.safeParse(data)
      if (result.success) return result.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  addUserToProject: async ({id, projectId}: Pick<Props, 'id' | 'projectId'>) => {
    const url = `/projects/${projectId}/team`
    try {
      const { data } = await api.post(url, {id})

      const result = responseTeamMemberMSGSchema.safeParse(data)
      if (result.success) return result.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  getProjectTeam: async ({projectId}: Pick<Props, 'projectId'>) => {
    const url = `/projects/${projectId}/team`
    try {
      const { data } = await api(url)

      const result = teamMembersSchema.safeParse(data);
      if (result.success) return result.data.users.team
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  removeUserFromProject: async ({id, projectId}: Pick<Props, 'id' | 'projectId'>) => {
    const url = `/projects/${projectId}/team/${id}`
    try {
      const { data } = await api.delete(url)

      const result = responseTeamMemberMSGSchema.safeParse(data)
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  }
}