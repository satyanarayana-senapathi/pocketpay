import React, { useState } from 'react'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import CustomTextField from '../../atoms/Textfield'
import Button from '../../atoms/button'
import {
  DIDNT_RECEIVE_CODE,
  ENTER_6_DIGIT_CODE,
  ENTER_YOUR_CODE,
  SUBMIT_BUTTON,
  WE_SENT_IT_TO,
} from '../../../utils/constants'
import styled from '@emotion/styled'
import { Grid, Stack } from '@mui/material'

const StyledButton = styled(Button)(() => ({
  height: '56px',
  width: '135px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:disabled': {
    backgroundColor: theme.palette.primary.primary100,
    color: theme.palette.textColor.contrastText,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
}))

const StyledTextField = styled(CustomTextField)(() => ({
  height: '60px',
  '& .MuiFormLabel-root': {
    color: theme.palette.textColor.lowEmphasis,
  },
  '@media (min-width: 800px)': {
    width: '516px',
  },
  '@media (max-width: 600px)': {
    width: '100%',
  },
  margin: '0 0 40px',
  borderRadius: '8px',
}))

const StyledButtonGrid = styled(Grid)`
  width: 651px;
`

const StyledStack = styled(Stack)`
  margin: 10px 0 50px;
`

interface AuthenticationAndOtpProps {
  width?: string
  height?: string
  onClick?: () => void
  handleOtp?: () => void
}

const AuthenticationAndOtp = ({
  width,
  height,
  onClick,
  handleOtp,
}: AuthenticationAndOtpProps) => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const phoneNumber = '+44020 7947 6330'

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    const plainNumberRegex = /^\d+$/

    if (
      inputValue.length === 6 &&
      plainNumberRegex.test(inputValue) &&
      !isNaN(parseInt(inputValue))
    ) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  return (
    <div>
      <Grid width={width} height={height}>
        <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
          {ENTER_6_DIGIT_CODE}
        </Typography>
        <StyledStack>
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {WE_SENT_IT_TO} {phoneNumber}
          </Typography>
        </StyledStack>
        <StyledTextField
          label={ENTER_YOUR_CODE}
          onChange={handleValueChange}
          data-testid="OTP-textField"
          error={disabled}
          helperText={disabled ? 'enter 6 digits' : ''}
        />
        <Typography
          variant="underlineText"
          color={theme.palette.primary.primary500}
          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={handleOtp}
        >
          {DIDNT_RECEIVE_CODE}
        </Typography>
      </Grid>
      <StyledButtonGrid display="flex" justifyContent="flex-end">
        <StyledButton
          disabled={disabled}
          onClick={onClick}
          data-testid="submit-button"
        >
          <Typography
            variant="body2"
            color={theme.palette.structuralColor.white}
          >
            {SUBMIT_BUTTON}
          </Typography>
        </StyledButton>
      </StyledButtonGrid>
    </div>
  )
}

export default AuthenticationAndOtp
