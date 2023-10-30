import React, { useState } from 'react'
import Typography from '../../atoms/Typography'
import {
  AMOUNT,
  BUSINESS_DETAILS,
  CANCEL,
  CHANGE,
  CONFIRM_AND_CONTINUE,
  EDIT,
  RECEIPIENT_DETAILS,
  REVIEW_CONFIRM_CHECK,
  REVIEW_DETAILS_FEE,
  REVIEW_DETAILS_OF_TRANSFER,
  SAVE,
  SCHEDULE_DETAILS,
  SCHEDULE_DETAILS_VALUES,
  TRANSFER_DETAILS,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import { Box, Grid, Stack } from '@mui/material'
import Icon from '../../atoms/icon'
import LeftArrowIcon from '../../../../public/assets/image/leftArrow.svg'
import Button from '../../atoms/button'
import styled from '@emotion/styled'
import CustomTextField from '../../atoms/Textfield'
import { useSendMoneyData } from '../../../Context/SendMoneyContext'

const StyledBox = styled(Box)`
  width: 516px;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`
const StyledStack = styled(Stack)`
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  @media (min-width: 80px) {
    flex-direction: row;
  }
  margin: 30px 0 10px;
  justify-content: space-between;
  align-items: center;
`
const StyledFooterStack = styled(Stack)`
  margin: auto;
  display: flex;
  width: 50%;
  margin-top: 50px;
  @media (max-width: 800px) {
    width: 100%;
  }
  justify-content: center;
  align-items: center;
`
const StyledTypographyWithUnderline = styled(Typography)`
  color: ${theme.palette.primary.primary500};
  text-decoration: underline;
  cursor: pointer;
`
const StyledTextField = styled(CustomTextField)`
  fullWidth;
  height: 60px;
  @media (max-width: 800px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  margin: 20px 0 0;
`
const StyledButton = styled(Button)`
  height: 56px;
  @media screen and (min-width: 800px) {
    width: 135px;
  }

  @media screen and (max-width: 800px) {
    margin: 0 0 20px;
    width: 100%;
  }
`
const StyledButtonGrid = styled(Grid)`
  width: 610px;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: auto;
    margin: 40px;
  }
  margin: 40px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  box-sizing: border-box;
  gap: 20px;
`
const StyledConfirmButton = styled(Button)`
  height: 50px;
  margin: 30px 0 50px 0;
  &:hover {
    background-color: ${theme.palette.primary.primary300};
  }
`
const StyledCancelButton = styled(StyledButton)`
  color: ${theme.palette.primary.primary500};
  background-color: ${theme.palette.primary.contrastText};
  &:hover {
    background-color: ${theme.palette.structuralColor.buttonHover};
  }
`
const StyledSaveButton = styled(StyledButton)`
  &:hover {
    background-color: ${theme.palette.primary.primary300};
  }
`

interface ReviewTransferDetailsProps {
  handleConfirmClick?: () => void
}

const ReviewTransferDetails = ({
  handleConfirmClick,
}: ReviewTransferDetailsProps) => {
  const { sendMoneyData } = useSendMoneyData()
  const current_from_type = sendMoneyData.from_currency
  const current_to_type = sendMoneyData.to_currency
  const [edit, setEdit] = useState<boolean>(false)
  const [change, setChange] = useState<boolean>(false)
  const [amount, setAmount] = useState<string>(sendMoneyData.amount_sent)
  const [fee, setFee] = useState<string>(REVIEW_DETAILS_FEE)
  // const [conversionAmount, setConversionAmount] = useState<string>(
  //   sendMoneyData.amount_sent.toFixed(2)
  // )
  const [conversionAmount, setConversionAmount] = useState<string>(
    sendMoneyData.amount_sent ? sendMoneyData.amount_sent.toFixed(2) : ''
  )
  const [rate, setRate] = useState<string>(
    `${'1'} ${current_from_type} ${'='} ${
      sendMoneyData.transfer_rate
    } ${current_to_type}`
  )
  const [name, setName] = useState<string>(
    `${sendMoneyData.receiptant_first_name}${' '}${
      sendMoneyData.receiptant_last_name
    }`
  )
  const [email, setEmail] = useState<string>(sendMoneyData.receiptant_email)
  const [accountNumber, setAccountNumber] = useState<string>(
    sendMoneyData.receiptant_account_number
  )
  const [accountType, setAccountType] = useState<string>(
    sendMoneyData.receiptant_account_type
  )

  const TRANSFER_DETAILS_VALUES = [
    {
      id: 1,
      option: 'Fee:',
      value: `${sendMoneyData.transfer_fee} ${current_from_type}`,
    },
    {
      id: 2,
      option: 'Amount we’ll convert:',
      value: `${conversionAmount} ${current_from_type}`,
    },
    {
      id: 3,
      option: 'Guranteed rate:',
      value: rate,
    },
  ]
  const RECEIPIENT_DETAILS_VALUES = [
    { id: 1, option: 'Name:', value: name },
    { id: 2, option: 'Email:', value: email },
    { id: 3, option: 'Account number:', value: accountNumber },
    { id: 4, option: 'Account type:', value: accountType },
  ]

  const handleConfirm = () => {
    handleConfirmClick?.()
  }

  const handleEditOption = () => {
    setEdit((currentState) => !currentState)
  }

  const handleChangeOption = () => {
    setChange((currentState) => !currentState)
  }

  const renderOptionStacks = (
    options: { id: number; option: string; value: string }[]
  ) => {
    return options.map(
      (item: { id: number; option: string; value: string }) => {
        return (
          <Stack
            display="flex"
            flexDirection="row"
            margin="10px 0"
            key={item.id}
            justifyContent="space-between"
          >
            <Typography
              variant="body2"
              color={theme.palette.textColor.mediumEmphasis}
            >
              {item.option}
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.textColor.highEmphasis}
            >
              {item.value}
            </Typography>
          </Stack>
        )
      }
    )
  }

  const renderHeadingStacks = (
    leftHeading: string,
    rightHeading: string,
    handleClick: () => void
  ) => {
    return (
      <StyledStack>
        <Typography
          variant="caption"
          color={theme.palette.textColor.lowEmphasis}
        >
          {leftHeading}
        </Typography>
        <StyledTypographyWithUnderline
          variant="underlineText"
          onClick={handleClick}
        >
          {rightHeading}
        </StyledTypographyWithUnderline>
      </StyledStack>
    )
  }

  const renderButtons = () => {
    return (
      <StyledButtonGrid>
        <StyledCancelButton>
          <Typography variant="body2">{CANCEL}</Typography>
        </StyledCancelButton>
        <StyledSaveButton
          onClick={edit ? handleEditOption : handleChangeOption}
        >
          <Typography variant="body2">{SAVE}</Typography>
        </StyledSaveButton>
      </StyledButtonGrid>
    )
  }

  const renderEditOptionStack = () => {
    return (
      <Stack>
        <Typography
          variant="caption"
          color={theme.palette.textColor.lowEmphasis}
        >
          {TRANSFER_DETAILS}
        </Typography>
        <StyledTextField
          label={AMOUNT}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(event.target.value)
          }
          value={amount}
        />
        <StyledTextField
          label={TRANSFER_DETAILS_VALUES[0].option}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFee(event.target.value)
          }
          value={fee}
          disabled
        />
        <StyledTextField
          label={TRANSFER_DETAILS_VALUES[1].option}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setConversionAmount(event.target.value)
          }
          value={conversionAmount}
          disabled
        />
        <StyledTextField
          label={TRANSFER_DETAILS_VALUES[2].option}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setRate(event.target.value)
          }
          value={rate}
          disabled
        />
        {renderButtons()}
      </Stack>
    )
  }

  const renderChangeOptionGrid = () => {
    return (
      <Grid>
        <Typography
          variant="caption"
          color={theme.palette.textColor.lowEmphasis}
        >
          {BUSINESS_DETAILS}
        </Typography>
        <StyledTextField
          label={RECEIPIENT_DETAILS_VALUES[0].option}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
          value={name}
        />
        <StyledTextField
          label={RECEIPIENT_DETAILS_VALUES[1].option}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(event.target.value)
          }
          value={email}
        />
        <StyledTextField
          label={RECEIPIENT_DETAILS_VALUES[2].option}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAccountNumber(event.target.value)
          }
          value={accountNumber}
        />
        <StyledTextField
          label={RECEIPIENT_DETAILS_VALUES[3].option}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setAccountType(event.target.value)
          }
          value={accountType}
        />
        {renderButtons()}
      </Grid>
    )
  }

  const renderDefaultPage = () => {
    return (
      <>
        {renderHeadingStacks(TRANSFER_DETAILS, EDIT, handleEditOption)}
        <Stack display="flex" flexDirection="row" margin="10px 0 10px">
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
            alt="Left-arrow-img"
            style={{ margin: '0 10px' }}
          />
          <Typography
            variant="body2"
            color={theme.palette.textColor.highEmphasis}
          >
            {sendMoneyData.amount_received
              ? `${sendMoneyData.amount_received.toFixed(2)} ${current_to_type}`
              : ''}
          </Typography>
        </Stack>
        {renderOptionStacks(TRANSFER_DETAILS_VALUES)}
        {renderHeadingStacks(RECEIPIENT_DETAILS, CHANGE, handleChangeOption)}
        {renderOptionStacks(RECEIPIENT_DETAILS_VALUES)}
        <StyledStack>
          <Typography
            variant="caption"
            color={theme.palette.textColor.lowEmphasis}
          >
            {SCHEDULE_DETAILS}
          </Typography>
          <StyledTypographyWithUnderline variant="underlineText">
            {EDIT}
          </StyledTypographyWithUnderline>
        </StyledStack>
        {renderOptionStacks(SCHEDULE_DETAILS_VALUES)}
        <StyledFooterStack>
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {REVIEW_CONFIRM_CHECK}
          </Typography>
          <StyledConfirmButton onClick={handleConfirm}>
            <Typography variant="body2">{CONFIRM_AND_CONTINUE}</Typography>
          </StyledConfirmButton>
        </StyledFooterStack>
      </>
    )
  }

  return (
    <div>
      <StyledBox>
        <Typography
          variant="h1"
          color={theme.palette.textColor.highEmphasis}
          sx={{ marginBottom: '30px' }}
        >
          {REVIEW_DETAILS_OF_TRANSFER}
        </Typography>
        {!edit && !change && renderDefaultPage()}
        {edit && renderEditOptionStack()}
        {change && renderChangeOptionGrid()}
      </StyledBox>
    </div>
  )
}

export default ReviewTransferDetails
