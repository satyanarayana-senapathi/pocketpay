import React, { useEffect, useState } from 'react'
import CustomStepper from '../../components/molecules/SteeperWithLabel'
import StyledTemplate from '../../components/templates/StyledTemplate'
import Icon from '../../components/atoms/icon'
import { Box, Grid } from '@mui/material'
import {
  RECIPEINT_TYPE_VALUES,
  horizontalStepperValues,
  BANK_CARD_VALUES,
  CONFIRM_YOUR_BUSINESS_DIRECTORS,
  BUSINESS_DIRECTORS_DESCRIPTION,
  CONFIRM_BUSINESS_OWNERS,
  BUSINESS_OWNER_DESCRIPTION,
  DIRECTOR,
  DIRECTOR_ROLE,
  STAKEHOLDER,
  STAKEHOLDER_ROLE,
  GET_ACCOUNT_CARD_VALUES,
  DEBIT_CARD,
  TRANSFER_FROM_YOUR_BANK,
  PAY_BY_CARD,
  OwnerDetailType,
} from '../../utils/constants'
import LOGO from '../../../public/assets/image/Lloydsbank.svg'
import VISA from '../../../public/assets/image/visa.svg'
import CurrencyConversionCard from '../../components/organisms/CurrencyConversionCard'
import AccountCard from '../../components/molecules/AccountCard'
import { ReceiptantsDetailsForm } from '../../components/organisms/ReceiptantsDetailsForm'
import SelectingPurpose from '../../components/organisms/SelectingPurpose'
import ReviewTransferDetails from '../../components/organisms/reviewTransferDetails'
import { ChooseAccountType } from '../../components/organisms/ChooseAccountType'
import SummaryCard from '../../components/organisms/summaryCard'
import BusinessDetailsForm, {
  BusinessDetailsDataType,
} from '../../components/organisms/BusinessDetailsForm'
import PaymentThroughDebitCard from '../../components/organisms/PaymentThroughDebitCard'
import ConfirmPurchase from '../../components/molecules/confirmPurchase'
import ChooseBank from '../../components/organisms/ChooseBank'
import PayeeDetailsCard from '../../components/organisms/PayeeDetailsCard'
import BankCard from '../../components/molecules/BankCard'
import RecipientType from '../../components/molecules/RecipientType'
import POCKETPAYLOGO from '../../../public/assets/image/logo.svg'
import BACKICON from '../../../public/assets/image/leftArrow.svg'
import CLOSEICON from '../../../public/assets/image/close.svg'
import Button from '../../components/atoms/button'
import './style.css'
import { API } from '../../services/api/api'
import { useNavigate } from 'react-router-dom'
import Typography from '../../components/atoms/Typography'
import { useSendMoneyData } from '../../Context/SendMoneyContext'

const HeaderLogo = () => {
  return (
    <Box className="LogoIconStyleBox">
      <Icon src={POCKETPAYLOGO}></Icon>
    </Box>
  )
}

