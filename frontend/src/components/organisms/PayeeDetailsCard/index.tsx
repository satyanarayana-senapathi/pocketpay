import { Box, List, ListItem, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import Icon from '../../atoms/icon'
import Button from '../../atoms/button'
import {
  PD_CONTENT,
  PD_HEADER,
  PD_HEADING,
  PD_MANUALLY,
  PD_PAY,
  PD_POINT_ONE,
  PD_POINT_TWO,
  PayeeDetails_Values,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import React from 'react'

interface PayeeDetailsCardProps {
  amount?: string
  onClickPay?: () => void
}

const MainBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const ContentBox = styled(Box)({
  border: `1px solid ${theme.palette.iconColor.stroke}`,
  borderRadius: '16px',
  padding: '3rem 2rem',
  marginTop: '2rem',
})

const IconStyleBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2.5rem',
})

const ButtonStyleBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '2.5rem',
})

const ContinuePayButton = styled(Button)({
  width: '218px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
  marginBottom: '1.25rem',
})

const PayManuallyButton = styled(Button)({
  width: '218px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.primary.primary500,
  backgroundColor: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.cardHover,
  },
})

const TypographyStyle = styled(Typography)({
  color: theme.palette.textColor.highEmphasis,
  marginTop: '1.5rem',
  marginBottom: '1rem',
})

const listStyle = {
  listStyleType: 'disc',
  pl: 6,
  color: theme.palette.textColor.mediumEmphasis,
}

const ListItemStyle = styled(ListItem)({
  display: 'list-item',
})

const PayeeDetailsCard = (props: PayeeDetailsCardProps) => {
  const handleStyle = (content: string) => {
    const indexOfBusiness = content.indexOf('business')
    const modifiedText = (
      <React.Fragment>
        {content.substring(0, indexOfBusiness)}
        <span
          style={{
            color: theme.palette.textColor.highEmphasis,
          }}
        >
          {content.substring(indexOfBusiness, indexOfBusiness + 8)}
        </span>
        {content.substring(indexOfBusiness + 8)}
      </React.Fragment>
    )

    return modifiedText
  }
  return (
    <MainBox>
      <Box>
        <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
          {PD_HEADER}
        </Typography>
      </Box>
      <ContentBox>
        <Box>
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {handleStyle(PD_CONTENT)}
            <span style={{ color: theme.palette.textColor.highEmphasis }}>
              {' '}
              {props.amount} GBP{' '}
            </span>
            transfer.
          </Typography>
          <TypographyStyle variant="body1">{PD_HEADING}</TypographyStyle>
          <List sx={listStyle} disablePadding>
            <ListItemStyle>
              <Typography variant="body3">{PD_POINT_ONE}</Typography>
            </ListItemStyle>
            <ListItemStyle>
              <Typography variant="body3">{PD_POINT_TWO}</Typography>
            </ListItemStyle>
          </List>
        </Box>
        <IconStyleBox>
          {PayeeDetails_Values.map((value) => (
            <Icon key={value.id} src={value.iconSrc} alt={value.iconAlt}></Icon>
          ))}
        </IconStyleBox>
        <ButtonStyleBox>
          <ContinuePayButton
            variant="contained"
            onClick={props.onClickPay}
            disableRipple
          >
            <Typography variant="body2">{PD_PAY}</Typography>
          </ContinuePayButton>
          <PayManuallyButton variant="contained" disableRipple>
            <Typography
              variant="body2"
              color={theme.palette.primary.primary500}
            >
              {PD_MANUALLY}
            </Typography>
          </PayManuallyButton>
        </ButtonStyleBox>
      </ContentBox>
    </MainBox>
  )
}

export default PayeeDetailsCard
