import type { ConfirmToken } from "@/types/index"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"


type TokenForm = {
  token: string,
  isPending: boolean,
  handleChange: (token: ConfirmToken["token"]) => void,
  handleComplete: (token: ConfirmToken["token"]) => void,
}

export default function TokenForm({token, isPending, handleChange, handleComplete}: TokenForm) {
  return (
    <>
      {
        isPending ? (
        <div className='bg-white p-10 rounded-xl mt-4'>
          <div className='py-6'>
            <p className='font-black text-4xl text-center text-black'>Revisando...</p>
          </div>

        </div>
        ) : (
        <form className="form-auth">
          <p 
            className="text-2xl font-normal text-center block"
          >Código de 6 Dígitos:</p>
          <div className="flex justify-center gap-5">
            <PinInput aria-label="Código de 6 Dígitos" value={token} onChange={handleChange} onComplete={handleComplete}>
              <PinInputField className="size-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="size-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="size-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="size-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="size-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
              <PinInputField className="size-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            </PinInput>
          </div>
        </form>
        )
      }
    </>
  )
}
