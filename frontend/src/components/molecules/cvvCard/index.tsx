import React from 'react'
import RadioButton from '../../atoms/radioButton'
import { Grid, InputAdornment, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import CustomTextField from '../../atoms/Textfield'
import Icon from '../../atoms/icon'
import {
  CREDIT_CARD_ALT,
  CVV,
  EUR_VISA_DEBIT,
  EXPIRY_DATE,
  HELPER_TEXT,
  LAST_FOUR_DIGITS,
} from '../../../utils/constants'
import CreditCardImg from '../../../../public/assets/image/creditCard.svg'

interface CvvCardProps {
  cardDigits: number
  expiryDate: string
  radioChecked?: boolean
  textValue?: string
  handleRadioClick?: () => void
  handleTextFieldChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isActive?: boolean
}

const StyledCvvTextField = styled(CustomTextField)({
  marginTop: '14px',
  borderRadius: '8px',
  '& .MuiInputBase-root': {
    borderRadius: '8px',
  },
  '& .MuiInputLabel-root': {
    background: 'white',
    paddingLeft: '8px',
    color: theme.palette.textColor.lowEmphasis,
  },
})

const CvvCard = ({
  cardDigits,
  expiryDate,
  radioChecked,
  textValue = '',
  handleRadioClick,
  handleTextFieldChange,
  isActive,
}: CvvCardProps) => {
  return (
    <Grid display="flex" flexDirection="row" data-testid="cvv-card">
      <RadioButton checked={radioChecked} onClick={handleRadioClick} />
      <Stack sx={{ marginLeft: '30px' }}>
        <Typography
          variant="body2"
          color={theme.palette.textColor.highEmphasis}
          data-testid="heading"
        >
          {EUR_VISA_DEBIT}
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.textColor.mediumEmphasis}
        >
          {`${LAST_FOUR_DIGITS} `}
          <span style={{ color: theme.palette.textColor.highEmphasis }}>
            {cardDigits}
          </span>{' '}
          {`${EXPIRY_DATE} `}
          <span style={{ color: theme.palette.textColor.highEmphasis }}>
            {expiryDate}
          </span>
        </Typography>
        <StyledCvvTextField
          data-testid="cvv-card-textfield"
          value={textValue}
          label={CVV}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Icon src={CreditCardImg} alt={CREDIT_CARD_ALT} />
              </InputAdornment>
            ),
          }}
          disabled={!radioChecked && isActive}
          onChange={handleTextFieldChange}
          error={textValue.length !== 0 && textValue.length !== 3}
          helperText={
            textValue.length === 0 || textValue.length === 3 ? '' : HELPER_TEXT
          }
        ></StyledCvvTextField>
      </Stack>
    </Grid>
  )
}

export default CvvCard
