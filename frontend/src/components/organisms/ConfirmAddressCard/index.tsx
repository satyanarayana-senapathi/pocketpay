import { Box, styled, Stack } from '@mui/material'
import Typography from '../../atoms/Typography'
import {
  CAC_add,
  CAC_add_address,
  CAC_cancel,
  CAC_caption,
  CAC_confirm,
  CAC_edit,
  CAC_header,
  CAC_heading,
  CAC_save,
  CAC_sub_header,
} from '../../../utils/constants'
import Button from '../../atoms/button'
import { ChangeEvent, useEffect, useState } from 'react'
import theme from '../../../utils/themes/theme'
import PaymentCard from '../../molecules/PaymentCard'
import CustomTextField from '../../atoms/Textfield'
import Modal from '../../molecules/Modal'
import { API } from '../../../services/api/api'

const StyledBox = styled(Box)({
  padding: '5px',
})

const TopStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginTop: '2rem',
})

const MidStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingRight: '15px',
})

const EndStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

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

const ColouredButton = styled(Button)({
  width: '218px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
  margin: '10px 0px 10px 0px',
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

const PlainButton = styled(Button)({
  width: '218px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.primary.primary500,
  backgroundColor: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.cardHover,
  },
  margin: '40px 0px 10px 0px',
})

const EditButton = styled(Button)({
  justifyContent: 'flex-end',
  padding: '0px 0px 0px 0px',
  borderRadius: '0px',
  '&::hover': {
    backgroundColor: theme.palette.structuralColor.white,
  },
})

const ModalStack = styled(Stack)({
  width: '37vw',
  marginTop: '1.25rem',
  marginBottom: '1.5rem',
})

const captionStyle = {
  ...theme.typography.body2,
  color: theme.palette.textColor.mediumEmphasis,
}

const addressStyle = {
  ...theme.typography.body2,
  color: theme.palette.textColor.highEmphasis,
  marginTop: '.75rem',
}
interface TradingAddress {
  id: number
  address: string
}

export interface ConfirmTradingAddressProps {
  addressArray: TradingAddress[]
  onConfirmAddress?: () => void
}

const ConfirmTradingAddress = (props: ConfirmTradingAddressProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [tradeAddress, setTradeAddress] = useState<string>('')
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(1)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [tradingAddressList, setTradingAddressList] = useState<
    TradingAddress[]
  >(props.addressArray)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/business')
        const business = response.data
        if (business && business.length > 0) {
          const { id, registered_address } = business[0]
          const newData: TradingAddress[] = [
            {
              id: id,
              address: registered_address,
            },
          ]
          setTradingAddressList(newData)
          console.log(newData[0])
        }
      } catch (error) {
        console.error('Error fetching business data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSave = async () => {
    const updatedData = {
      registered_address: tradeAddress,
    }
    try {
      const indexId = tradingAddressList[selectedAddressIndex].id

      const response = await API.patch(`/business/${indexId}`, updatedData)

      console.log('Address data updated successfully:', response.data)

      const updatedAddressData = response.data

      const updatedAddressList = [...tradingAddressList]
      updatedAddressList[selectedAddressIndex].address =
        updatedAddressData.registered_address

      setTradingAddressList(updatedAddressList)
    } catch (error) {
      console.error('Error updating address data:', error)
    }
  }

  const isValidAddress = tradeAddress.trim().length > 0

  const addTradingAddress = () => {
    const trimmedAddress = tradeAddress.trim()
    const newAddress: TradingAddress = {
      id: tradingAddressList.length + 1, // Generate a new id based on the length
      address: trimmedAddress,
    }
    // Add the new address to the list
    setTradingAddressList((prevList) => [...prevList, newAddress])
    setShowModal(false)
  }

  const editSelectedAddress = () => {
    setTradeAddress(tradingAddressList[selectedAddressIndex].address)
    setIsEditMode(true)
  }

  const saveEditedAddress = () => {
    handleSave()
    setIsEditMode(false)
  }

  const handleAddressChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTradeAddress(event.target.value)
  }

  const clearTradeAddress = () => {
    setIsEditMode(false)
    setTradeAddress('')
  }

  const saveTradeAddress = () => {
    saveEditedAddress()
    setTradeAddress('')
  }

  return (
    <div data-testid="confirm-trading-address">
      <StyledBox>
        <Box>
          <Stack direction="column" spacing={'0.75rem'}>
            <Typography
              variant="h1"
              color={theme.palette.textColor.highEmphasis}
            >
              {CAC_header}
            </Typography>
            <Typography
              variant="body3"
              color={theme.palette.textColor.mediumEmphasis}
            >
              {CAC_sub_header}
            </Typography>
          </Stack>
          <TopStack>
            <Typography
              variant="body3"
              sx={{ paddingTop: '5px' }}
              color={theme.palette.textColor.mediumEmphasis}
            >
              {CAC_caption}
            </Typography>
            {!isEditMode && (
              <EditButton
                data-testid="edit-button"
                variant="text"
                onClick={editSelectedAddress}
                disableRipple
              >
                <Typography
                  variant="body3"
                  sx={{
                    color: theme.palette.primary.primary300,
                    borderBottom: `1px solid ${theme.palette.primary.primary300}`,
                  }}
                >
                  {CAC_edit}
                </Typography>
              </EditButton>
            )}
          </TopStack>
        </Box>
        {!isEditMode && (
          <Box>
            <Box>
              <MidStack data-testid="address-list" spacing={'1.75rem'}>
                {tradingAddressList && tradingAddressList.length > 0 ? (
                  tradingAddressList.map((addressItem, index) => (
                    <PaymentCard
                      key={addressItem.id}
                      flexDirection={'row-reverse'}
                      cardContent={`Address ${addressItem.id}`}
                      primaryContent={addressItem.address}
                      cardVariant="body2"
                      detailVariant="body2"
                      cardVariantStyle={captionStyle}
                      detailVariantStyle={addressStyle}
                      onClick={() => setSelectedAddressIndex(index)}
                      isSelected={index === selectedAddressIndex}
                    ></PaymentCard>
                  ))
                ) : (
                  <Typography variant="body2">LOADING</Typography>
                )}
              </MidStack>
            </Box>
            <Box sx={{ marginTop: '1rem' }}>
              <EndStack>
                <PlainButton
                  data-testid="add-address"
                  variant="contained"
                  onClick={() => setShowModal(true)}
                >
                  <Typography variant="body2">{CAC_add_address}</Typography>
                </PlainButton>
                <ColouredButton
                  data-testid="continue-button"
                  variant="contained"
                  onClick={props.onConfirmAddress}
                >
                  <Typography variant="body2">{CAC_confirm}</Typography>
                </ColouredButton>
              </EndStack>
            </Box>
          </Box>
        )}
        {isEditMode && (
          <Box>
            <Box sx={{ marginTop: '1rem' }}>
              <Stack>
                <StyledTextField
                  data-testid="edit-address-textfield"
                  label={`Trading address ${selectedAddressIndex}`}
                  value={tradeAddress}
                  onChange={handleAddressChange}
                  multiline
                  inputProps={{ style: { fontSize: '17px' } }}
                />
              </Stack>
            </Box>
            <Box>
              <EndStack spacing={'1.25rem'}>
                <PlainButton
                  data-testid="cancel-button"
                  onClick={clearTradeAddress}
                >
                  <Typography variant="body2">{CAC_cancel}</Typography>
                </PlainButton>
                <ColouredButton
                  data-testid="save-address"
                  variant="contained"
                  disabled={!isValidAddress}
                  onClick={saveTradeAddress}
                >
                  <Typography variant="body2">{CAC_save}</Typography>
                </ColouredButton>
              </EndStack>
            </Box>
          </Box>
        )}
        {showModal && (
          <Modal isModalOpen={showModal}>
            <Box sx={{ width: '37vw' }} data-testid="address-modal">
              <Stack spacing={'1.25rem'}>
                <Typography variant="body1">{CAC_heading}</Typography>
              </Stack>

              <ModalStack spacing={'2.5rem'}>
                <Stack>
                  <StyledTextField
                    data-testid="add-address-textfield"
                    label={`Trading address ${selectedAddressIndex + 1}`}
                    value={tradeAddress}
                    onChange={handleAddressChange}
                    multiline
                  />
                </Stack>

                <Box>
                  <EndStack>
                    <ModalButton
                      data-testid="modal-add-btn"
                      variant="contained"
                      disabled={!isValidAddress}
                      onClick={addTradingAddress}
                    >
                      <Typography variant="body2">{CAC_add}</Typography>
                    </ModalButton>
                  </EndStack>
                </Box>
              </ModalStack>
            </Box>
          </Modal>
        )}
      </StyledBox>
    </div>
  )
}

export default ConfirmTradingAddress
