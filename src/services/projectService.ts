import { dashboardProjectSchema, editProjectSchema, responseProjectAPIExtendSchema, responseProjectAPISchema, type Project, type ProjectFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export type UpdateProjectProps = {
  formData: ProjectFormData,
  projectId: Project['_id']
}

export default {
  createProject: async ({formData}: Pick<UpdateProjectProps, 'formData'>) => {
    try {
      const url = `/projects`;

      const { data } = await api.post(url, formData) 

      return data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error( error.response.data.error )
      }
    }
  },

  getProjects: async () => {

    try {
      const url = `/projects`

      const { data } = await api(url);

      const result = dashboardProjectSchema.safeParse(data)
      if (result.success) {
        return result.data.project;
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error( error.response.data.error )
      }
    }
  },

  getProjectById: async ({projectId}: Pick<UpdateProjectProps, 'projectId'>) => {
    try {
      const url = `/projects/${projectId}`;

      const { data } = await api(url)
      const result = responseProjectAPIExtendSchema.safeParse(data)
      if (result.success) {
        return result.data.project
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  editProjectById: async ({projectId}: Pick<UpdateProjectProps, 'projectId'>) => {
    try {
      const url = `/projects/${projectId}`;

      const { data } = await api(url)
      const result = editProjectSchema.safeParse(data)
      if (result.success) {
        return result.data.project
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },
  
  updateProject: async ({formData, projectId}: Pick<UpdateProjectProps, 'formData' | 'projectId'>) => {
    try {
      const url = `/projects/${projectId}`;
      
      const { data } = await api.put(url, formData)
      
      const result = responseProjectAPISchema.safeParse(data);

      if (result.success) {
        return result.data;
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  deleteProject: async ({projectId}: Pick<UpdateProjectProps, 'projectId'>) => {
    try {
      const url = `/projects/${projectId}`;

      const { data } = await api.delete<{msg: string}>(url)

      return data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

}