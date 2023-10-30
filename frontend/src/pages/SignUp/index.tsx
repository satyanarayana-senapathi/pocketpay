import StyledTemplate from '../../components/templates/StyledTemplate'
import { SignUp } from '../../components/organisms/Signup'
import Icon from '../../components/atoms/icon'
import pocketPay from '../../../public/assets/image/pocketPayLogo.svg'
import { Box } from '@mui/material'
import './SignUpPage.css'
import { useData } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const HeaderLogo = () => {
  return (
    <Box className="LogoIconStyleBox">
      <Icon src={pocketPay} alt="pocket-pay"></Icon>
    </Box>
  )
}
const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const { updateData } = useData()

  const handleSignupButton = (email: string) => {
    updateData({ email })
  }
  return (
    <StyledTemplate
      frontHeader={<HeaderLogo />}
      mainBody={
        <Box className="signupContainer">
          <SignUp
            onClick={handleSignupButton}
            onLoginClick={() => navigate('/login')}
          />
        </Box>
      }
    />
  )
}

export default SignUpPage
