import { useCallback, useEffect, useState } from "react"

//MEU HOOK PARA FUNÇÃO ASSINCRONA. EVITA LOOPINGS
export const useAsync = (asyncFunction, shouldRun) => {
    const [state, setState] = useState({
      result: null,
      error: null,
      status: 'idle'
    })
  
    const run = useCallback(()=>{ //USECALLBACK USADO PARA EVITAR LOOPING
      setState({
        result: null,
        error: null,
        status: 'pending'
      })
  
      return asyncFunction()
        .then((response) => {
          setState({
            result: response,
            error: null,
            status: 'settled'
          })
        })
        .catch((error) => {
          setState({
            result: null,
            error: error.message,
            status: 'error'
          })
        })
    },[asyncFunction])
  
    //PARA EXECUTAR O HOOK AUTOMATICAMENTE OU NÃO CONFORME O SHOULDRUN.
    useEffect(()=>{
      if(shouldRun){
        run()
      }
    },[run, shouldRun])
  
    return [run, state.result, state.error, state.status]
  }