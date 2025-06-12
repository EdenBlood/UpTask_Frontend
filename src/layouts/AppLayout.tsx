import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Navigate } from 'react-router-dom'

import Logo from "../components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";

export default function AppLayout() {
 //* Dark Mode */
  const [ darkMode, setDarkMode ] = useState<boolean>(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem('UpTask_Theme')
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('UpTask_Theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('UpTask_Theme', 'light')
    }
  }, [darkMode])

  //* Autenticación y autorización */
  const { data, isLoading, isError } = useAuth();
  
  if (isError) return <Navigate to={"/auth/login"} />
  
  if (isLoading) return "Cargando..."
  
  if (data?._id) return (
    <>
      <header className="bg-gray-800 dark:bg-purple-950 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-60">
            <Logo route="/"/>
          </div>

          <NavMenu 
            name={data.name}
          />
        </div>
      </header>
      
      <section className="max-w-screen-xl mx-auto mt-4 p-5">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>

      <button 
        className="fixed size-10 bg-black dark:bg-white rounded-full text-white dark:text-black bottom-16 right-16 shadow-lg flex items-center justify-center hover:scale-110 transform duration-500 ring-black/50 dark:ring-white/50 ring-1 cursor-pointer" 
        type="button" 
        onClick={() => setDarkMode(!darkMode)

      }> { darkMode ? (
        <MoonIcon className="size-7"/>
      ) : (
        <SunIcon className="size-7"/>
      )}
      </button>

      <ToastContainer 
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}