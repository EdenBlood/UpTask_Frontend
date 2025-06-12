import { useQuery } from '@tanstack/react-query'
import authService from "@/services/authService";

export const useAuth = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getUser,
    retry: false,
    refetchOnWindowFocus: false //* Hace un refetch cada vez que cambiamos de pestaña
  }) 

  return { data, isLoading, isError }
}