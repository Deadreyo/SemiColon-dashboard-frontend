import { useState } from 'react'
import DataContext from './data-context'
import { Participant } from '../types/Participant'
import { authHeader } from '../helpers/auth'
import axios from 'axios'

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<Participant[]>([])
  const fetchParticipants = async () => {
    try {
      //'https://semicolon-registration-backend.onrender.com/participants/getAll',
      // const res = await fetch(
      //   'https://semicolon-registration-backend.onrender.com/participants/getAll'
      // )
      const hdrs = authHeader()
      if (hdrs) {
        const res = await axios.get(
          'https://semicolon-registration-backend.onrender.com/participants/getAll',
          { headers: hdrs }
        )
        const participants = res.data
        if (res.status !== 200) {
          throw new Error('Could not connect to database')
        }
        return participants.data
      }
    } catch (err: unknown) {
      const { message } = err as { message: string }
      console.log(message)
      return []
    }
  }

  const fetchItemsHandler = async () => {
    const pars = await fetchParticipants()
    setData(pars)
  }

  const dataContext = {
    data: data,
    fetchData: fetchItemsHandler,
  }

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  )
}

export default DataContextProvider
