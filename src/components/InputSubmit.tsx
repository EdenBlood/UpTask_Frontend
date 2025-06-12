type InputSubmitProps = {
  value: string[],
  isPending: boolean,
  color: string
}

type ColorsType = {
  [key: string]: string
}

export default function InputSubmit({value, isPending, color}: InputSubmitProps) {
  const colors : ColorsType = {
    purple: 'bg-purple-400 disabled:bg-purple-200 disabled:hover:bg-purple-200 hover:bg-purple-600',
    fuchsia: 'bg-fuchsia-600 disabled:bg-fuchsia-200 disabled:hover:bg-fuchsia-200 hover:bg-fuchsia-800'
  } 

  return (
    <>
      <input 
        type="submit"
        value={isPending ? `${value[1]}` : `${value[0]}`}
        className={`block w-full mt-8 disabled:text-black disabled:cursor-not-allowed disabled:hover:scale-100 px-6 py-3 text-white dark:text-slate-100 text-lg font-semibold cursor-pointer transition-tranform hover:scale-105 duration-300 ${colors[color]}`}
        disabled={isPending}
      /> 
    </>
  )
}
