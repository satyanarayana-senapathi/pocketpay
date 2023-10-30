import React, { useState } from 'react'
import { Box, styled } from '@mui/material'
import PaymentCard from '../../molecules/PaymentCard'
import Typography from '../../atoms/Typography'
import {
  ADVANCED_TRANSFER,
  CHOOSE_YOUR_TRANSFER_TYPE,
  CREDIT_CARD,
  DEBIT_CARD,
  FAST_AND_EASY_TRANSFER,
  LOW_COST_TRANSFER,
  SWIFT_TRANSFER,
  TRANSFER_FROM_YOUR_BANK,
  paymentCardsData,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'

export interface ChooseAccountTypeProps {
  width?: string
  height?: string
  top?: string
  left?: string
  onCardSelected: (selectedCard: string) => void
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
})

const StyledCaption = styled(Typography)({
  color: theme.palette.textColor.mediumEmphasis,
})

export const ChooseAccountType: React.FC<ChooseAccountTypeProps> = ({
  width,
  height,
  top,
  left,
  onCardSelected,
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const handleCardClick = (cardContent: string) => {
    if (selectedCard === cardContent) {
      setSelectedCard(null)
      onCardSelected('')
    } else {
      setSelectedCard(cardContent)
      onCardSelected(cardContent)
    }
  }

  const debitCardsData = paymentCardsData.filter(
    (cardData) => cardData.cardContent === DEBIT_CARD
  )

  const creditCardsData = paymentCardsData.filter(
    (cardData) => cardData.cardContent === CREDIT_CARD
  )

  const transferFromYourBankCardsData = paymentCardsData.filter(
    (cardData) => cardData.cardContent === TRANSFER_FROM_YOUR_BANK
  )

  const advanceCardsData = paymentCardsData.filter(
    (cardData) => cardData.cardContent === SWIFT_TRANSFER
  )

  return (
    <StyledBox
      width={width}
      height={height}
      marginTop={top}
      marginLeft={left}
      data-testid="choose_account-type"
    >
      <Box>
        <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
          {CHOOSE_YOUR_TRANSFER_TYPE}
        </Typography>
      </Box>

      <Box marginTop={'2.5rem'} marginBottom={'1rem'}>
        <StyledCaption variant="caption">
          {FAST_AND_EASY_TRANSFER}
        </StyledCaption>
      </Box>

      {debitCardsData.map((cardData) => (
        <Box key={cardData.cardContent} marginBottom={'1rem'}>
          <PaymentCard
            {...cardData}
            isSelected={selectedCard === DEBIT_CARD}
            onClick={() => handleCardClick(DEBIT_CARD)}
          />
        </Box>
      ))}

      {creditCardsData.map((cardData) => (
        <Box key={cardData.cardContent} marginBottom={'1rem'}>
          <PaymentCard {...cardData} />
        </Box>
      ))}
      <Box marginTop={'2.5rem'} marginBottom={'1rem'}>
        <StyledCaption variant="caption">{LOW_COST_TRANSFER}</StyledCaption>
      </Box>

      {transferFromYourBankCardsData.map((cardData) => (
        <Box key={cardData.cardContent} marginBottom={'1rem'}>
          <PaymentCard
            {...cardData}
            isSelected={selectedCard === TRANSFER_FROM_YOUR_BANK}
            onClick={() => handleCardClick(TRANSFER_FROM_YOUR_BANK)}
          />
        </Box>
      ))}

      <Box marginTop={'2.5rem'} marginBottom={'1.5rem'}>
        <StyledCaption variant="caption">{ADVANCED_TRANSFER}</StyledCaption>
      </Box>

      {advanceCardsData.map((cardData) => (
        <Box key={cardData.cardContent} marginBottom={'1rem'}>
          <PaymentCard {...cardData} />
        </Box>
      ))}
    </StyledBox>
  )
}
