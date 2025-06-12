import teamService from "@/services/teamService"
import type { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"

type SearchResultProps = {
  user: TeamMember,
  resetData: () => void
}

export default function SearchResult({user, resetData}: SearchResultProps) {
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation();
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate } =useMutation({
    mutationFn: teamService.addUserToProject,
    onError: ({message}) => {
      toast.error(message)
    },
    onSuccess: (msg) => {
      toast.success(msg)
      navigate(location.pathname, {replace: true})
      resetData()
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
    }
  })
  
  const handleAddMember = () => {
    const sendData = {
      id: user._id,
      projectId
    }
    mutate(sendData)
    
  }
  return (
    <>
      <p className="text-center font-bold">Resultado:</p>
      <div className="flex mt-5 justify-between items-center">
        <div className="flex items-center gap-6">
          <p className="font-normal text-lg">{user.name}</p>
          <p>-</p>
          <p className="font-normal text-lg">{user.email}</p>
        </div>
        
        <div className="flex justify-between items-center gap-8">
          <button
            onClick={handleAddMember}
            type="button"
            className="block w-max hover:bg-fuchsia-100 px-5 py-2 text-fuchsia-600 hover:text-fuchsia-700 text-md font-semibold cursor-pointer transition-tranform hover:scale-105 duration-300 dark:hover:bg-fuchsia-900 dark:hover:text-white dark:text-fuchsia-400"
          >Agregar al Proyecto</button> 
        </div>
      </div>
    </>
  )
}