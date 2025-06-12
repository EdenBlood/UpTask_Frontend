import ProfileForm from "@/components/profile/ProfileForm";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileView() {
  const { data: user, isLoading: userLoading } = useAuth()

  if (userLoading) return 'Cargando...'
  
  if (user) return <ProfileForm user={user} />
}
