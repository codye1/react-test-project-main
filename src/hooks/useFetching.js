import { useCallback, useState } from "react"

export const useFetching = (callback)=>{
    const[load,setLoad]=useState(false);
    const [error,setError]=useState('')

    const fetch = async (...args)=>{
        try{
            setLoad(true)
            await callback(...args)
        }catch (e){
            setError(e.message)
        }finally{
            setLoad(false)
        }
    }
    return [fetch,load,error]
}