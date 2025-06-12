import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})


//* Esto hace que siempre que ejecutemos una petición HTTPS agregue automáticamente el "jwt"   
//* .request hace que se ejecute antes del envió y .reponse después que se envió
api.interceptors.request.use( config => {
  const token = localStorage.getItem('AUTH_TOKEN_UP_TASK')
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
//* esto es lo mismo que pasarle a axios:
// {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// }

export default api
