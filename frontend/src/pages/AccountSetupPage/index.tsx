import StyledTemplate from '../../components/templates/StyledTemplate'
import Icon from '../../components/atoms/icon'
import pocketPay from '../../../public/assets/image/pocketPayLogo.svg'
import CustomStepper from '../../components/molecules/SteeperWithLabel'
import { Box, IconButton } from '@mui/material'
import React, { useState } from 'react'
import {
  MOBILE_NUMBER_DROPDOWN,
  setupHorizontalStepperValues,
} from '../../utils/constants'
import { AccountTypeCard } from '../../components/organisms/AccountTypeCard'
import { CountryRegistration } from '../../components/organisms/CountryRegistration'
import DropdownTypography from '../../components/organisms/dropdownTypography'
import AuthenticationAndOtp from '../../components/organisms/authenticationAndOtp'
import ApproveAnotherWay from '../../components/organisms/approveAnotherWay'
import CreatePassword from '../../components/organisms/createPassword'
import BACKICON from '../../../public/assets/image/leftArrow.svg'
import './AccountSetupPage.css'
import { useData } from '../../Context/UserContext'
import { API } from '../../services/api/api'
import { useNavigate } from 'react-router-dom'

const HeaderLogo = () => {
  return (
    <Box className="LogoIconStyleBox">
      <Icon src={pocketPay}></Icon>
    </Box>
  )
}

const AccountSetupPage: React.FC = () => {
  const { data } = useData()
  const navigate = useNavigate()
  const [count, setCount] = useState<number>(2)
  const [authenticationOtp, setAuthenticationOtp] = useState<boolean>(false)
  const [change, setChange] = useState<boolean>(true)

  async function postData(data: string[]) {
    try {
      await API.post('/users', data)
    } catch (error) {}
  }
  const handleBack = () => {
    /* istanbul ignore next */
    if (count > 2) {
      setCount((state) => state - 1)
    }
  }

  const handleFront = () => {
    if (count < setupHorizontalStepperValues.length) {
      setCount((state) => state + 1)
    }
  }

  const handleComponent = () => {
    setAuthenticationOtp(false)
    setChange(true)
  }

  const handleApproveAnotherWay = () => {
    if (change) {
      setAuthenticationOtp(false)
      setChange(false)
    }
  }

  const handleAccountSetupDetails = () => {
    if (authenticationOtp) {
      return (
        <AuthenticationAndOtp
          width="610px"
          height="68vh"
          onClick={handleFront}
          handleOtp={handleApproveAnotherWay}
        />
      )
    } else if (!change) {
      return (
        <Box className="flexContainer" marginLeft={'5%'}>
          <ApproveAnotherWay
            width="610px"
            height="500px"
            onClick={handleComponent}
          />
        </Box>
      )
    } else
      return (
        <DropdownTypography
          array={MOBILE_NUMBER_DROPDOWN}
          width="510px"
          height="68vh"
          onClick={() => setAuthenticationOtp(true)}
        />
      )
  }
  const handleMainBody = () => {
    switch (count) {
      case 2:
        return (
          <Box className="flexContainer" marginLeft={'5%'}>
            <AccountTypeCard
              width="610px"
              height="100%"
              onclick={handleFront}
            />
          </Box>
        )
      case 3:
        return (
          <Box className="flexContainer" marginLeft={'5%'}>
            <CountryRegistration
              width="610px"
              height="68vh"
              comboWidth="516px"
              onClick={handleFront}
            />
          </Box>
        )
      case 4:
        return (
          <Box className="flexContainer" marginLeft={'5%'}>
            {handleAccountSetupDetails()}
          </Box>
        )
      case 5:
        return (
          <Box className="flexContainer" marginLeft={'5%'}>
            <CreatePassword
              height="68vh"
              onClick={() => {
                postData(data)
                navigate('/your-details')
              }}
            />
          </Box>
        )
    }
  }

  return (
    <StyledTemplate
      frontHeader={<HeaderLogo />}
      middleHeader={
        <CustomStepper
          presentValue={count}
          horizontalStepperValues={setupHorizontalStepperValues}
          width="100%"
        />
      }
      buttonIcon={
        <Box className="BoxStyle">
          <IconButton onClick={handleBack} data-testid="iconButton">
            <Icon src={BACKICON} alt="back-button" />
          </IconButton>
        </Box>
      }
      mainBody={<div className="flexContainer">{handleMainBody()}</div>}
    />
  )
}

export default AccountSetupPage
