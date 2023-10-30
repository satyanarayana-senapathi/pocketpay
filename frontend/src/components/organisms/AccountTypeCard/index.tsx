import Typography from '../../atoms/Typography'
import { Box, styled } from '@mui/material'
import USER from '../../../../public/assets/image/user.svg'
import BUSINESS from '../../../../public/assets/image/business.svg'
import {
  BUSINESS_ACCOUNT,
  DO_BUSINESS,
  PERSONAL_ACCOUNT,
  SEND_SPEND,
  WHAT_KIND_OF,
  YOU_CAN_ADD,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import Icon from '../../atoms/icon'

export interface AccountTypeCardProps {
  width?: string
  height?: string
  top?: string
  left?: string
  onclick?: () => void
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const StyledCardContainer = styled(Box)({
  width: '516px',
  height: '100%',
  borderRadius: '8px',
  border: '1px solid',
  color: theme.palette.iconColor.stroke,
  display: 'flex',
  flexDirection: 'row',
  marginTop: '2rem',
  cursor: 'pointer',
})

const StyledIconBox = styled(Box)({
  width: '2.125rem',
  height: '2.125rem',
  marginLeft: '1.25rem',
  marginTop: '0.81rem',
  marginRight: '0.88rem',
})

const StyledContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1.12rem',
  gap: '0.56rem',
})

export const AccountTypeCard: React.FC<AccountTypeCardProps> = ({
  width,
  height,
  top,
  left,
  onclick,
}) => {
  return (
    <StyledBox
      width={width}
      height={height}
      marginTop={top}
      marginLeft={left}
      data-testid="outer-box"
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'start'}
        justifyContent={'center'}
      >
        <Typography variant="h1">{WHAT_KIND_OF}</Typography>
        <Typography
          variant="body3"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {YOU_CAN_ADD}
        </Typography>
      </Box>

      <StyledCardContainer data-testid="card-container">
        <StyledIconBox>
          <Icon src={USER} alt="user" />
        </StyledIconBox>
        <StyledContentBox>
          <Typography
            variant="body2"
            color={theme.palette.textColor.highEmphasis}
          >
            {PERSONAL_ACCOUNT}
          </Typography>
          <Box marginBottom={'1rem'}>
            <Typography
              variant="caption"
              color={theme.palette.textColor.lowEmphasis}
            >
              {SEND_SPEND}
            </Typography>
          </Box>
        </StyledContentBox>
      </StyledCardContainer>

      <StyledCardContainer onClick={onclick}>
        <StyledIconBox>
          <Icon src={BUSINESS} alt="business" />
        </StyledIconBox>
        <StyledContentBox>
          <Typography
            variant="body2"
            color={theme.palette.textColor.highEmphasis}
          >
            {BUSINESS_ACCOUNT}
          </Typography>
          <Box marginBottom={'1rem'}>
            <Typography
              variant="caption"
              color={theme.palette.textColor.lowEmphasis}
            >
              {DO_BUSINESS}
            </Typography>
          </Box>
        </StyledContentBox>
      </StyledCardContainer>
    </StyledBox>
  )
}
