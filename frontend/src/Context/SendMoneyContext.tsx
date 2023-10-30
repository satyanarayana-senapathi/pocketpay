// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

//USED FOR "/business_type,/personal_detail" TABLE
import { createContext, useContext, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SendMoneyDataContext = createContext<any>()

export function useSendMoneyData() {
  return useContext(SendMoneyDataContext)
}

export function SendMoneyContext({ children }) {
  const [sendMoneyData, setSendMoneyData] = useState({})

  const updateSendMoneyData = (newData) => {
    setSendMoneyData((prevData) => ({ ...prevData, ...newData }))
  }

  return (
    <SendMoneyDataContext.Provider
      value={{ sendMoneyData, updateSendMoneyData }}
    >
      {children}
    </SendMoneyDataContext.Provider>
  )
}
