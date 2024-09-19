import { ReactSetState } from "../types/utils"

type Input = {
    type : "text"
    inputValue : string;
    setInputValue : ReactSetState<string>;
}

export const Input = ({type, inputValue, setInputValue} : Input ) => {
  return (
    <input 
        type={type}
        value={inputValue}
        className='w-full p-2 mb-2 rounded-sm'
        onChange={(event)=> setInputValue(event.target.value)}/>
  )
}