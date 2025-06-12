import { Navigate, useLocation, useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import taskService from '@/services/taskService';
import EditTaskModal from './EditTaskModal';

export default function EditTaskData() {
  
  const params = useParams()
  const projectId = params.projectId!

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const taskId = queryParams.get('editTask')!;

  const { data, isError } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => taskService.getTaskById({projectId, taskId}),
    retry: false,
    enabled: !!taskId
  })

  if (isError) return <Navigate to={"/404"} />
  if (data) return <EditTaskModal data={data.task} taskId={taskId}/>
} 