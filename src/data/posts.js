//FUNÇÃO PARA CONSUMO DE API
export const fetchData = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts')
    const dataJson = await data.json()
    return dataJson
  }