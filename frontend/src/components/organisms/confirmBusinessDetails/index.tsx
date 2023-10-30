import React, { useEffect, useState } from 'react'
import Typography from '../../atoms/Typography'
import {
  BUSINESS_DETAILS,
  BUSINESS_NAME,
  CANCEL,
  CONFIRM,
  CONFIRM_YOUR_BUSINESS_DETAILS,
  EDIT,
  REGISTERED_ADDRESS,
  REGISTRATION_NUMBER,
  SAVE,
  SEARCH_BUSINESS_MESSAGE,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import { Grid, Stack, styled } from '@mui/material'
import Button from '../../atoms/button'
import CustomTextField from '../../atoms/Textfield'
import { API } from '../../../services/api/api'

const StyledHeaderStack = styled(Stack)`
  width: 380px;
  margin: 0 0 30px;
`
const StyledFooterStack = styled(Stack)`
  width: 615px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 40px 0;
  box-sizing: border-box;
`
const StyledButtonGrid = styled(Grid)`
  @media screen and (min-width: 600px) {
    width: 615px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  display: flex;
  justify-content: flex-end;
  margin: 30px 0 0;
`
const StyledTextField = styled(CustomTextField)`
  & .MuiOutlinedInput-root {
    border-radius: 8px;
  }
  height: 60px;
  box-sizing: border-box;
  width: 516px;
  margin: 20px 0 20px;
`
const StyledTextfieldForAddress = styled(CustomTextField)`
  & .MuiOutlinedInput-root {
    height: 98px;
    width: 516px;
    border-radius: 8px;
  }
`
const StyledButton = styled(Button)`
  height: 56px;
  @media screen and (min-width: 600px) {
    width: 135px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
const StyledContentStack = styled(Stack)`
  @media screen and (min-width: 600px) {
    width: 516px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
  display: flex;
  margin: 30px 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const StyledTextFieldsGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
`
const StyledTypographyGrid = styled(Grid)`
  height: 284px;
  @media screen and (min-width: 600px) {
    width: 516px;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
interface ConfirmBusinessDetailsProps {
  handleConfirm: () => void
}

interface BusinessData {
  infoId?: number
  businessName: string
  registration: string
  address: string
}

const ConfirmBusinessDetails = (props: ConfirmBusinessDetailsProps) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [businessName, setBusinessName] = useState<string>()
  const [registration, setRegistration] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [businessData, setBusinessData] = useState<BusinessData>({
    infoId: 1,
    businessName: '',
    registration: '',
    address: '',
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await API.get('/business')
        const business = response.data
        if (business) {
          const { id, business_name, registration_number, registered_address } =
            business[0]
          const newData: BusinessData = {
            infoId: id,
            businessName: business_name,
            registration: registration_number,
            address: registered_address,
          }
          setBusinessData(newData)
        }
      } catch (error) {
        console.error('Error fetching business data:', error)
      }
    }
    fetchData()
  }, [])

  const handleSave = async () => {
    const updatedData = {
      business_name: businessName,
      registration_number: registration,
      registered_address: address,
    }

    try {
      const response = await API.patch(
        `/business/${businessData.infoId}`,
        updatedData
      )
      console.log('Business data updated successfully:', response.data)
      const updatedBusinessData = response.data

      setBusinessData({
        businessName: updatedBusinessData.business_name,
        registration: updatedBusinessData.registration_number,
        address: updatedBusinessData.registered_address,
      })

      setEdit(false)
    } catch (error) {
      console.error('Error updating business data:', error)
    }
  }

  const handleEdit = () => {
    setEdit(true)
    setBusinessName(businessData.businessName)
    setRegistration(businessData.registration)
    setAddress(businessData.address)
  }

  const handleBusinessNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusinessName(event.target.value)
  }

  const handleRegistrationNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegistration(event.target.value)
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  const handleCancel = () => {
    setEdit(false)
  }

  return (
    <div>
      <StyledHeaderStack>
        <Typography
          variant="h1"
          color={theme.palette.textColor.highEmphasis}
          sx={{ margin: '0 0 20px 0' }}
        >
          {CONFIRM_YOUR_BUSINESS_DETAILS}
        </Typography>
        <Typography
          variant="body3"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {SEARCH_BUSINESS_MESSAGE}
        </Typography>
      </StyledHeaderStack>
      {edit ? (
        <>
          <Typography
            variant="caption"
            color={theme.palette.textColor.lowEmphasis}
          >
            {BUSINESS_DETAILS}
          </Typography>
          <StyledTextFieldsGrid>
            <StyledTextField
              label={BUSINESS_NAME}
              onChange={handleBusinessNameChange}
              value={businessName}
            />
            <StyledTextField
              label={REGISTRATION_NUMBER}
              onChange={handleRegistrationNumberChange}
              value={registration}
            />
            <StyledTextfieldForAddress
              multiline={true}
              label={REGISTERED_ADDRESS}
              onChange={handleAddressChange}
              value={address}
            />
          </StyledTextFieldsGrid>
          <StyledFooterStack>
            <StyledButton
              sx={{
                color: theme.palette.primary.primary500,
                backgroundColor: theme.palette.primary.contrastText,
                ':hover': {
                  backgroundColor: theme.palette.structuralColor.buttonHover,
                },
                marginRight: '20px',
              }}
              onClick={handleCancel}
            >
              <Typography variant="body2">{CANCEL}</Typography>
            </StyledButton>
            <StyledButton
              sx={{
                ':hover': {
                  backgroundColor: theme.palette.primary.primary300,
                },
              }}
              onClick={handleSave}
            >
              <Typography variant="body2">{SAVE}</Typography>
            </StyledButton>
          </StyledFooterStack>
        </>
      ) : (
        <>
          <StyledContentStack>
            <Typography
              variant="caption"
              color={theme.palette.textColor.lowEmphasis}
            >
              {BUSINESS_DETAILS}
            </Typography>
            <Typography
              variant="underlineText"
              color={theme.palette.primary.primary500}
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={handleEdit}
              data-testid="edit-option"
            >
              {EDIT}
            </Typography>
          </StyledContentStack>
          <StyledTypographyGrid>
            <Typography
              variant="body2"
              color={theme.palette.textColor.mediumEmphasis}
            >
              {`${BUSINESS_NAME}`}
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.textColor.highEmphasis}
              sx={{ margin: '10px 0 40px' }}
            >
              {businessData.businessName}
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.textColor.mediumEmphasis}
            >
              {`${REGISTRATION_NUMBER}:`}
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.textColor.highEmphasis}
              sx={{ margin: '10px 0 40px' }}
            >
              {businessData.registration}
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.textColor.mediumEmphasis}
            >
              {`${REGISTERED_ADDRESS}:`}
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.textColor.highEmphasis}
              sx={{ margin: '10px 0 40px' }}
            >
              {businessData.address}
            </Typography>
          </StyledTypographyGrid>
          <StyledButtonGrid>
            <StyledButton
              sx={{
                backgroundColor: theme.palette.primary.primary500,
                ':hover': {
                  backgroundColor: theme.palette.primary.primary300,
                },
              }}
              onClick={props.handleConfirm}
            >
              <Typography variant="body2">{CONFIRM}</Typography>
            </StyledButton>
          </StyledButtonGrid>
        </>
      )}
    </div>
  )
}

export default ConfirmBusinessDetails
