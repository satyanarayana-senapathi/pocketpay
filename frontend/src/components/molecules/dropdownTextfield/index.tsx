import { ChangeEvent, CSSProperties, useState } from 'react'
import { Box, Grid, Paper, Stack, styled } from '@mui/material'
import Icon from '../../atoms/icon'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import chevronDown from '../../../../public/assets/image/chevron-down.svg'
import CustomTextField from '../../atoms/Textfield'
import { CurrencyType, currencies } from '../../../utils/constants'

const ParentBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  position: 'relative',
}))

const currencyOptionStyle: CSSProperties = {
  height: '12.8rem',
  overflowY: 'scroll',
  borderRadius: '0.5rem',
}

const StyledTextField = styled(CustomTextField)({
  '& label.Mui-focused': {
    color: theme.palette.textColor.lowEmphasis,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
  },
})
const CurrencyContainer = styled(Stack)({
  border: 'none',
  cursor: 'pointer',
})

const CurrencyListGrid = styled(Grid)({
  padding: '0.8rem 0rem 0.3rem 0.8rem',
  border: `1px solid ${theme.palette.iconColor.stroke}`,
  borderRadius: '0.5rem',
  position: 'absolute',
  zIndex: 2,
  backgroundColor: theme.palette.structuralColor.white,
  boxShadow: theme.shadows[4],
})

const selectCurrencyOptionStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '1rem',
  height: '3.5rem',
  '&:hover': {
    background: theme.palette.structuralColor.cardHover,
  },
}

const StyledHeader = styled(Paper)({
  all: 'unset',
  position: 'sticky',
  marginBottom: '1.5rem',
})

const MenuItemWithCursor = styled(Stack)<{ active: boolean }>(({ active }) => ({
  cursor: active ? 'pointer' : 'auto',
}))

export interface AmountTextFieldProps {
  label: string
  amount: string
  selectedCurrency: CurrencyType
  width?: string
  onAmountChange: (amount: string) => void
  onCurrencyChange: (currency: CurrencyType) => void
}

const AmountTextField = ({
  label,
  amount,
  selectedCurrency,
  width,
  onAmountChange,
  onCurrencyChange,
}: AmountTextFieldProps) => {
  const [isCurrencyInputVisible, setIsCurrencyInputVisible] =
    useState<boolean>(false)

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = event.target.value
    const numbersOnly = inputNumber.replace(/\D/g, '')
    onAmountChange(numbersOnly)
  }

  const handleCurrencyClick = () => {
    setIsCurrencyInputVisible(!isCurrencyInputVisible)
  }

  const handleMenuItemClick = (currency: CurrencyType) => {
    if (currency.active) {
      onCurrencyChange(currency)
      setIsCurrencyInputVisible(false)
    }
  }

  return (
    <ParentBox>
      {!isCurrencyInputVisible && (
        <StyledTextField
          sx={{ width: width }}
          data-testid="amount-textfield"
          label={label}
          value={amount}
          onChange={handleAmountChange}
          InputProps={{
            inputMode: 'numeric',
            endAdornment: (
              <Box
                data-testid="selected-currency"
                onClick={handleCurrencyClick}
              >
                <CurrencyContainer direction="row" spacing={0.4}>
                  <Icon
                    src={selectedCurrency?.icon}
                    alt="loading"
                    style={{ paddingRight: '10px' }}
                  />
                  <Typography
                    variant="body2"
                    color={theme.palette.textColor.mediumEmphasis}
                  >
                    {selectedCurrency?.code}
                  </Typography>
                  <Icon src={chevronDown} alt="loading" />
                </CurrencyContainer>
              </Box>
            ),
          }}
        />
      )}
      {isCurrencyInputVisible && (
        <CurrencyListGrid
          container
          flexDirection="column"
          sx={{ width: width }}
        >
          <StyledHeader>
            <Typography
              variant="body2"
              color={theme.palette.textColor.mediumEmphasis}
            >
              Select Currency
            </Typography>
          </StyledHeader>
          <Box style={currencyOptionStyle}>
            {currencies.map((currency) => (
              <MenuItemWithCursor
                data-testid="currency-item-list"
                key={currency.code}
                active={currency.active}
                onClick={() => handleMenuItemClick(currency)}
              >
                <Box>
                  <Stack sx={selectCurrencyOptionStyle}>
                    <Stack direction="row" spacing={1}>
                      <Icon src={currency.icon} alt="loading" />
                      <Typography
                        variant="body2"
                        color={theme.palette.textColor.highEmphasis}
                      >
                        {currency.label}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      color={theme.palette.textColor.mediumEmphasis}
                    >
                      {currency.code}
                    </Typography>
                  </Stack>
                </Box>
              </MenuItemWithCursor>
            ))}
          </Box>
        </CurrencyListGrid>
      )}
    </ParentBox>
  )
}

export default AmountTextField
