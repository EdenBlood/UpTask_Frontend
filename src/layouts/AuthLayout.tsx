import Logo from '@/components/Logo'
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  const { data, isLoading, isError } = useAuth();

  if (isLoading) return "Cargando..."
  
  if (isError) return (
    <>
      <div className='bg-gray-800 min-h-screen'>
        <div className='sm:py-4 lg:py-8 2xl:py-15 mx-auto w-[450px]'>
          <header>
            <Logo route="/auth/login" />
          </header>

          <section className='mt-4'>
              <Outlet />
          </section>
        </div>
      </div>

      <ToastContainer 
        pauseOnHover={true}
        pauseOnFocusLoss={true}
      />
    </>
  )

  if (data?._id) return <Navigate to={"/"} />
}