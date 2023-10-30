import { Box, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import CustomTextField from '../../atoms/Textfield'
import DateSelector from '../../molecules/DateSelector'
import ComboBox, { OptionItem } from '../../atoms/Autocomplete'
import theme from '../../../utils/themes/theme'
import Button from '../../atoms/button'
import {
  UDF_COUNTRY_OPTIONS,
  UDF_continue,
  UDF_heading,
  UDF_label_City,
  UDF_label_FirstName,
  UDF_label_LastName,
  UDF_label_address,
  UDF_label_code,
  UDF_label_option,
  UDF_subheading,
} from '../../../utils/constants'
import { ChangeEvent, useEffect, useState } from 'react'
import { useYourDetailData } from '../../../Context/YourDetailContext'
import dayjs from 'dayjs'

interface FormData {
  firstName: string
  lastName: string
  selectedCountry: OptionItem | null
  selectedDate: string | null
  address: string
  city: string
  code: string
}

interface UserDetailFormProps {
  userDetails: FormData
  handleContinue: () => void
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  padding: '5px',
})

const DataBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '3.5rem',
})

const BottomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
})

const InnerStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

const BottomStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
})

const ContinueButton = styled(Button)({
  width: '135px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
})

const StyledTextField = styled(CustomTextField)({
  '& label.Mui-focused': {
    color: theme.palette.textColor.lowEmphasis,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
  },
})

const UserDetailForm = (props: UserDetailFormProps) => {
  const { updateYourDetailData } = useYourDetailData()
  const [userDetails, setUserDetails] = useState<FormData>(props.userDetails)

  const [errors, setErrors] = useState<{
    firstName: string
    lastName: string
    city: string
  }>({
    firstName: '',
    lastName: '',
    city: '',
  })

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isFormValid =
      Object.values(errors).every((error) => error === '') &&
      Object.values(userDetails).every((value) => value !== '')

    setIsFormValid(isFormValid)
  }, [userDetails, errors])

  const validateName = (fieldName: string, value: string) => {
    const alphabeticSpaceRegex = /^[A-Za-z\s]+$/

    if (!alphabeticSpaceRegex.exec(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: 'Must contain only alphabetic characters.',
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: '',
      }))
    }
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    if (name === 'firstName' || name === 'lastName' || name === 'city') {
      validateName(name, event.target.value)
    }

    const { value } = event.target
    updateYourDetailData({ [name]: value })
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }))
  }

  const handleCountryChange = (option: OptionItem | null) => {
    const country_of_residency = option?.label
    updateYourDetailData({ country_of_residency })
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      selectedCountry: option,
    }))
  }

  const handleDateChange = (date: string | null) => {
    const dob = date
    updateYourDetailData({ dob })
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      selectedDate: date,
    }))
  }

  return (
    <StyledBox>
      <DataBox>
        <InnerStack spacing={'0.75rem'}>
          <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
            {UDF_heading}
          </Typography>
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {UDF_subheading}
          </Typography>
        </InnerStack>
        <Box>
          <BottomStack spacing={'1rem'}>
            <StyledTextField
              label={UDF_label_FirstName}
              name="firstName"
              value={userDetails.firstName}
              onChange={(e) => handleChange(e, 'firstName')}
            ></StyledTextField>
            {errors.firstName && (
              <Typography variant="caption" color={'red'}>
                {errors.firstName}
              </Typography>
            )}
            <StyledTextField
              label={UDF_label_LastName}
              name="lastName"
              value={userDetails.lastName}
              onChange={(e) => handleChange(e, 'lastName')}
            ></StyledTextField>
            {errors.lastName && (
              <Typography variant="caption" color={'red'}>
                {errors.lastName}
              </Typography>
            )}
            <ComboBox
              label={UDF_label_option}
              value={userDetails.selectedCountry}
              onChange={handleCountryChange}
              options={UDF_COUNTRY_OPTIONS}
            ></ComboBox>
            <DateSelector
              onChange={handleDateChange}
              value={dayjs(userDetails.selectedDate).toDate()}
            ></DateSelector>
            <StyledTextField
              label={UDF_label_address}
              name="address"
              value={userDetails.address}
              onChange={(e) => handleChange(e, 'address')}
            ></StyledTextField>
            <StyledTextField
              label={UDF_label_City}
              name="city"
              value={userDetails.city}
              onChange={(e) => handleChange(e, 'city')}
            ></StyledTextField>
            {errors.city && (
              <Typography variant="caption" color={'red'}>
                {errors.city}
              </Typography>
            )}
            <StyledTextField
              label={UDF_label_code}
              name="code"
              value={userDetails.code}
              onChange={(e) => handleChange(e, 'code')}
            ></StyledTextField>
          </BottomStack>
        </Box>
      </DataBox>
      <BottomBox>
        <ContinueButton
          data-testid="continue-button"
          onClick={props.handleContinue}
          disabled={!isFormValid}
        >
          <Typography
            variant="body2"
            color={theme.palette.structuralColor.white}
          >
            {UDF_continue}
          </Typography>
        </ContinueButton>
      </BottomBox>
    </StyledBox>
  )
}

export default UserDetailForm
