import React from 'react'
import { Outlet } from 'react-router'
import { SendMoneyContext } from '../Context/SendMoneyContext'

export const SendMoneyLayout = () => {
  return (
    <SendMoneyContext>
      <Outlet />
    </SendMoneyContext>
  )
}
