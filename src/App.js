import {useAsync} from './hooks/useAsync.js'
import {fetchData} from './data/posts.js'


function App() {
  //hook para uso da api, com função assincrona: retorna uma nova função e alguns estados possíveis.
  const [reFetchData, result, error, status] = useAsync(fetchData, true)

  //função auxiliar para botão de reload
  const reloadReFetchData = ()=>{
    reFetchData()
  }

  if(status === 'idle'){
    return <pre>Nada executando!</pre>
  }
  if(status === 'pending'){
    return <pre>Carregando...</pre>
  }
  if(status === 'error'){
    return <pre>ERRO: {JSON.stringify(error, null, 2)}</pre>
  }
  if(status === 'settled'){
    return (
      <>
        <button onClick={reloadReFetchData}>Reload</button>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </>
    )
  }
  
}

export default App;
