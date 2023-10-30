// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, IconButton, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import Button from '../../atoms/button'
import Icon from '../../atoms/icon'
import {
  CC_HEADING,
  CC_AMOUNT,
  CC_RATE,
  CC_FEE,
  CC_LABEL_SEND,
  CC_LABEL_RECEIVE,
  CC_CONTINUE,
  CC_OK,
  CC_MODAL,
  CurrencyType,
  currencies,
  CurrencyConversion,
  Currency_Conversion_Values,
} from '../../../utils/constants'
import React, { useCallback, useEffect, useState } from 'react'
import AmountTextField from '../../molecules/dropdownTextfield'
import INFOICON from '../../../../public/assets/image/info.svg'
import DOWNICON from '../../../../public/assets/image/down.svg'
import Modal from '../../molecules/Modal'
import { useSendMoneyData } from '../../../Context/SendMoneyContext'

const CurrencyConversionCard: React.FC<{
  onContinue: () => void
  handleClick?: () => void
}> = ({ onContinue, handleClick }) => {
  const { updateSendMoneyData } = useSendMoneyData()
  const [amount, setAmount] = React.useState<string>('')
  const [selectedCurrency1, setSelectedCurrency1] =
    React.useState<CurrencyType>(currencies[1])
  const [selectedCurrency2, setSelectedCurrency2] =
    React.useState<CurrencyType>(currencies[1])
  const [convertedAmount, setConvertedAmount] = useState<number | undefined>()
  const [totalTransferAmount, setTotalTransferAmount] = useState<
    number | undefined
  >()
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const transferDetails = React.useMemo(() => {
    return Currency_Conversion_Values.map((conversion) => {
      const currency = currencies.find((cur) => cur.code === conversion.id)
      return currency ? { ...conversion, code: currency.code } : null
    }).filter(Boolean) as CurrencyConversion[]
  }, [])

  const fromCurrencyDetails = React.useMemo(
    () => transferDetails.find((item) => item.id === selectedCurrency1.code),
    [selectedCurrency1, transferDetails]
  )

  const handleAmountChange1 = (newAmount: string) => {
    setAmount(newAmount)
    performCurrencyConversion(newAmount, selectedCurrency1, selectedCurrency2)
  }

  const performCurrencyConversion = useCallback(
    (
      amountValue: string,
      fromCurrency: CurrencyType,
      toCurrency: CurrencyType
    ) => {
      const amount_sent = parseInt(amountValue)
      updateSendMoneyData({ amount_sent })

      const fromCurrencyDetails = transferDetails.find(
        (item) => item.id === fromCurrency.code
      )
      const from_currency = fromCurrencyDetails?.id
      updateSendMoneyData({ from_currency })

      const toCurrencyDetails = transferDetails.find(
        (item) => item.id === toCurrency.code
      )
      const to_currency = toCurrencyDetails?.id
      updateSendMoneyData({ to_currency })

      const transfer_fee = fromCurrencyDetails?.transferFee
      updateSendMoneyData({ transfer_fee })

      if (fromCurrencyDetails && toCurrencyDetails) {
        const transfer_rate = fromCurrencyDetails.rates[toCurrency.code]
        const amountMinusFee =
          parseFloat(amountValue) - fromCurrencyDetails.transferFee
        setTotalTransferAmount(
          isNaN(amountMinusFee) ? undefined : amountMinusFee
        )
        const amount_received = amountMinusFee * transfer_rate
        setConvertedAmount(isNaN(amount_received) ? undefined : amount_received)
        updateSendMoneyData({ amount_received })
        updateSendMoneyData({ transfer_rate })
      }
    },
    [transferDetails]
  )

  useEffect(() => {
    performCurrencyConversion(amount, selectedCurrency1, selectedCurrency2)
  }, [amount, selectedCurrency1, selectedCurrency2, performCurrencyConversion])

  return (
    <MainBox>
      <Box sx={{ marginBottom: '9rem' }}>
        <Box>
          <Typography
            variant="h1"
            color={theme.palette.textColor.highEmphasis}
            sx={{ marginRight: '5.25rem' }}
          >
            {CC_HEADING}
          </Typography>
        </Box>
        <Box>
          <TopStyleStack spacing={'1.75rem'}>
            <AmountTextField
              width="100%"
              label={CC_LABEL_SEND}
              amount={amount}
              selectedCurrency={selectedCurrency1}
              onAmountChange={handleAmountChange1}
              onCurrencyChange={(newCurrency) =>
                setSelectedCurrency1(newCurrency)
              }
            />
            <AmountTextField
              width="100%"
              label={CC_LABEL_RECEIVE}
              amount={
                convertedAmount !== undefined ? convertedAmount.toFixed(2) : ''
              }
              selectedCurrency={selectedCurrency2}
              onAmountChange={(newAmount) => {
                setAmount(newAmount)
                performCurrencyConversion(
                  newAmount,
                  selectedCurrency1,
                  selectedCurrency2
                )
              }}
              onCurrencyChange={(newCurrency) =>
                setSelectedCurrency2(newCurrency)
              }
            />
          </TopStyleStack>
          <EndStyleStack spacing={'1.25rem'}>
            <StyledTypography variant="body3">
              {`${CC_FEE} `}
              <span style={HorizontalLine}></span>
              <Stack display="flex" alignItems="center" flexDirection="row">
                <Typography
                  variant="body3"
                  color={theme.palette.textColor.lowEmphasis}
                >
                  From {fromCurrencyDetails?.transferFee}
                </Typography>{' '}
                {selectedCurrency1.code}
                <IconButton onClick={handleClick}>
                  <Icon src={INFOICON} alt="info-icon" />
                </IconButton>
              </Stack>
            </StyledTypography>
            <StyledTypography variant="body3">
              {`${CC_RATE} `}
              <span style={HorizontalLine}></span>
              <ModalOpenButton
                onClick={() => setShowModal(true)}
                variant="text"
                disableRipple
                disableElevation
              >
                <span>
                  {fromCurrencyDetails?.rates[selectedCurrency2.code]}
                </span>
                <Icon src={DOWNICON} />
              </ModalOpenButton>
            </StyledTypography>
            <StyledTypography variant="body3">
              {`${CC_AMOUNT} `}
              <span style={HorizontalLine}></span>
              <span>
                {totalTransferAmount?.toFixed(2)} {selectedCurrency1.code}
              </span>{' '}
              <Icon src={INFOICON} />
            </StyledTypography>
          </EndStyleStack>
        </Box>
      </Box>
      <OuterBox>
        <ContButton data-testid="continue-button">
          <Typography variant="body2" onClick={onContinue}>
            {CC_CONTINUE}
          </Typography>
        </ContButton>
      </OuterBox>
      {showModal && (
        <Modal isModalOpen={showModal}>
          <Box
            sx={{ width: '31vw', padding: '1rem' }}
            data-testid="currency-modal"
          >
            <Stack spacing={'1.25rem'}>
              <Typography
                variant="body1"
                color={theme.palette.textColor.mediumEmphasis}
              >
                {CC_MODAL}
              </Typography>
            </Stack>

            <Box>
              <ModalStyle>
                <ModalButton
                  data-testid="modal-add-btn"
                  variant="contained"
                  onClick={() => setShowModal(false)}
                >
                  <Typography variant="body2">{CC_OK}</Typography>
                </ModalButton>
              </ModalStyle>
            </Box>
          </Box>
        </Modal>
      )}
    </MainBox>
  )
}

export default CurrencyConversionCard

const MainBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  padding: '5px',
})

const OuterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
})

const TopStyleStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '2.5rem',
})

const EndStyleStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1.75rem',
  padding: '3px',
})

const ContButton = styled(Button)({
  width: '135px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
})

const ModalButton = styled(Button)({
  width: '135px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
  margin: '10px 0px 10px 0px',
})

const ModalOpenButton = styled(Button)({
  justifyContent: 'flex-end',
  padding: '0px',
  borderRadius: '0px',
  color: theme.palette.primary.primary500,
  backgroundColor: theme.palette.structuralColor.white,
  '&::hover': {
    color: theme.palette.primary.primary500,
    backgroundColor: theme.palette.primary.main,
  },
})
const HorizontalLine = {
  height: '14px',
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  borderBottom: `1px solid ${theme.palette.iconColor.stroke}`,
  lineHeight: 0,
  margin: '0 4px',
}
const StyledTypography = styled(Typography)({
  display: 'flex',
  flexDirection: 'row',
  color: theme.palette.textColor.lowEmphasis,
})

const ModalStyle = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '7rem',
})
