
type TitleDescriptionProps = {
  title: string,
  description: string,
}

export default function TitleDescription({title, description}: TitleDescriptionProps) {
  return (
    <>
      <h1 className="text-5xl font-black text-black dark:text-slate-100">{title}</h1>

      <p className="text-2xl font-light text-slate-700 dark:text-slate-300/80 mt-5">{description}</p>
    </>
  )
}
