import { isAxiosError } from "axios";
import { responseMsgAPISchema, type ChangePasswordForm, type UserProfileForm } from "../types"
import api from "@/lib/axios";

type Props = {
  userData: UserProfileForm;
  formData: ChangePasswordForm
}

export default {
  updateUserData: async ({userData}: Pick<Props, 'userData'>) => {
    const url = `/profile`;
    try {
      const { data } = await api.patch(url, userData)

      const result = responseMsgAPISchema.safeParse(data)
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  changePassword: async ({formData}: Pick<Props, 'formData'>) => {
    const url = `/profile/change-password`;
    try {
      const { data } = await api.patch(url, formData)

      const result = responseMsgAPISchema.safeParse(data)
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  }
}