import React from 'react'
import { Outlet } from 'react-router'
import { YourDetailContext } from '../Context/YourDetailContext'

export const YourDetailLayout = () => {
  return (
    <YourDetailContext>
      <Outlet />
    </YourDetailContext>
  )
}
