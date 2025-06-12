import api from '@/lib/axios';
import { isAxiosError } from 'axios'
import { responseMsgAPISchema, type UserRegistrationForm, type ConfirmToken, type RequestConfirmationCodeForm, type UserLoginForm, type RequestNewPasswordCodeForm, type RequestNewPasswordForm, responseJWTSchema, userSchema, type PasswordForm } from '@/types/index'

export default {
  createAccount: async (formData: UserRegistrationForm ) => {
    const url = `/auth/create-account`;
    try {
      const { data } = await api.post(url, formData);

      const result = responseMsgAPISchema.safeParse(data);
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },

  confirmAccount: async(formData: ConfirmToken) => {
    const url = `/auth/confirm-account`
    try {
      const { data } = await api.post(url, formData)

      const result = responseMsgAPISchema.safeParse(data);
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  requestConfirmationCode: async (formData: RequestConfirmationCodeForm) => {
    try {
      const url = `/auth/request-code`;

      const { data } = await api.post(url, formData)

      const result = responseMsgAPISchema.safeParse(data);
      if (result.success) return result.data.msg;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  authenticateUser: async (formData: UserLoginForm) => {
    try {
      const url = `/auth/login`;

      const { data } = await api.post(url, formData)
      
      const result = responseJWTSchema.safeParse(data);
      if (result.success) {
        localStorage.setItem('AUTH_TOKEN_UP_TASK', result.data.jwt)
        return result.data.msg
      };
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  requestCodeNewPassword: async (formData: RequestNewPasswordCodeForm) => {
    try {
      const url = `/auth/forgot-password`

      const { data } = await api.post(url , formData)

      const result = responseMsgAPISchema.safeParse(data);
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  confirmTokenNewPassword: async (formData: ConfirmToken) => {
    try {
      const url = `/auth/confirm-change-password`

      const { data } = await api.post(url, formData);

      const result = responseMsgAPISchema.safeParse(data);
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  changePassword: async ({formData, token}: {formData: RequestNewPasswordForm, token: ConfirmToken['token']}) => {

    const url = `/auth/change-password/${token}`
    try {
      const { data } = await api.post(url , formData)

      const result = responseMsgAPISchema.safeParse(data);
      if (result.success) return result.data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  getUser: async () => {
    const url = `/auth/user`
    try {
      const { data } = await api(url)

      const result = userSchema.safeParse(data)
      if (result.success) return result.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  checkPassword: async ({formData} : {formData: PasswordForm}) => {
    const url = `/auth/check-password`
    try {
      const { data } = await api.post<{msg: string}>(url, formData)

      return data.msg
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  } 
}