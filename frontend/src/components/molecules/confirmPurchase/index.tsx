import { Grid, Stack } from '@mui/material'
import React from 'react'
import Icon from '../../atoms/icon'
import theme from '../../../utils/themes/theme'
import Button from '../../atoms/button'
import styled from '@emotion/styled'
import Typography from '../../atoms/Typography'
import {
  CONFIRM_YOUR_PURCHASE,
  STEP1_IN_CONFIRM_PURCHASE,
  STEP2_IN_CONFIRM_PURCHASE,
} from '../../../utils/constants'

interface ConfirmPurchaseProps {
  amount: string
  cardDigits: number
  currenyType: string
  handleClick?: () => void
  leftIconSrc: string
  rightIconSrc: string
  leftIconAlt?: string
  rightIconAlt?: string
}

const MyTypography = styled(Typography)(() => ({
  '& .boldText': {
    color: theme.palette.textColor.highEmphasis,
  },
}))

const CustomButton = styled(Button)(() => ({
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary500,
  },
  width: '135px',
  height: '56px',
  marginTop: '25px',
  marginBottom: '1rem',
}))

const HeaderStack = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '15px 30px',
  height: '40px',
  border: `1px solid ${theme.palette.iconColor.stroke}`,
  borderRadius: '16px 16px 0 0',
}))

const CardStack = styled(Stack)(() => ({
  border: `1px solid ${theme.palette.iconColor.stroke}`,
  borderRadius: '16px',
  width: '100%',
  height: '100%',
}))

const ConfirmPurchase = ({
  amount,
  cardDigits,
  currenyType,
  handleClick,
  leftIconSrc,
  rightIconSrc,
  rightIconAlt,
  leftIconAlt,
}: ConfirmPurchaseProps) => {
  return (
    <CardStack data-testid="ConfirmPurchaseCard">
      <HeaderStack>
        <Icon src={leftIconSrc} alt={leftIconAlt} style={{ width: '40px' }} />
        <Icon src={rightIconSrc} alt={rightIconAlt} style={{ width: '24px' }} />
      </HeaderStack>
      <Grid>
        <Stack
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="0 75px"
        >
          <Typography
            color={theme.palette.textColor.highEmphasis}
            variant="body1"
            sx={{ margin: '10px 0 20px' }}
          >
            {CONFIRM_YOUR_PURCHASE}
          </Typography>
          <MyTypography
            color={theme.palette.textColor.mediumEmphasis}
            variant="caption"
          >
            <span className="boldText">{`${currenyType} ${amount} `}</span>
            to PocketPay using visa card ending
            <span className="boldText">{` ${cardDigits}`}</span>
          </MyTypography>
          <Grid height="10px" />
          <Typography
            color={theme.palette.textColor.mediumEmphasis}
            variant="caption"
          >
            {STEP1_IN_CONFIRM_PURCHASE}
          </Typography>
          <Grid height="10px" />
          <Typography
            color={theme.palette.textColor.mediumEmphasis}
            variant="caption"
          >
            {STEP2_IN_CONFIRM_PURCHASE}
          </Typography>
          <CustomButton onClick={handleClick}>
            <Typography
              variant="body2"
              color={theme.palette.structuralColor.white}
            >
              Complete
            </Typography>
          </CustomButton>
        </Stack>
      </Grid>
    </CardStack>
  )
}

export default ConfirmPurchase
