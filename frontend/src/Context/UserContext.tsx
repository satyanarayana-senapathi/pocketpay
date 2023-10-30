// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

//USED FOR "/users" TABLE
import { createContext, useContext, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataContext = createContext<any>()

export function useData() {
  return useContext(DataContext)
}

export function UserContext({ children }) {
  const [data, setData] = useState({})

  const updateData = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }))
  }

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  )
}
