import React from 'react'
import StyledTemplate from '../../components/templates/StyledTemplate'
import PocketPayLogo from '../../../public/assets/image/pocketPayLogo.svg'
import Icon from '../../components/atoms/icon'
import { Box } from '@mui/material'
import { SignIn } from '../../components/organisms/Signin'
import { POCKET_PAY_LOGO_ALT } from '../../utils/constants'
import './index.css'

const LoginPage = () => {
  return (
    <div>
      <StyledTemplate
        frontHeader={
          <Box className="logo">
            <Icon src={PocketPayLogo} alt={POCKET_PAY_LOGO_ALT} />
          </Box>
        }
        mainBody={
          <Box className="main">
            <SignIn />
          </Box>
        }
      />
    </div>
  )
}

export default LoginPage
