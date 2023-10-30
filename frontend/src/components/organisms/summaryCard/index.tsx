import { Box, Grid, Stack, styled } from '@mui/material'
import React from 'react'
import { CANCEL_THIS_TRANSFER, CONTINUE_TO_PAY } from '../../../utils/constants'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import Icon from '../../atoms/icon'
import Button from '../../atoms/button'
import LeftArrowIcon from '../../../../public/assets/image/leftArrow.svg'
import { useSendMoneyData } from '../../../Context/SendMoneyContext'

const StyledButton = styled(Button)`
  height: 56px;
  width: 218px;
  @media (min-width: 600px) and (max-width: 800px) {
    width: 70%;
    display: flex;
    mx: auto;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`
const StyledBox = styled(Box)`
  padding: 30px;
  border-radius: 16px;
  box-sizing: border-box;
`
const StyledButtonStack = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
`
const StyledStack = styled(Stack)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 0 20px;
`
const StyledTypographyStack = styled(Stack)`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  gap: 20px;
`
const StyledGrid = styled(Grid)`
  margin: 30px 0 20px;
`
interface SummarCardProps {
  hasButtons?: boolean
  sx?: React.CSSProperties
  handleContinuePayment?: () => void
}

const SummaryCard = ({
  hasButtons = true,
  sx,
  handleContinuePayment,
}: SummarCardProps) => {
  const { sendMoneyData } = useSendMoneyData()
  const current_from_type = sendMoneyData.from_currency
  const current_to_type = sendMoneyData.to_currency

  const SUMMARY_CARD_VALUES = [
    {
      heading: 'Transfer details',
      options: [
        {
          id: 1,
          option: 'Fee:',
          value: `${sendMoneyData.transfer_fee} ${current_from_type}`,
        },
        {
          id: 2,
          option: 'Amount we’ll convert:',
          value: `${sendMoneyData.amount_sent} ${current_from_type}`,
        },
        {
          id: 3,
          option: 'Guaranteed rate:',
          value: `${'1'} ${current_from_type} ${'='} ${
            sendMoneyData.transfer_rate
          } ${current_to_type}`,
        },
      ],
    },
    {
      heading: 'Recipient details',
      options: [
        {
          id: 1,
          option: 'Name:',
          value: `${sendMoneyData.receiptant_first_name} ${sendMoneyData.receiptant_last_name}`,
        },
        { id: 2, option: 'Email:', value: sendMoneyData.receiptant_email },
        {
          id: 3,
          option: 'Account number:',
          value: sendMoneyData.receiptant_account_number,
        },
        {
          id: 4,
          option: 'Account type:',
          value: sendMoneyData.receiptant_account_type,
        },
      ],
    },
  ]

  const handleCancel = () => {
    console.log('navigate to previous page')
  }

  const handleContinue = () => {
    handleContinuePayment?.()
  }

  const renderOptionStacks = (
    options: { id: number; option: string; value: string }[]
  ) => {
    return options.map(
      (data: { id: number; option: string; value: string }) => (
        <StyledStack key={data.id}>
          <Typography
            variant="body2"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {data.option}
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.textColor.highEmphasis}
          >
            {data.value}
          </Typography>
        </StyledStack>
      )
    )
  }

  const renderButtons = () => {
    if (!hasButtons) return null
    return (
      <StyledButtonStack>
        <StyledButton
          sx={{
            ':hover': {
              backgroundColor: theme.palette.primary.primary300,
            },
          }}
          onClick={handleContinue}
        >
          <Typography variant="body2">{CONTINUE_TO_PAY}</Typography>
        </StyledButton>

        <StyledButton
          sx={{
            color: theme.palette.primary.primary500,
            backgroundColor: theme.palette.primary.contrastText,
            ':hover': {
              backgroundColor: theme.palette.structuralColor.buttonHover,
            },
          }}
          onClick={handleCancel}
        >
          <Typography variant="body2">{CANCEL_THIS_TRANSFER}</Typography>
        </StyledButton>
      </StyledButtonStack>
    )
  }

  return (
    <div>
      <StyledBox border={`1px solid ${theme.palette.iconColor.stroke}`} sx={sx}>
        <StyledStack>
          <Typography
            variant="caption"
            color={theme.palette.textColor.lowEmphasis}
          >
            {SUMMARY_CARD_VALUES[0].heading}
          </Typography>
        </StyledStack>
        <StyledTypographyStack>
          <Typography
            variant="body2"
            color={theme.palette.textColor.highEmphasis}
          >
            {sendMoneyData.amount_sent
              ? `${sendMoneyData.amount_sent.toFixed(2)} ${current_from_type}`
              : ''}
          </Typography>
          <Icon
            src={LeftArrowIcon}
            alt="Left arrow icon"
            style={{ height: '24px' }}
          />
          <Typography
            variant="body2"
            color={theme.palette.textColor.highEmphasis}
          >
            {sendMoneyData.amount_received
              ? `${sendMoneyData.amount_received.toFixed(2)} ${current_to_type}`
              : ''}
          </Typography>
        </StyledTypographyStack>
        {renderOptionStacks(SUMMARY_CARD_VALUES[0].options)}
        <StyledGrid>
          <Typography
            variant="caption"
            color={theme.palette.textColor.lowEmphasis}
          >
            {SUMMARY_CARD_VALUES[1].heading}
          </Typography>
        </StyledGrid>
        {renderOptionStacks(SUMMARY_CARD_VALUES[1].options)}
        {renderButtons()}
      </StyledBox>
    </div>
  )
}

export default SummaryCard
