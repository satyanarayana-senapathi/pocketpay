import React from 'react'
import { Stack, Box, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import Icon from '../../atoms/icon'
import Button from '../../atoms/button'

interface BankCardProps {
  name: string
  account_no: number
  code: string
  address: string
  amount: string
  reference_no: string
  width?: string
  handleContinue?: () => void
  handleCancel?: () => void
  item: BankCardItem[]
}

interface BankCardItem {
  id: number
  BC_header: string
  BC_heading: string
  BC_subheading: string
  BC_name: string
  BC_account_number: string
  BC_amount: string
  BC_code: string
  BC_refernce_number: string
  BC_address: string
  BC_continue: string
  BC_footer: string
  BC_cancel: string
  BC_iconSrc: string
  BC_iconAlt: string
}

const StyledBox = styled(Box)({
  padding: '10px 30px',
  border: `1px solid ${theme.palette.iconColor.stroke}`,
  borderRadius: '16px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '32px',
})

const ItemBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  margin: '20px 0px',
})

const InnerStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const ContinueButton = styled(Button)({
  width: '218px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
  margin: '20px 0px 10px 0px',
})

const CancelButton = styled(Button)({
  width: '218px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.primary.primary500,
  backgroundColor: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.cardHover,
  },
  margin: '10px 0px 20px 0px',
})

const DetailTypography = styled(Typography)({
  color: theme.palette.textColor.lowEmphasis,
})

const StyleStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px 0px',
})
const TypoStyle = {
  marginTop: '8px',
}

const BankCard = ({
  name,
  account_no,
  code,
  address,
  amount,
  reference_no,
  width,
  handleContinue,
  handleCancel,
  item,
}: BankCardProps) => {
  const lines = address
    .split('\n')
    .map((line, index) => <div key={`line-${index}`}>{line}</div>)

  const handleStyle = (footer: string) => {
    const indexOfOnlineBanking = footer.indexOf('online')

    const modifiedText = (
      <React.Fragment>
        {footer.substring(0, indexOfOnlineBanking)}
        <span
          style={{
            color: theme.palette.primary.primary300,
            borderBottom: `1px solid ${theme.palette.primary.primary300}`,
          }}
        >
          {footer.substring(indexOfOnlineBanking, indexOfOnlineBanking + 14)}
        </span>
        {footer.substring(indexOfOnlineBanking + 14)}
      </React.Fragment>
    )

    return modifiedText
  }

  return (
    <Stack direction="column" display="flex">
      {item.map((value) => (
        <Box key={value.id}>
          <Box>
            <Typography
              variant="h1"
              color={theme.palette.textColor.highEmphasis}
            >
              {`${value.BC_header} `}
            </Typography>
          </Box>
          <StyledBox>
            <StyleStack>
              <Icon
                src={value.BC_iconSrc}
                alt={value.BC_iconAlt}
                style={{ width: '40px', height: '40px' }}
              ></Icon>
            </StyleStack>
            <Box>
              <Typography
                variant="body1"
                color={theme.palette.textColor.highEmphasis}
                sx={{ margin: '10px 0px' }}
              >
                {`${value.BC_heading} `}
              </Typography>
              <Typography
                variant="caption"
                color={theme.palette.textColor.mediumEmphasis}
              >
                {`${value.BC_subheading} `}
              </Typography>
            </Box>
            <InnerStack>
              {[
                { label: value.BC_name, value: name },
                { label: value.BC_refernce_number, value: reference_no },
              ].map((itemData) => (
                <ItemBox key={itemData.label} sx={{ width: width }}>
                  <DetailTypography variant="caption">
                    {`${itemData.label} `}
                  </DetailTypography>
                  <Typography variant="body2" style={TypoStyle}>
                    {itemData.value}
                  </Typography>
                </ItemBox>
              ))}
            </InnerStack>
            <InnerStack>
              {[
                { label: value.BC_amount, value: amount },
                { label: value.BC_code, value: code },
              ].map((itemData) => (
                <ItemBox key={itemData.label} sx={{ width: width }}>
                  <DetailTypography variant="caption">
                    {`${itemData.label} `}
                  </DetailTypography>
                  <Typography variant="body2" style={TypoStyle}>
                    {itemData.value}
                  </Typography>
                </ItemBox>
              ))}
            </InnerStack>
            <Stack
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
            >
              {[
                { label: value.BC_account_number, value: account_no },
                { label: value.BC_address, value: lines },
              ].map((itemData) => (
                <ItemBox key={itemData.label} sx={{ width: width }}>
                  <DetailTypography variant="caption">
                    {`${itemData.label} `}
                  </DetailTypography>
                  <Typography variant="body2" style={TypoStyle}>
                    {itemData.value}
                  </Typography>
                </ItemBox>
              ))}
            </Stack>
            <Typography
              variant="body3"
              color={theme.palette.textColor.mediumEmphasis}
            >
              {handleStyle(value.BC_footer)}
            </Typography>
            <StyleStack>
              <ContinueButton
                variant="contained"
                onClick={handleContinue}
                disableRipple
              >
                <Typography variant="body2">{`${value.BC_continue} `}</Typography>
              </ContinueButton>

              <CancelButton
                variant="contained"
                onClick={handleCancel}
                disableRipple
              >
                <Typography variant="body2">{`${value.BC_cancel} `}</Typography>
              </CancelButton>
            </StyleStack>
          </StyledBox>
        </Box>
      ))}
    </Stack>
  )
}

export default BankCard
