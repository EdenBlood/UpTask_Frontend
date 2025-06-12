import { Link } from "react-router-dom";

type LogoProps = {
  route: string
} 

export default function Logo({route}: LogoProps) {
  return (
    <Link to={route}>
      <picture>
        <img src="/logo.svg" alt="Logotipo UpTask" />
      </picture>
    </Link>
  )
}
