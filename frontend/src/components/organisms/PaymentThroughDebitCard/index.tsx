import Typography from '../../atoms/Typography'
import { Box, styled } from '@mui/material'
import CvvCard from '../../molecules/cvvCard'
import { NEW_CARD, SAVED_CARD } from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import { useState } from 'react'
import { useSendMoneyData } from '../../../Context/SendMoneyContext'

export interface PaymentThroughDebitCardProps {
  width?: string
  height?: string
  top?: string
  left?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledTypography = styled(Typography)({
  position: 'relative',
  '&::after': {
    content: "''",
    position: 'absolute',
    bottom: '-4px',
    left: 0,
    width: '100%',
    height: '2px',
    background: theme.palette.primary.primary500,
  },
})

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
})

const HeaderBox = styled(Box)({
  height: '3.5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  borderBottom: '1.3px groove',
  color: theme.palette.structuralColor.stroke,
  alignItems: 'center',
})

const Header = () => (
  <HeaderBox>
    <StyledTypography variant="body3" color={theme.palette.primary.primary500}>
      {SAVED_CARD}
    </StyledTypography>

    <Typography variant="body3" color={theme.palette.textColor.mediumEmphasis}>
      {NEW_CARD}
    </Typography>
  </HeaderBox>
)

const CardItem = ({
  cardDigits,
  expiryDate,
  selectedCardDigits,
  handleCardSelect,
  handleTextDataChange,
  cvvValue,
  isAcive,
}: {
  cardDigits: number
  expiryDate: string
  selectedCardDigits: number | null
  handleCardSelect: (cardDigits: number) => void
  handleTextDataChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  cvvValue?: string
  isAcive?: boolean
}) => (
  <Box marginTop={'30px'}>
    <CvvCard
      textValue={cvvValue}
      cardDigits={cardDigits}
      expiryDate={expiryDate}
      radioChecked={selectedCardDigits === cardDigits}
      handleRadioClick={() => handleCardSelect(cardDigits)}
      handleTextFieldChange={handleTextDataChange}
      isActive={isAcive}
    />
  </Box>
)

const cardItems = [
  { cardDigits: 4546, expiryDate: '09/25' },
  { cardDigits: 9313, expiryDate: '06/25' },
]

const PaymentThroughDebitCard: React.FC<PaymentThroughDebitCardProps> = ({
  width,
  height,
  top,
  left,
  onChange,
}) => {
  const { updateSendMoneyData } = useSendMoneyData()
  const [selectedCardDigits, setSelectedCardDigits] = useState<number | null>(
    null
  )
  const [cvv, setCvv] = useState<string>('')

  const handleCardSelect = (cardDigits: number) => {
    updateSendMoneyData({ cardDigits })
    setSelectedCardDigits((prevSelectedCard) =>
      prevSelectedCard === cardDigits ? null : cardDigits
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9\b]+$/
    const value = event.target.value
    if ((regex.test(value) && value.length < 4) || value === '') {
      setCvv(value)
      onChange(event)
    }
  }

  return (
    <StyledBox
      width={width}
      height={height}
      marginTop={top}
      marginLeft={left}
      data-testid="outer-box"
    >
      <Header />
      <CardItem
        cardDigits={cardItems[0].cardDigits}
        expiryDate={cardItems[0].expiryDate}
        selectedCardDigits={selectedCardDigits}
        handleCardSelect={handleCardSelect}
        handleTextDataChange={handleChange}
        cvvValue={cvv}
        isAcive={false}
      />
      <CardItem
        cardDigits={cardItems[1].cardDigits}
        expiryDate={cardItems[1].expiryDate}
        selectedCardDigits={selectedCardDigits}
        handleCardSelect={handleCardSelect}
        isAcive={true}
      />
    </StyledBox>
  )
}

export default PaymentThroughDebitCard
