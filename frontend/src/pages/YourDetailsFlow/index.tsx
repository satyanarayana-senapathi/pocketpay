import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import StyledTemplate from '../../components/templates/StyledTemplate'
import Icon from '../../components/atoms/icon'
import POCKETPAYLOGO from '../../../public/assets/image/logo.svg'
import BACKICON from '../../../public/assets/image/leftArrow.svg'
import CLOSEICON from '../../../public/assets/image/close.svg'
import CustomStepper from '../../components/molecules/SteeperWithLabel'
import { options } from '../../utils/constants'
import BusinessSearch from '../../components/organisms/businessSearch'
import ConfirmBusinessDetails from '../../components/organisms/confirmBusinessDetails'
import { ConfirmTradeAddressCard } from '../../components/organisms/ConfirmAddressCard/index.stories'
import AccountVerificationCard from '../../components/organisms/AccountVerification'
import UserDetailForm from '../../components/organisms/UserDetailForm'
import Button from '../../components/atoms/button'
import './style.css'
import { useYourDetailData } from '../../Context/YourDetailContext'
import { API } from '../../services/api/api'
import { useNavigate } from 'react-router-dom'

const HeaderLogo = () => {
  return (
    <Box className="LogoIconStyleBox">
      <Icon src={POCKETPAYLOGO}></Icon>
    </Box>
  )
}

const YourDetailsFlow = () => {
  const navigate = useNavigate()
  const { yourDetailData } = useYourDetailData()
  const [stepperValue, setStepperValue] = useState<number>(1)
  const [formName, setFormName] = useState<string>('business-search')
  const [backIconControl, setBackIconControl] = useState<boolean>(false)
/* istanbul ignore next */
  async function postAccountVerificationData(data: unknown) {
    try {
      const response = await API.post('/business_type', data)
      console.log('POST response:', response.data)
    } catch (error) {
      console.error('Error posting data:', error)
    }
  }
/* istanbul ignore next */
  const handleContinue = async () => {
    let user_id = null
    try {
      const response = await API.get('/users')
      const data = response.data
      if (data && data.length > 0) {
        user_id = data[data.length - 1].id
        console.log('User id:', user_id)
      }
    } catch (error) {
      console.error('Error getting user id:', error)
    }

    const userDetailDataWithId = {
      ...UserDetailData,
      user_id: user_id,
    }

    let typeId = null
    try {
      const response = await API.get('/business_type')
      const data = response.data
      if (data && data.length > 0) {
        typeId = data[data.length - 1].id
        console.log('Type id:', typeId)
      }
    } catch (error) {
      console.error('Error getting user id:', error)
    }

    let busines_data = null
    try {
      const response = await API.get('/business')
      const data = response.data
      if (data && data.length > 0) {
        busines_data = data[data.length - 1]
        console.log(data)
      }
    } catch (error) {
      console.error('Error getting user id:', error)
    }

    const businessDataWithId = {
      ...busines_data,
      business_type_id: typeId,
    }

    try {
      await API.put(`/business/${busines_data.id}`, businessDataWithId)
      await API.post('/personal_detail', userDetailDataWithId)
      console.log('User detail data posted successfully')
      navigate('/send-money')
    } catch (error) {
      console.error('Error posting user detail data:', error)
    }
  }

  const AccountVerificationData = {
    category: yourDetailData.category,
    sub_category: yourDetailData.sub_category,
    size_of_business: yourDetailData.size_of_business,
  }

  const UserDetailData = {
    first_name: yourDetailData.firstName,
    last_name: yourDetailData.lastName,
    country_of_residency: yourDetailData.country_of_residency,
    dob: yourDetailData.dob,
    home_address: yourDetailData.address,
    city: yourDetailData.city,
    pincode: yourDetailData.code,
  }

  const handlePageNav = (
    stepvalue: number,
    iconVisibility: boolean,
    pagename: string
  ) => {
    setStepperValue(stepvalue)
    setBackIconControl(iconVisibility)
    setFormName(pagename)
  }

  const handleComponentBack = () => {
    setFormName('business-search')
    setBackIconControl(false)
  }

  return (
    <StyledTemplate
      frontHeader={<HeaderLogo />}
      middleHeader={
        <CustomStepper
          presentValue={stepperValue}
          horizontalStepperValues={options}
          width="100%"
        />
      }
      buttonIcon={
        <Box className="BoxStyle">
          {backIconControl && (
            <Button
              className="ButtonStyle"
              data-testid="back-button"
              variant="text"
              onClick={handleComponentBack}
              disableElevation
              disableTouchRipple
            >
              <Icon src={BACKICON}></Icon>
            </Button>
          )}
        </Box>
      }
      endHeader={
        <Box className="CloseButtonBox">
          <Button
            className="ButtonStyle"
            data-testid="close-button"
            variant="text"
            onClick={() => console.log('Close button Integration ...')}
            disableElevation
            disableTouchRipple
          >
            <Icon src={CLOSEICON}></Icon>
          </Button>
        </Box>
      }
      mainBody={
        <Grid container className="StyledGrid">
          {formName === 'business-search' && (
            <Grid item className="gridItemStyle">
              <BusinessSearch
                onClick={() => handlePageNav(1, true, 'confirm-detail')}
              />
            </Grid>
          )}
          {formName === 'confirm-detail' && (
            <Grid item className="gridItemStyle">
              <ConfirmBusinessDetails
                handleConfirm={() => {
                  handlePageNav(1, false, 'confirm-address')
                }}
              />
            </Grid>
          )}
          {formName === 'confirm-address' && (
            <Grid item className="gridItemStyle">
              <ConfirmTradeAddressCard
                onConfirmAddress={() => {
                  handlePageNav(2, false, 'account-verification')
                }}
                addressArray={[]}
              />
            </Grid>
          )}
          {formName === 'account-verification' && (
            <Grid item className="gridItemWithButtonStyle">
              <AccountVerificationCard
                optionDetails={{
                  selectedCategory: null,
                  selectedSubcategory: null,
                  selectedSize: null,
                }}
                handleCont={() => {
                  postAccountVerificationData(AccountVerificationData)
                  handlePageNav(3, false, 'userDetail-form')
                }}
              />
            </Grid>
          )}

          {formName === 'userDetail-form' && (
            <Grid item className="gridItemWithButtonStyle">
              <UserDetailForm
                userDetails={{
                  firstName: '',
                  lastName: '',
                  selectedCountry: null,
                  selectedDate: null,
                  address: '',
                  city: '',
                  code: '',
                }}
                handleContinue={handleContinue}
              />
            </Grid>
          )}
        </Grid>
      }
    />
  )
}

export default YourDetailsFlow
