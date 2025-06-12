import { isAxiosError } from "axios"
import { responseMsgAPISchema, type Note, type NoteFormData, type Project, type Task } from "../types";
import api from "@/lib/axios";

type Props = {
  formData: NoteFormData;
  projectId: Project['_id'];
  taskId: Task['_id'];
  noteId: Note['_id']
}

export default {
  createNote: async ({formData, projectId, taskId}: Pick<Props, 'formData' | 'projectId' | 'taskId'>) => {
    const url = `/projects/${projectId}/tasks/${taskId}/notes`;
    try {
      const { data } = await api.post(url, formData)

      const result = responseMsgAPISchema.safeParse(data)
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  deleteNote: async ({projectId, taskId, noteId}: Pick<Props, 'projectId' | 'taskId' | 'noteId'>) => {
    const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
    try {
      const { data } = await api.delete<{msg: string}>(url)

      return data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },
}