import Typography from '../../atoms/Typography'
import ComboBox, { OptionItem } from '../../atoms/Autocomplete'
import CustomTextField from '../../atoms/Textfield'
import CustomCheckbox from '../../atoms/checkbox'
import Button from '../../atoms/button'
import { Box, styled } from '@mui/material'
import {
  ACCOUNT_NUMBER,
  CHECKING,
  CONTINUE,
  EMAIL,
  FIRST_NAME,
  IFSC,
  I_KNOW_BANK_DETAILS,
  LAST_NAME,
  RECEIPIENT_DETAILS,
  SAVING,
  SELECT_ACCOUNT_TYPE,
  SEND_TO_SOMEONE,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import { useState } from 'react'
import { useSendMoneyData } from '../../../Context/SendMoneyContext'
import { API } from '../../../services/api/api'

export interface ReceiptantsDetailsFormProps {
  height?: string
  width?: string
  top?: string
  left?: string
  comboWidth?: string
  onclick?: () => void
}

interface ReceiptantsDetailsFormState {
  email: string
  accountNumber: string
  firstName: string
  lastName: string
  ifsc: string
  accountType: OptionItem | null
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const TypoBox = styled(Box)({
  width: '197px',
  height: '40px',
})

const MiddleTypoBox = styled(Box)({
  marginTop: '2rem',
  width: '134px',
  height: '24px',
})
const StyledCustomTextField = styled(CustomTextField)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '4.5rem',
  marginTop: '1.12rem',
  '& .MuiFormLabel-root': {
    color: theme.palette.textColor.lowEmphasis,
  },
})

const CheckTypoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '19px',
  gap: '10px',
  marginTop: '1rem',
})

const StyledButtonBox = styled(Box)({
  position: 'fixed',
  top: '41rem',
  left: '64rem',

  '@media (max-width: 1280px)': {
    top: '40rem',
  },

  '@media (max-width: 1400px)': {
    left: '62rem',
  },
})

const StyledButton = styled(Button)({
  position: 'sticky',
  bottom: '2rem',
  alignSelf: 'flex-end',
  width: '135px',
  height: '56px',
  boxShadow: '0px 8px 24px 0px',
  '&:hover': {
    backgroundColor: '#a981fc',
  },
})

