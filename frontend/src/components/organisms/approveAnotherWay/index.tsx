import React from 'react'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import { Stack, styled } from '@mui/system'
import IconTypograpy from '../../molecules/IconWithTypography'
import {
  APPROVE_ANOTHER_WAY,
  RESEND_CODE_BY_SMS,
  SEND_CODE_BY_VOICE,
  USE_DIFFERENT_PHONE_NUMBER,
  WE_SENT_IT_TO,
} from '../../../utils/constants'
import { Box } from '@mui/material'

interface ApproveAnotherWayProps {
  width?: string
  height?: string
  onClick?: () => void
}

const StyledStack = styled(Stack)`
  margin: 10px 0 30px;
`

const ApproveAnotherWay = ({
  width,
  height,
  onClick,
}: ApproveAnotherWayProps) => {
  const phoneNo = '+44020 7947 6330'

  return (
    <Box width={width} height={height}>
      <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
        {APPROVE_ANOTHER_WAY}
      </Typography>
      <StyledStack>
        <Typography
          variant="body3"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {WE_SENT_IT_TO} {phoneNo}
        </Typography>
      </StyledStack>
      <IconTypograpy
        content={RESEND_CODE_BY_SMS}
        sx={{ marginBottom: '20px' }}
      ></IconTypograpy>
      <IconTypograpy
        content={SEND_CODE_BY_VOICE}
        sx={{ marginBottom: '20px' }}
      ></IconTypograpy>
      <Typography
        variant="underlineText"
        color={theme.palette.primary.primary500}
        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={onClick}
        data-testid="another-phoneNumber"
      >
        {USE_DIFFERENT_PHONE_NUMBER}
      </Typography>
    </Box>
  )
}

export default ApproveAnotherWay
