import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/material'
import CustomStepper from '../../molecules/SteeperWithLabel'
import { TabSwitchingHeader } from '../TabSwitchingHeader'
import Typography from '../../atoms/Typography'
import {
  REFUND_DESCRIPTION,
  SET_UP_BY,
  TRANSFER_DIGIT,
  TRANSFER_NUMBER,
  YOUR_MONEY_WILL_BE_REFUNDED,
  verticalStepperValues,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import CancelTransferModal from '../cancelTransferModal'
import { API } from '../../../services/api/api'

export interface CollapsablePaymentCardProps {
  width?: string
  height?: string
  top?: string
  left?: string
  name?: string
  onClick?: () => void
}

const StyledBox = styled(Box)({
  borderColor: theme.palette.iconColor.stroke,
})

export const CollapsablePaymentCard: React.FC<CollapsablePaymentCardProps> = ({
  width,
  height,
  top,
  left,
  name,
}) => {
  const [statusvalue, setStatusValue] = useState('')
  useEffect(() => {
    let status = null
    try {
      API.get('/transfer').then((response) => {
        if (response) {
          const data = response.data
          if (data && data.length > 0) {
            status = data[data.length - 1].status
            setStatusValue(status)
          }
        }
      })
    } catch (error) {
      console.log('Get Error')
    }
  }, [])

  const handleCancel = async () => {
    setStatusValue('Cancelled')
    let transfer_id = null
    try {
      const response = await API.get('/transfer')
      const data = response.data
      if (data && data.length > 0) {
        transfer_id = data[data.length - 1].id

        console.log(data)
      }
    } catch (error) {
      console.error('Error getting user id:', error)
    }
    const newData = {
      status: 'Cancelled',
    }

    try {
      const response = await API.patch(`/transfer/${transfer_id}`, newData)
      console.log('PATCH response:', response)
    } catch (error) {
      console.error('Error patching data:', error)
    }
  }

  const mainHeading = () => (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      marginBottom={'1rem'}
      marginTop={'1rem'}
    >
      <Typography
        variant="body2"
        color={theme.palette.textColor.mediumEmphasis}
      >
        {SET_UP_BY}
      </Typography>
      <Typography variant="body2" color={theme.palette.textColor.highEmphasis}>
        {name}
      </Typography>
    </Box>
  )

  const subHeading = () => (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Typography
        variant="body2"
        color={theme.palette.textColor.mediumEmphasis}
      >
        {TRANSFER_NUMBER}
      </Typography>
      <Typography variant="body2" color={theme.palette.textColor.highEmphasis}>
        {TRANSFER_DIGIT}
      </Typography>
    </Box>
  )

  return (
    <StyledBox
      width={width}
      height={height}
      marginTop={top}
      marginLeft={left}
      border={'1px solid'}
      data-testid={'collapsable-payment-card'}
    >
      <TabSwitchingHeader />
      <Box>
        <Box marginLeft={'2.25rem'} width={'25rem'}>
          {mainHeading()}
          {subHeading()}
        </Box>
        {statusvalue === 'sending' ? (
          <Box
            marginTop={'2rem'}
            display={'flex'}
            width={'100%'}
            justifyContent={'flex-start'}
            flexDirection={'row'}
          >
            <CustomStepper
              presentValue={2}
              verticalStepperValues={verticalStepperValues}
              stepperwidth="220px"
            />
          </Box>
        ) : (
          <Box
            display={'flex'}
            flexDirection={'column'}
            marginBottom={'11.25rem'}
            marginLeft={'2.25rem'}
            marginTop={'1.25rem'}
          >
            <Typography
              variant="body1"
              color={theme.palette.textColor.highEmphasis}
            >
              {YOUR_MONEY_WILL_BE_REFUNDED}
            </Typography>
            <Box sx={{ marginTop: '1.25rem' }}>
              <Typography
                variant="body3"
                color={theme.palette.textColor.lowEmphasis}
              >
                {REFUND_DESCRIPTION}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
      {statusvalue === 'sending' && (
        <Box
          marginTop={'1rem'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'end'}
          margin="0 1.5rem 1.5rem 0"
        >
          <CancelTransferModal
            handleCancelTransfer={() => {
              handleCancel()
            }}
          />
        </Box>
      )}
    </StyledBox>
  )
}
