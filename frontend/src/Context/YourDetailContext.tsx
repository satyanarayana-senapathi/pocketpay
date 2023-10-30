// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

//USED FOR "/business_type,/personal_detail" TABLE
import { createContext, useContext, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const YourDetailDataContext = createContext<any>()

export function useYourDetailData() {
  return useContext(YourDetailDataContext)
}

export function YourDetailContext({ children }) {
  const [yourDetailData, setYourDetailData] = useState({})

  const updateYourDetailData = (newData) => {
    setYourDetailData((prevData) => ({ ...prevData, ...newData }))
  }

  return (
    <YourDetailDataContext.Provider
      value={{ yourDetailData, updateYourDetailData }}
    >
      {children}
    </YourDetailDataContext.Provider>
  )
}
