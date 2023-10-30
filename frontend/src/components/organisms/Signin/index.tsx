import Typography from '../../atoms/Typography'
import CustomTextField from '../../atoms/Textfield'
import Button from '../../atoms/button'
import { Box, IconButton, InputAdornment, styled } from '@mui/material'
import theme from '../../../utils/themes/theme'
import IconGrid from '../../molecules/IconGrid'
import GOOGLE from '../../../../public/assets/image/google.svg'
import FACEBOOK from '../../../../public/assets/image/facebook.svg'
import APPLE from '../../../../public/assets/image/apple.svg'
import {
  WELCOME_BACK,
  OR_LOG_IN,
  LOG_IN,
  ENTER_YOUR_EMAIL,
  TROUBLE_LOGGIN_IN,
  REMEMBER_ME,
  ENTER_YOUR_PASSWORD,
} from '../../../utils/constants'
import CustomCheckbox from '../../atoms/checkbox'
import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useAuth0 } from '@auth0/auth0-react'

export interface SigninProps {
  width?: string
  height?: string
  top?: string
  left?: string
  onClick?: (email: string, password: string) => void
}

interface SignInState {
  showPassword: boolean
}

const StyledTypography = styled(Typography)({
  width: '516px',
  height: '40px',
  color: theme.palette.textColor.highEmphasis,
})

const StyledCustomTextField = styled(CustomTextField)({
  width: '100%',
  marginTop: '4rem',
})

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const StyledTypographyBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3rem',
})

const StyledIconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '3rem',
})

const FootedBox = styled(Box)({
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
})

const CheckTypoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  width: '50%',
  height: '19px',
  gap: '10px',
})

const StyledButtonBox = styled(Box)({
  display: 'flex',
  marginTop: '2.5rem',
  width: '100%',
})

const StyledButton = styled(Button)({
  width: '100%',
  height: '56px',
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.lightPurple,
  },
})

export const SignIn: React.FC<SigninProps> = ({
  width,
  height,
  top,
  left,
  onClick,
}) => {
  const [state, setState] = useState<SignInState>({
    showPassword: false,
  })

  const [email, setEmail] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
  const [password, setPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
  const { loginWithRedirect } = useAuth0()

  const arrayCollection = [
    {
      id: 1,
      partyIcon: GOOGLE,
      onClick: () => {
        loginWithRedirect()
      },
      active: true,
    },
    {
      id: 2,
      partyIcon: FACEBOOK,
      onClick: () => {
        loginWithRedirect()
      },
      active: true,
    },
    {
      id: 3,
      partyIcon: APPLE,
      onClick: () => {
        loginWithRedirect()
      },
      active: true,
    },
  ]

  const handleClickShowPassword = () => {
    setState((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }))
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value
    setEmail(emailValue)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    setIsEmailValid(emailRegex.test(emailValue))
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value
    setPassword(passwordValue)
    setIsPasswordValid(passwordValue.length >= 8)
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleLoginClick = (email: string, password: string) => {
    if (password.length < 8) {
      setIsPasswordValid(false)
      setPasswordErrorMessage('Password must contain at least 8 characters.')
      return
    }
    if (onClick) {
      onClick(email, password)
    }
  }

  return (
    <StyledBox
      width={width}
      height={height}
      marginTop={top}
      marginLeft={left}
      data-testid="outbox"
    >
      <Box>
        <StyledTypography variant="h1">{WELCOME_BACK}</StyledTypography>
      </Box>

      <Box>
        <StyledCustomTextField
          placeholder={ENTER_YOUR_EMAIL}
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!isEmailValid}
          helperText={!isEmailValid ? 'Please enter a valid email address' : ''}
        />
      </Box>

      <Box marginTop={'-20px'}>
        <StyledCustomTextField
          placeholder={ENTER_YOUR_PASSWORD}
          label="Password"
          type={state.showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          error={!isPasswordValid}
          helperText={!isPasswordValid ? passwordErrorMessage : ''}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <StyledButtonBox data-testid="continue-button-box">
        <StyledButton onClick={() => handleLoginClick(email, password)}>
          <Typography
            variant="body2"
            color={theme.palette.structuralColor.white}
          >
            {LOG_IN}
          </Typography>
        </StyledButton>
      </StyledButtonBox>
      <FootedBox>
        <CheckTypoBox>
          <CustomCheckbox height={'1.5rem'} width={'1.5rem'} />
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
            width={'111px'}
            height={'24px'}
          >
            {REMEMBER_ME}
          </Typography>
        </CheckTypoBox>
        <Box display={'flex'} flexDirection={'row'}>
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            <span
              style={{
                textDecoration: 'underline',
                color: theme.palette.primary.primary500,
                cursor: 'pointer',
              }}
            >
              {TROUBLE_LOGGIN_IN}
            </span>
          </Typography>
        </Box>
      </FootedBox>

      <StyledTypographyBox>
        <Typography
          variant="caption"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {OR_LOG_IN}
        </Typography>
      </StyledTypographyBox>

      <StyledIconBox data-testid="iconGrid">
        <IconGrid thirdPartySignUpArray={arrayCollection} />
      </StyledIconBox>
    </StyledBox>
  )
}
