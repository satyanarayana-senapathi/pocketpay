import Typography from '../../atoms/Typography'
import CustomTextField from '../../atoms/Textfield'
import Button from '../../atoms/button'
import { Box, Divider, styled } from '@mui/material'
import theme from '../../../utils/themes/theme'
import IconGrid from '../../molecules/IconGrid'
import GOOGLE from '../../../../public/assets/image/google.svg'
import FACEBOOK from '../../../../public/assets/image/facebook.svg'
import APPLE from '../../../../public/assets/image/apple.svg'
import {
  CREATE_YOUR_POCKET,
  SIGN_UP,
  OR_LOG_IN,
  BY_REGISTERING,
  TERM_OF_USE,
  PRIVACY_POLICY,
  ALREADY_HAVE,
  LOG_IN,
  AND,
  ENTER_YOUR_EMAIL,
} from '../../../utils/constants'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export interface SignupProps {
  width?: string
  height?: string
  top?: string
  left?: string
  onClick?: (email: string) => void
  onLoginClick?: () => void
}

const CustomTypography = styled(Typography)({
  color: theme.palette.textColor.highEmphasis,
})

const StyledTextField = styled(CustomTextField)({
  width: '100%',
  marginTop: '2rem',
})

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const TypographyBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '3rem',
})

const IconBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '3rem',
})

const ButtonBox = styled(Box)({
  display: 'flex',
  marginTop: '3rem',
  width: '100%',
})

const CustomButton = styled(Button)({
  width: '100%',
  height: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:disabled': {
    backgroundColor: theme.palette.primary.primary100,
    color: theme.palette.textColor.contrastText,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
})

const CustomUnderlinedText = styled('span')({
  textDecoration: 'underline',
  color: theme.palette.primary.primary500,
  cursor: 'pointer',
})

const dividerStyle = {
  width: '100%',
  margin: '2.5rem 0rem',
}

export const SignUp: React.FC<SignupProps> = ({
  width,
  height,
  top,
  left,
  onClick,
  onLoginClick,
}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value
    setEmail(emailValue)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    setIsEmailValid(emailRegex.test(emailValue))
  }

  const isSignupButtonClickable = email && isEmailValid

  const handleLoginClick = (email: string) => {
    if (onClick) {
      onClick(email)
      navigate('/account-setup')
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
        <Box>
          <CustomTypography variant="h1">{CREATE_YOUR_POCKET}</CustomTypography>
        </Box>

        <Box>
          <StyledTextField
            placeholder={ENTER_YOUR_EMAIL}
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={!isEmailValid}
            helperText={
              !isEmailValid ? 'Please enter a valid email address' : ''
            }
          />
        </Box>

        <ButtonBox data-testid="continue-button-box">
          <CustomButton
            onClick={() => handleLoginClick(email)}
            disabled={!isSignupButtonClickable}
          >
            <Typography
              variant="body2"
              color={theme.palette.structuralColor.white}
            >
              {SIGN_UP}
            </Typography>
          </CustomButton>
        </ButtonBox>

        <TypographyBox>
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {OR_LOG_IN}
          </Typography>
        </TypographyBox>
      </Box>
      <IconBox data-testid="iconGrid">
        <IconGrid thirdPartySignUpArray={arrayCollection} />
        <TypographyBox>
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {BY_REGISTERING}
            <CustomUnderlinedText>{TERM_OF_USE}</CustomUnderlinedText>
            {AND}
            <CustomUnderlinedText>{PRIVACY_POLICY}</CustomUnderlinedText>
          </Typography>
        </TypographyBox>
        <Divider sx={dividerStyle} />
        <Typography
          variant="caption"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {ALREADY_HAVE}
          <CustomUnderlinedText data-testid={'log-in'} onClick={onLoginClick}>
            {LOG_IN}
          </CustomUnderlinedText>
        </Typography>
      </IconBox>
    </StyledBox>
  )
}