const MoneySendingFlowPage = () => {
  const { sendMoneyData } = useSendMoneyData()
  const { updateSendMoneyData } = useSendMoneyData()
  const navigate = useNavigate()
  const current_from_type = sendMoneyData.from_currency
  const [stepperValue, setStepperValue] = useState<number>(0)
  const [pageValue, setPageValue] = useState<number>(1)
  const [payComponents, setPayComponents] = useState<string>(
    'choose-account-type'
  )

  const [nextCompValue, setNextCompValue] = useState<string>('')
  const [accountType, setAccountType] = useState<string>('')
  const [showbutton, setShowbutton] = useState<boolean>(true)
  const [backIconControl, setBackIconControl] = useState<boolean>(true)
  const [stepperControl, setStepperControl] = useState<boolean>(false)
  const default_data = {
    id: 0,
    firstName: '',
    lastName: '',
    selectedDate: '',
    selectedCountry: null,
  }
  const [directorsData, setDirectorsData] = useState<BusinessDetailsDataType[]>(
    [default_data]
  )
  const [stakeholderData, setStakeholderData] = useState<
    BusinessDetailsDataType[]
  >([default_data])

  useEffect(() => {
    try {
      API.get('/owner').then((response) => {
        if (response) {
          console.log(response.data)
          const directors_data: BusinessDetailsDataType[] = []
          const stakeholders_data: BusinessDetailsDataType[] = []
          response.data.forEach((element: any) => {
            const parentData = {
              id: element.id,
              firstName: element.first_name,
              lastName: element.last_name,
              selectedDate: element.dob,
              selectedCountry: element.country_of_residency,
            }
            if (element.type === 'director') {
              directors_data.push(parentData)
            } else {
              stakeholders_data.push(parentData)
            }
          })
          setDirectorsData(directors_data)
          setStakeholderData(stakeholders_data)
        }
      })
    } catch (error) {
      console.log('Get Error')
    }
  }, [])

  async function postRecipientData(data: unknown) {
    try {
      const response = await API.post('/recipient', data)
      console.log('POST response:', response.data)
    } catch (error) {
      console.error('Error posting data:')
    }
  }
  const RecipientData = {
    email: sendMoneyData.receiptant_email,
    first_name: sendMoneyData.receiptant_first_name,
    last_name: sendMoneyData.receiptant_last_name,
    account_number: sendMoneyData.receiptant_account_number,
    ifsc: sendMoneyData.receiptant_ifsc,
    account_type: sendMoneyData.receiptant_account_type,
  }

  const postData = async (data: any) => {
    try {
      const response = await API.post('/owner', data)
      console.log('POST response:', response)
    } catch (error) {
      console.error('Error posting data:')
    }
  }

  const patchData = async (id: number, data: any) => {
    try {
      const response = await API.patch(`/owner/${id}`, data)
      console.log('PATCH response:', response)
    } catch (error) {
      console.error('Error patching data:')
    }
  }

  const deleteData = async (id: number) => {
    try {
      const response = await API.delete(`/owner/${id}`)
      console.log('DELETE response:', response)
    } catch (error) {
      console.error('Error deleting data:')
    }
  }

  const directorDataManager = async () => {
    let directorDataLength = 0
    try {
      const response = await API.get('/owner')
      const data = response.data
      if (data && data.length > 0) {
        data.forEach((e: OwnerDetailType) => {
          const type_name = e.type
          if (type_name === 'director') {
            ++directorDataLength
          }
        })
      }
    } catch (error) {
      console.error('Error getting Data:')
    }

    let business_id = 0
    try {
      const response = await API.get('/business')
      const data = response.data
      if (data && data.length > 0) {
        business_id = data[data.length - 1].id
      }
    } catch (error) {
      console.error('Error getting user id:')
    }

    if (directorDataLength == 0) {
      sendMoneyData.director.forEach((arr: BusinessDetailsDataType) => {
        const data = {
          first_name: arr.firstName,
          last_name: arr.lastName,
          country_of_residency: arr.selectedCountry,
          dob: arr.selectedDate,
          type: 'director',
          business_id: business_id,
        }
        postData(data)
      })
    } else {
      const curr_length = sendMoneyData.director.length
      if (curr_length == directorDataLength) {
        sendMoneyData.director.forEach((arr: BusinessDetailsDataType) => {
          const data = {
            first_name: arr.firstName,
            last_name: arr.lastName,
            country_of_residency: arr.selectedCountry,
            dob: arr.selectedDate,
            type: 'director',
            business_id: business_id,
          }
          patchData(arr.id, data)
        })
      } else if (curr_length > directorDataLength) {
        let count = 0
        sendMoneyData.director.forEach((arr: BusinessDetailsDataType) => {
          const data = {
            first_name: arr.firstName,
            last_name: arr.lastName,
            country_of_residency: arr.selectedCountry,
            dob: arr.selectedDate,
            type: 'director',
            business_id: business_id,
          }
          if (count < directorDataLength) {
            patchData(arr.id, data)
            ++count
          } else {
            postData(data)
          }
        })
      } else {
        let count = 0
        sendMoneyData.director.forEach((arr: BusinessDetailsDataType) => {
          const data = {
            first_name: arr.firstName,
            last_name: arr.lastName,
            country_of_residency: arr.selectedCountry,
            dob: arr.selectedDate,
            type: 'director',
            business_id: business_id,
          }
          patchData(arr.id, data)
        })
        try {
          const response = await API.get('/owner')
          const data = response.data
          if (data && data.length > 0) {
            data.forEach((e: OwnerDetailType) => {
              const curr_id = e.id
              const type_name = e.type
              if (type_name === 'director') {
                if (count < curr_length) {
                  count++
                } else {
                  deleteData(curr_id)
                }
              }
            })
          }
        } catch (error) {
          console.error('Error getting Data:')
        }
      }
    }
  }

  const stakeholderDataManager = async () => {
    let stakeholderDataLength = 0
    try {
      const response = await API.get('/owner')
      const data = response.data
      if (data && data.length > 0) {
        data.forEach((e: OwnerDetailType) => {
          const type_name = e.type
          if (type_name === 'stakeholder') {
            ++stakeholderDataLength
          }
        })
      }
    } catch (error) {
      console.error('Error getting Data:')
    }

    let business_id = 0
    try {
      const response = await API.get('/business')
      const data = response.data
      if (data && data.length > 0) {
        business_id = data[data.length - 1].id
      }
    } catch (error) {
      console.error('Error getting user id:')
    }

    if (stakeholderDataLength == 0) {
      sendMoneyData.stakeholder.forEach((arr: BusinessDetailsDataType) => {
        const data = {
          first_name: arr.firstName,
          last_name: arr.lastName,
          country_of_residency: arr.selectedCountry,
          dob: arr.selectedDate,
          type: 'stakeholder',
          business_id: business_id,
        }
        postData(data)
      })
    } else {
      const curr_length = sendMoneyData.stakeholder.length
      if (curr_length == stakeholderDataLength) {
        sendMoneyData.stakeholder.forEach((arr: BusinessDetailsDataType) => {
          const data = {
            first_name: arr.firstName,
            last_name: arr.lastName,
            country_of_residency: arr.selectedCountry,
            dob: arr.selectedDate,
            type: 'stakeholder',
            business_id: business_id,
          }
          patchData(arr.id, data)
        })
      } else if (curr_length > stakeholderDataLength) {
        let count = 0
        sendMoneyData.stakeholder.forEach((arr: BusinessDetailsDataType) => {
          const data = {
            first_name: arr.firstName,
            last_name: arr.lastName,
            country_of_residency: arr.selectedCountry,
            dob: arr.selectedDate,
            type: 'stakeholder',
            business_id: business_id,
          }
          if (count < stakeholderDataLength) {
            patchData(arr.id, data)
            ++count
          } else {
            postData(data)
          }
        })
      } else {
        let count = 0
        sendMoneyData.stakeholder.forEach((arr: BusinessDetailsDataType) => {
          const data = {
            first_name: arr.firstName,
            last_name: arr.lastName,
            country_of_residency: arr.selectedCountry,
            dob: arr.selectedDate,
            type: 'stakeholder',
            business_id: business_id,
          }
          patchData(arr.id, data)
        })
        try {
          const response = await API.get('/owner')
          const data = response.data
          if (data && data.length > 0) {
            data.forEach((e: OwnerDetailType) => {
              const curr_id = e.id
              const type_name = e.type
              if (type_name === 'stakeholder') {
                if (count < curr_length) {
                  count++
                } else {
                  deleteData(curr_id)
                }
              }
            })
          }
        } catch (error) {
          console.error('Error getting Data:')
        }
      }
    }
  }

  const patchCardData = async (id: number, data: any) => {
    try {
      const response = await API.patch(`/debit_card_payment/${id}`, data)
      console.log('PATCH response:', response)
    } catch (error) {
      console.error('Error patching data:')
    }
  }

  async function postPaymentMethodData() {
    let user_id = null
    try {
      const response = await API.get('/users')
      const data = response.data
      if (data && data.length > 0) {
        user_id = data[data.length - 1].id
        console.log('User id:', user_id)
      }
    } catch (error) {
      console.error('Error getting user id:')
    }
    const PaymentMethodData = {
      payment_option_mode: sendMoneyData.transfer_type,
      bank_account_id: sendMoneyData.receiptant_account_number,
      debit_card_id: 1,
      user_id: user_id,
    }
    try {
      const response = await API.post('/payment_method', PaymentMethodData)
      console.log('POST response:', response.data)
    } catch (error) {
      console.error('Error posting data:')
    }
  }

  async function postBankAccountData() {
    let recipient_id = null
    try {
      const response = await API.get('/payment_method')
      const data = response.data
      if (data && data.length > 0) {
        recipient_id = data[data.length - 1].id
        console.log('Recipient id:', recipient_id)
      }
    } catch (error) {
      console.error('Error getting Recipient id:')
    }
    const BankAccountData = {
      id: recipient_id,
      bank_name: 'Lloyd',
      bank_address: `TransferWise\n 56 Shoreditch High Street\n London\n E16JJ\n United Kingdom`,
      account_number: sendMoneyData.receiptant_account_number,
      ifsc: sendMoneyData.receiptant_ifsc,
      account_type: sendMoneyData.receiptant_account_type,
    }
    try {
      const response = await API.post('/bank_account', BankAccountData)
      console.log('POST BankAccountData response:', response.data)
    } catch (error) {
      console.error('Error posting data:')
    }
  }

  async function postTransferDetailsData() {
    let user_id = null
    try {
      const response = await API.get('/users')
      const data = response.data
      if (data && data.length > 0) {
        user_id = data[data.length - 1].id
        console.log('User id:', user_id)
      }
    } catch (error) {
      console.error('Error getting user id:')
    }
    let payment_method_id = null
    try {
      const response = await API.get('/payment_method')
      const data = response.data
      if (data && data.length > 0) {
        payment_method_id = data[data.length - 1].id
        console.log('Payment method id:', payment_method_id)
      }
    } catch (error) {
      console.error('Error getting payment method id:')
    }
    let recipient_id = null
    try {
      const response = await API.get('/payment_method')
      const data = response.data
      if (data && data.length > 0) {
        recipient_id = data[data.length - 1].id
        console.log('Recipient id:', recipient_id)
      }
    } catch (error) {
      console.error('Error getting Recipient id:')
    }
    const status = 'sending'
    updateSendMoneyData({ status })
    const TransferDetailsData = {
      amount_sent: sendMoneyData.amount_sent,
      amount_received: sendMoneyData.amount_received,
      from_currency: sendMoneyData.from_currency,
      to_currency: sendMoneyData.to_currency,
      transfer_rate: sendMoneyData.transfer_rate,
      status: status,
      transfer_type: sendMoneyData.payment_option_mode,
      payment_purpose: sendMoneyData.payment_purpose,
      recipient_id: recipient_id,
      user_id: user_id,
      payment_method_id: payment_method_id,
    }
    try {
      const response = await API.post('/transfer', TransferDetailsData)
      console.log('POST response:', response.data)
    } catch (error) {
      console.error('Error posting data:')
    }
  }

  const triggerPost = async () => {
    postRecipientData(RecipientData)
    postBankAccountData()
    postTransferDetailsData()
    navigate('/homepage')
  }

  const handlePageNav = (
    stepvalue: number,
    iconVisibility: boolean,
    pageNumber: number
  ) => {
    setStepperValue(stepvalue)
    setBackIconControl(iconVisibility)
    setPageValue(pageNumber)
  }

  const handleComponentBack = (stepvalue: number, pageNumber: number) => {
    /* istanbul ignore next */
    if (stepperValue === 0) {
      setStepperValue(stepvalue)
      navigate('/homepage')
    } else if (stepperValue === 1) {
      setStepperValue(stepvalue - 1)
      setStepperControl(false)
      setPageValue(pageNumber - 1)
    } else if (stepperValue === 3) {
      if (pageNumber === 3) {
        setStepperValue(stepvalue - 2)
      }
      setPageValue(pageNumber - 1)
    } else if (stepperValue === 4) {
      if (pageNumber === 5) {
        setStepperValue(stepvalue - 1)
      }
      setPageValue(pageNumber - 1)
    } else if (stepperValue == 5) {
      if (pageNumber === 8) {
        setStepperValue(stepvalue - 1)
      }
      setPageValue(pageNumber - 1)
    } else if (stepperValue === 6) {
      setShowbutton(true)
      if (pageNumber === 9 && payComponents === 'choose-account-type') {
        setStepperValue(stepvalue - 1)
        setPageValue(pageNumber - 1)
        setBackIconControl(true)
        console.log('tick')
      } else if (pageNumber === 9) {
        if (payComponents === 'debit-card') {
          setPayComponents('choose-account-type')
          setNextCompValue('')
          setAccountType('')
        } else if (payComponents === 'confirm-purchase') {
          setPayComponents('debit-card')
          setNextCompValue('')
          setAccountType('')
        }
      } else if (pageNumber > 9) {
        if (pageNumber === 10) {
          setAccountType('')
          setPageValue(pageNumber - 1)
          setBackIconControl(false)
        } else {
          setPageValue(pageNumber - 1)
        }
      }
    }
  }

  const startFlow = () => {
    setPageValue(2)
    setStepperControl(true)
    setStepperValue(1)
  }

  const handleCVV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cvv = event.target.value
    if (cvv.length === 3) {
      updateSendMoneyData({ cvv })
      setNextCompValue('cont-debit')
    }
  }

  return (
    <StyledTemplate
      mainBody={
        <Grid container className="StyledGrid">
          {pageValue === 1 && (
            <Grid item className="gridItemStyle">
              <AccountCard
                item={GET_ACCOUNT_CARD_VALUES(
                  () => {
                    startFlow()
                  },
                  () => {
                    navigate('/homepage')
                  },
                  true,
                  true
                )}
              />
            </Grid>
          )}
          {pageValue === 2 && (
            <Grid item className="gridItemWithButtonStyle">
              <CurrencyConversionCard
                onContinue={() => handlePageNav(3, true, 3)}
                handleClick={() => handlePageNav(3, true, 3)}
              />
            </Grid>
          )}
          {pageValue === 3 && (
            <Grid item className="gridItemStyle">
              <RecipientType
                labels={RECIPEINT_TYPE_VALUES}
                cardId={3}
                padding={'12px'}
                handleClick={() => handlePageNav(3, true, 4)}
              />
            </Grid>
          )}
          {pageValue === 4 && (
            <Grid item className="gridItemWithButtonStyle">
              <ReceiptantsDetailsForm
                width="516px"
                onclick={() => {
                  handlePageNav(4, true, 5)
                }}
              />
            </Grid>
          )}
          {pageValue === 5 && (
            <Grid item className="gridItemWithButtonStyle">
              <SelectingPurpose
                optionDetails={{
                  selectedPurpose: null,
                }}
                handleClick={() => {
                  handlePageNav(4, true, 6)
                }}
              />
            </Grid>
          )}
          {pageValue === 6 && (
            <Grid item className="gridItemWithButtonStyle">
              <BusinessDetailsForm
                formHeading={CONFIRM_YOUR_BUSINESS_DIRECTORS}
                formDescription={BUSINESS_DIRECTORS_DESCRIPTION}
                roleName={DIRECTOR}
                addRoleButtonText={DIRECTOR_ROLE}
                onContinue={() => {
                  directorDataManager()
                  handlePageNav(4, true, 7)
                }}
                businessData={directorsData}
                clearData={true}
              />
            </Grid>
          )}
          {pageValue === 7 && (
            <Grid item className="gridItemWithButtonStyle">
              <BusinessDetailsForm
                formHeading={CONFIRM_BUSINESS_OWNERS}
                formDescription={BUSINESS_OWNER_DESCRIPTION}
                roleName={STAKEHOLDER}
                addRoleButtonText={STAKEHOLDER_ROLE}
                onContinue={() => {
                  stakeholderDataManager()
                  handlePageNav(5, true, 8)
                }}
                businessData={stakeholderData}
                clearData={false}
              />
            </Grid>
          )}
          {pageValue === 8 && (
            <Grid item className="gridItemStyle">
              <ReviewTransferDetails
                handleConfirmClick={() => {
                  handlePageNav(6, false, 9)
                }}
              />
            </Grid>
          )}
          {pageValue === 9 && (
            <Grid item className="BoxStyle">
              <Box className="BoxStyle">
                <Box>
                  <Button
                    sx={{ paddingLeft: '5rem' }}
                    className="ButtonStyle"
                    data-testid="back-button"
                    variant="text"
                    onClick={() => {
                      handleComponentBack(stepperValue, pageValue)
                    }}
                    disableElevation
                    disableTouchRipple
                  >
                    <Icon src={BACKICON}></Icon>
                  </Button>
                </Box>
                <Box className="TransferStyle">
                  <Box>
                    {payComponents === 'choose-account-type' && (
                      <ChooseAccountType
                        onCardSelected={(accountType) => {
                          setAccountType(accountType)
                        }}
                      />
                    )}
                    {payComponents === 'debit-card' && (
                      <Box className="CardStyle">
                        <Typography
                          variant="h1"
                          sx={{ marginBottom: '2.5rem' }}
                        >
                          {PAY_BY_CARD}
                        </Typography>
                        <PaymentThroughDebitCard onChange={handleCVV} />
                      </Box>
                    )}
                    {payComponents === 'confirm-purchase' && (
                      <Box className="CardStyle">
                        <Typography
                          variant="h1"
                          sx={{ marginBottom: '1.1rem' }}
                        >
                          {PAY_BY_CARD}
                        </Typography>
                        <ConfirmPurchase
                          amount={`${sendMoneyData.amount_sent.toFixed(2)}`}
                          cardDigits={sendMoneyData.cardDigits}
                          currenyType={`${current_from_type}`}
                          leftIconSrc={LOGO}
                          rightIconSrc={VISA}
                          //POST THE DATA
                          handleClick={() => {
                            triggerPost()
                          }}
                        />
                      </Box>
                    )}
                  </Box>
                  <Box width={'31vw'}>
                    <SummaryCard
                      hasButtons={showbutton}
                      handleContinuePayment={() => {
                        if (DEBIT_CARD === accountType) {
                          const type = 'debit'
                          updateSendMoneyData({ transfer_type: type })
                          setPayComponents('debit-card')
                        }
                        if (TRANSFER_FROM_YOUR_BANK === accountType) {
                          const type = 'net_banking'
                          updateSendMoneyData({ transfer_type: type })
                          handlePageNav(6, true, 10)
                        }
                        if ('cont-debit' === nextCompValue) {
                          patchCardData(1, {
                            cvv: sendMoneyData.cvv,
                            bank_account_id:
                              sendMoneyData.receiptant_account_number,
                          })
                          postPaymentMethodData()
                          setPayComponents('confirm-purchase')
                          setShowbutton(false)
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          )}
          {pageValue === 10 && (
            <Grid item className="gridItemStyle">
              <ChooseBank
                onOptionClick={() => {
                  handlePageNav(6, true, 11)
                }}
                onModalClick={() => {
                  navigate('/homepage')
                }}
              />
            </Grid>
          )}
          {pageValue === 11 && (
            <Grid item className="gridItemStyle">
              <PayeeDetailsCard
                amount={`${sendMoneyData.amount_sent.toFixed(2)}`}
                onClickPay={() => {
                  handlePageNav(6, true, 12)
                }}
              />
            </Grid>
          )}
          {pageValue === 12 && (
            <Grid item className="gridItemStyle">
              <BankCard
                width={'30%'}
                name={`${sendMoneyData.receiptant_first_name} ${sendMoneyData.receiptant_last_name}`}
                account_no={sendMoneyData.receiptant_account_type}
                code={'24-14-70'}
                address={`TransferWise\n
                56 Shoreditch High Street\n 
                London\n
                E16JJ\n
                United Kingdom`}
                amount={`${sendMoneyData.amount_sent.toFixed(
                  2
                )} ${current_from_type}`}
                reference_no={'#356778810'}
                item={BANK_CARD_VALUES}
                //POST THE DATA
                handleContinue={() => {
                  triggerPost()
                }}
                handleCancel={() => {
                  navigate('/homepage')
                }}
              />
            </Grid>
          )}
        </Grid>
      }
      frontHeader={<HeaderLogo />}
      middleHeader={
        <Box width={'100%'}>
          {stepperControl && (
            <CustomStepper
              presentValue={stepperValue}
              horizontalStepperValues={horizontalStepperValues}
              width="100%"
            />
          )}
        </Box>
      }
      buttonIcon={
        <Box className="BoxStyle">
          {backIconControl && (
            <Button
              className="ButtonStyle"
              data-testid="back-button"
              variant="text"
              onClick={() => handleComponentBack(stepperValue, pageValue)}
              disableElevation
              disableTouchRipple
            >
              <Icon src={BACKICON}></Icon>
            </Button>
          )}
        </Box>
      }
      endHeader={
        <Box className="CloseButtonBox">
          <Button
            className="ButtonStyle"
            data-testid="close-button"
            variant="text"
            onClick={() => console.log('Close button Integration ...')}
            disableElevation
            disableTouchRipple
          >
            <Icon src={CLOSEICON}></Icon>
          </Button>
        </Box>
      }
    />
  )
}

export default MoneySendingFlowPage
