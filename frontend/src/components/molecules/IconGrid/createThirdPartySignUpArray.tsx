import GOOGLE from '../../../../public/assets/image/google.svg'
import APPLE from '../../../../public/assets/image/apple.svg'
import FACEBOOK from '../../../../public/assets/image/facebook.svg'

export const createThirdPartySignUpArray = (
  handleGooglePartyClick: () => void,
  handleFacebookPartyClick?: () => void,
  handleApplePartyClick?: () => void
) => [
  {
    id: 1,
    partyIcon: GOOGLE,
    onClick: handleGooglePartyClick,
    active: true,
  },
  {
    id: 2,
    partyIcon: FACEBOOK,
    onClick: handleFacebookPartyClick,
    active: false,
  },
  {
    id: 3,
    partyIcon: APPLE,
    onClick: handleApplePartyClick,
    active: false,
  },
]