export const ReceiptantsDetailsForm: React.FC<ReceiptantsDetailsFormProps> = ({
  width,
  height,
  top,
  left,
  onclick,
}) => {
  const { updateSendMoneyData } = useSendMoneyData()
  const options: OptionItem[] = [{ label: SAVING }, { label: CHECKING }]
  const [isAutoFilled, setIsAutoFilled] = useState<boolean>(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [state, setState] = useState<ReceiptantsDetailsFormState>({
    email: '',
    accountNumber: '',
    firstName: '',
    lastName: '',
    ifsc: '',
    accountType: null,
  })

  const handleAutoFill = () => {
    setIsAutoFilled(!isAutoFilled)
    if (!isAutoFilled) {
      try {
        API.get('/recipient').then((response) => {
          const data = response.data
          if (data) {
            const recp_data = data[data.length - 1]
            const newData = {
              email: recp_data.email,
              accountNumber: recp_data.account_number,
              firstName: recp_data.first_name,
              lastName: recp_data.last_name,
              ifsc: recp_data.ifsc,
              accountType: recp_data.account_type,
            }
            updateSendMoneyData({
              receiptant_email: newData.email,
              receiptant_account_number: newData.accountNumber,
              receiptant_first_name: newData.firstName,
              receiptant_last_name: newData.lastName,
              receiptant_ifsc: newData.ifsc,
              receiptant_account_type: newData.accountType,
            })
            setState(newData)
          }
        })
      } catch (error) {
        console.log('Error gettingn data')
      }
    } else {
      setState({
        email: '',
        accountNumber: '',
        firstName: '',
        lastName: '',
        ifsc: '',
        accountType: null,
      })
    }
  }

  const isButtonEnabled =
    state.email !== '' &&
    state.accountNumber !== '' &&
    state.firstName !== '' &&
    state.lastName !== '' &&
    state.ifsc !== '' &&
    state.accountType !== null

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '2rem' }}>
      <StyledBox
        width={width}
        height={height}
        marginTop={top}
        marginLeft={left}
        data-testid="main-box"
      >
        <TypoBox>
          <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
            {SEND_TO_SOMEONE}
          </Typography>
        </TypoBox>
        <StyledCustomTextField
          label={EMAIL}
          type="email"
          placeholder={EMAIL}
          value={state.email}
          onChange={(event) => {
            const { value } = event.target
            updateSendMoneyData({ receiptant_email: value })
            setState((prevState) => ({
              ...prevState,
              email: value,
            }))
            const isValidEmail = emailRegex.test(value)
            setInvalidEmail(!isValidEmail)
          }}
          error={invalidEmail}
          helperText={invalidEmail ? 'Please enter a valid email address' : ''}
        />

        <CheckTypoBox>
          <CustomCheckbox
            checked={isAutoFilled}
            onClick={handleAutoFill}
            height={'1.5rem'}
            width={'1.5rem'}
          />
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {I_KNOW_BANK_DETAILS}
          </Typography>
        </CheckTypoBox>

        <MiddleTypoBox>
          <Typography
            variant="body3"
            color={theme.palette.textColor.highEmphasis}
          >
            {RECEIPIENT_DETAILS}
          </Typography>
        </MiddleTypoBox>
        <StyledCustomTextField
          label={ACCOUNT_NUMBER}
          placeholder={ACCOUNT_NUMBER}
          value={state.accountNumber}
          onChange={(event) => {
            const { value } = event.target
            updateSendMoneyData({ receiptant_account_number: value })
            const numbersOnly = value.replace(/\D/g, '')
            setState((prevState) => ({
              ...prevState,
              accountNumber: numbersOnly,
            }))
          }}
        />

        <StyledCustomTextField
          label={FIRST_NAME}
          placeholder={FIRST_NAME}
          value={state.firstName}
          onChange={(event) => {
            const { value } = event.target
            updateSendMoneyData({ receiptant_first_name: value })
            const alphabetsOnly = value.replace(/[^A-Za-z]/g, '')
            setState((prevState) => ({
              ...prevState,
              firstName: alphabetsOnly,
            }))
          }}
        />
        <StyledCustomTextField
          label={LAST_NAME}
          placeholder={LAST_NAME}
          value={state.lastName}
          onChange={(event) => {
            const { value } = event.target
            updateSendMoneyData({ receiptant_last_name: value })
            const alphabetsOnly = value.replace(/[^A-Za-z]/g, '')
            setState((prevState) => ({
              ...prevState,
              lastName: alphabetsOnly,
            }))
          }}
        />

        <StyledCustomTextField
          label={IFSC}
          placeholder={IFSC}
          value={state.ifsc}
          onChange={(event) => {
            const { value } = event.target
            updateSendMoneyData({ receiptant_ifsc: value })
            const alphanumericOnly = value.replace(/[^a-zA-Z0-9]/g, '')
            setState((prevState) => ({
              ...prevState,
              ifsc: alphanumericOnly,
            }))
          }}
        />
        <Box marginTop={'1.13rem'}>
          <ComboBox
            width={'100%'}
            label={SELECT_ACCOUNT_TYPE}
            options={options}
            data-testid="country-combo-box"
            value={state.accountType}
            onChange={(event) => {
              const value = event?.label
              updateSendMoneyData({ receiptant_account_type: value })
              setState((prevState) => ({
                ...prevState,
                accountType: event,
              }))
            }}
          />
        </Box>
      </StyledBox>
      <StyledButtonBox>
        <StyledButton onClick={onclick} disabled={!isButtonEnabled}>
          <Typography
            variant="body2"
            color={theme.palette.structuralColor.white}
          >
            {CONTINUE}
          </Typography>
        </StyledButton>
      </StyledButtonBox>
    </Box>
  )
}
