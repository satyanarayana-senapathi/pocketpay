import React from 'react'
import { UserContext } from '../Context/UserContext'
import { Outlet } from 'react-router'

export const SetupLayout = () => {
  return (
    <UserContext>
      <Outlet />
    </UserContext>
  )
}
