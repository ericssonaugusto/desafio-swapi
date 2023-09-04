import { useState } from "react"

export function Loop() {

  const [dadosApi, pegaDadosApi] = useState([])
  
  async function getContentApi() {
    try {      
      const response = await fetch (' http://localhost:9009/')
      console.log(response)
      const data = await response.json()
      pegaDadosApi(data)
    } catch (error) {
      console.log(error)
    }  
  }
 getContentApi()
  return (
    <ul>
      {dadosApi.map((dadoApi) => (
        <li>{dadoApi.name}</li>
      ))}
        <li></li>
    </ul>
  )


}