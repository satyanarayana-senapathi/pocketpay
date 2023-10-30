import { Box, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import CustomTextField from '../../atoms/Textfield'
import DateSelector from '../../molecules/DateSelector'
import ComboBox, { OptionItem } from '../../atoms/Autocomplete'
import theme from '../../../utils/themes/theme'
import Button from '../../atoms/button'
import PLUSICON from '../../../../public/assets/image/plus.svg'
import CLOSEICON from '../../../../public/assets/image/close.svg'
import Icon from '../../atoms/icon'
import {
  CONTINUE,
  UDF_COUNTRY_OPTIONS,
  UDF_label_FirstName,
  UDF_label_LastName,
  UDF_label_option,
} from '../../../utils/constants'
import { useEffect, useState } from 'react'
import { useSendMoneyData } from '../../../Context/SendMoneyContext'
import dayjs from 'dayjs'

export interface BusinessDetailsDataType {
  id: number
  firstName: string
  lastName: string
  selectedCountry: OptionItem | null
  selectedDate: string | null
}

export interface BusinessDetailsFormProps {
  businessData: BusinessDetailsDataType[]
  formHeading: string
  formDescription: string
  roleName: string
  addRoleButtonText: string
  clearData: boolean
  onContinue: () => void
}

const isRoleDetailsValid = (roleDetail: BusinessDetailsDataType) => {
  const isValidFirstName = roleDetail.firstName !== ''
  const isValidLastName = roleDetail.lastName !== ''
  const isValidDob = roleDetail.selectedDate !== null
  const isValidResidence = roleDetail.selectedCountry !== null

  return isValidFirstName && isValidLastName && isValidDob && isValidResidence
}

const BusinessDetailsForm = (props: BusinessDetailsFormProps) => {
  const { updateSendMoneyData } = useSendMoneyData()
  const [rolesDetails, setRolesDetails] = useState<BusinessDetailsDataType[]>(
    props.businessData
  )

  const [errors, setErrors] = useState<{ firstName: string; lastName: string }>(
    {
      firstName: '',
      lastName: '',
    }
  )

  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValidDetails = rolesDetails.every((roleDetail) =>
      isRoleDetailsValid(roleDetail)
    )

    const name_of_role = props.roleName.toLowerCase()
    updateSendMoneyData({ [name_of_role]: rolesDetails })

    setIsFormValid(isValidDetails)
  }, [rolesDetails])

  const handleAddRole = () => {
    setRolesDetails((prevRoles) => [
      ...prevRoles,
      {
        id: 1,
        firstName: '',
        lastName: '',
        selectedDate: '',
        selectedCountry: null,
      },
    ])
  }

  const handleRemoveRole = (index: number) => {
    setRolesDetails((prevRoles) => {
      const updatedRoles = [...prevRoles]
      updatedRoles.splice(index, 1)
      const name_of_role = props.roleName.toLowerCase()
      updateSendMoneyData({ [name_of_role]: updatedRoles })
      return updatedRoles
    })
  }

  const validateName = (fieldName: string, value: string) => {
    const alphabeticSpaceRegex = /^[A-Za-z\s]+$/

    if (!alphabeticSpaceRegex.exec(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${
          fieldName === 'firstName' ? 'First' : 'Last'
        } Name must contain only alphabetic characters.`,
      }))
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: '',
      }))
    }
  }

  const handleRoleDetailsChange = (
    index: number,
    fieldName: string,
    value: string | OptionItem | undefined
  ) => {
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      validateName(fieldName, value as string)
    }

    setRolesDetails((prevRoles) => {
      const updatedRoles = [...prevRoles]
      updatedRoles[index] = {
        ...updatedRoles[index],
        [fieldName]: value,
      }
      return updatedRoles
    })
  }

  const handleContinue = () => {
    if (props.clearData) {
      setRolesDetails([
        {
          id: 1,
          firstName: '',
          lastName: '',
          selectedDate: '',
          selectedCountry: null,
        },
      ])
      props.onContinue()
    } else {
      props.onContinue()
    }
  }

  return (
    <StyledBox>
      <DataBox>
        <HeaderStack spacing={'0.75rem'}>
          <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
            {props.formHeading}
          </Typography>
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {props.formDescription}
          </Typography>
        </HeaderStack>
        {rolesDetails.map((value, index) => (
          <Box key={value.id}>
            <TopStack>
              <Typography
                variant="body3"
                sx={{ paddingTop: '5px' }}
                color={theme.palette.textColor.mediumEmphasis}
              >
                {`${props.roleName} ${index + 1}`}
              </Typography>
              {index > 0 && (
                <RemoveButton
                  variant="text"
                  startIcon={<Icon src={CLOSEICON} alt="close-button"></Icon>}
                  onClick={() => handleRemoveRole(index)}
                  disableElevation
                  disableRipple
                ></RemoveButton>
              )}
            </TopStack>
            <FormStack spacing={'1rem'}>
              <StyledTextField
                label={UDF_label_FirstName}
                name="firstName"
                value={value.firstName}
                onChange={(e) => {
                  handleRoleDetailsChange(index, 'firstName', e.target.value)
                }}
              ></StyledTextField>
              {errors.firstName && (
                <Typography variant="caption" color={'red'}>
                  {errors.firstName}
                </Typography>
              )}
              <StyledTextField
                label={UDF_label_LastName}
                name="lastName"
                value={value.lastName}
                onChange={(e) => {
                  handleRoleDetailsChange(index, 'lastName', e.target.value)
                }}
              ></StyledTextField>
              {errors.lastName && (
                <Typography variant="caption" color={'red'}>
                  {errors.lastName}
                </Typography>
              )}
              <StyledStack>
                <DateSelector
                  value={dayjs(value.selectedDate)}
                  onChange={(date) => {
                    handleRoleDetailsChange(
                      index,
                      'selectedDate',
                      date.toISOString().split('T')[0]
                    )
                  }}
                ></DateSelector>
              </StyledStack>
              <StyledStack>
                <ComboBox
                  label={UDF_label_option}
                  value={value.selectedCountry}
                  onChange={(selectedOption: OptionItem | null) => {
                    handleRoleDetailsChange(
                      index,
                      'selectedCountry',
                      selectedOption?.label
                    )
                  }}
                  options={UDF_COUNTRY_OPTIONS}
                ></ComboBox>
              </StyledStack>
            </FormStack>
          </Box>
        ))}
        <ButtonBox>
          <AddButton
            onClick={handleAddRole}
            startIcon={<Icon src={PLUSICON}></Icon>}
            disableFocusRipple
            disableElevation
          >
            <Typography
              variant="body3"
              color={theme.palette.primary.primary500}
            >
              {`Add another ${props.addRoleButtonText}`}
            </Typography>
          </AddButton>
        </ButtonBox>
      </DataBox>

      <BottomBox>
        <ContinueBtn onClick={handleContinue} disabled={!isFormValid}>
          <Typography variant="body2">{CONTINUE}</Typography>
        </ContinueBtn>
      </BottomBox>
    </StyledBox>
  )
}

export default BusinessDetailsForm

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  padding: '5px',
})

const BottomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
})

const DataBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const ButtonBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: '1.25rem',
})

const ContinueBtn = styled(Button)({
  width: '135px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
})

const AddButton = styled(Button)({
  width: '220px',
  height: '56px',
  borderRadius: '0px',
  padding: '0px',
  color: theme.palette.primary.primary500,
  backgroundColor: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.cardHover,
  },
})

const RemoveButton = styled(Button)({
  justifyContent: 'flex-end',
  padding: '0px 0px 0px 0px',
  borderRadius: '0px',
  '&::hover': {
    backgroundColor: theme.palette.structuralColor.white,
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
  width: '516px',
})

const TopStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: '2rem',
})

const HeaderStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
})

const FormStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2rem',
})

const StyledStack = styled(Stack)`
  width: 516px;
`
