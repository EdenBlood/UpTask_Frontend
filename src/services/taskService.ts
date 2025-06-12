import api from "@/lib/axios"
import { isAxiosError } from "axios"

import { responseTaskAPISchema, type Project, type ResponseTaskAPI, type Task, type TaskFormData, type TaskStatus } from "../types"

type TaskApi = {
  formData: TaskFormData,
  projectId: Project['_id']
  taskId: Task['_id'],
  status: TaskStatus
}

export default {
  createTask: async ({formData, projectId}: Pick<TaskApi, 'formData' | 'projectId'>) => {
    const url = `projects/${projectId}/tasks`
    try {
      const { data } = await api.post<ResponseTaskAPI>(url, formData)

      const result = responseTaskAPISchema.safeParse(data)

      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  getTaskById: async ({projectId, taskId}: Pick<TaskApi, 'projectId' | 'taskId'>) => {
    const url = `/projects/${projectId}/tasks/${taskId}`
    try {
      const { data } = await api(url)
      const result = responseTaskAPISchema.safeParse(data)
      if (result.success) return result.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  updatedTask: async ({formData, projectId, taskId }: Pick<TaskApi, 'formData' | 'projectId' | 'taskId'> ) => {
    const url = `/projects/${projectId}/tasks/${taskId}`

    try {
      const { data } = await api.put(url, formData)
      
      const result = responseTaskAPISchema.safeParse(data);
      console.log(data, result)
      if (result.success) return result.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  deleteTask: async ({projectId, taskId}: Pick<TaskApi, 'projectId' | 'taskId'>) => {
    const url = `/projects/${projectId}/tasks/${taskId}`

    try {
      const { data } = await api.delete<{msg: string}>(url)

      return data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  updateStatus: async ({projectId, taskId, status}: Pick<TaskApi, 'projectId' | 'taskId' | 'status'>) => {
    const url = `/projects/${projectId}/tasks/${taskId}/status`

    try {
      const { data } = await api.post<{msg: string}>(url, {status} )

      return data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  }
}