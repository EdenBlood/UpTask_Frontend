import Logo from "@/components/Logo";
import { Link } from "react-router-dom";


export default function NotFound() {

  return (
    <>
      <div className='bg-gray-800 min-h-screen'>
        <div className='sm:py-4 lg:py-8 2xl:py-15 mx-auto w-[450px]'>
          <header>
            <Logo route="/auth/login" />
          </header>

          <main>
            <h1 className="font-black text-center text-4xl text-white">Pagina no encontrada</h1>
            <p className="mt-10 text-center text-white">
              Tal vez quisiera volver a {' '}
              <Link className="text-fuchsia-500" to={"/"}>Proyectos</Link>
            </p>
          </main>
        </div>
      </div>
    </>
  )
}