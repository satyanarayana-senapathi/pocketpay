import { Header } from '../../components/organisms/Header'
import Sidebar from '../../components/organisms/Sidebar'
import { Box, Button, Typography, styled } from '@mui/material'
import HomeTemplate from '../../components/templates/HomeTemplate'
import { TransferStatusHeader } from '../../components/organisms/TransferStatusHeader'
import { CollapsablePaymentCard } from '../../components/organisms/CollapsablePaymentCard'
import theme from '../../utils/themes/theme'
import Image from '../../components/atoms/image'
import HOMEPAGE_IMG from '../../../public/assets/image/mobile.svg'
import './style.css'
import {
  HP_BUTTON,
  HP_HEADING,
  HP_TEXTLINE_ONE,
  HP_TEXTLINE_TWO,
} from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API } from '../../services/api/api'

const HomePageFlow = () => {
  const navigate = useNavigate()
  const [homepageData, setHomepageData] = useState<boolean>(false)
  const [transferData, setTransferData] = useState({
    status: '',
    amount_sent: 0,
    amount_received: 0,
    from_currency: '',
    to_currency: '',
  })
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
  })
  const [recipientData, setRecipientData] = useState({
    first_name: '',
    last_name: '',
  })

  useEffect(() => {
    try {
      API.get('/transfer').then((response) => {
        if (response) {
          console.log(response.data)
          const data = response.data
          if (data && data.length > 0) {
            setHomepageData(true)
            const newdata = data[data.length - 1]
            setTransferData(newdata)
          }
        }
      })
    } catch (error) {
      console.log('Get Error')
    }

    try {
      API.get('/personal_detail').then((response) => {
        if (response) {
          console.log(response.data)
          const data = response.data
          if (data && data.length > 0) {
            const newdata = data[data.length - 1]
            setUserData(newdata)
          }
        }
      })
    } catch (error) {
      console.log('Get Error')
    }

    try {
      API.get('/recipient').then((response) => {
        if (response) {
          console.log(response.data)
          const data = response.data
          if (data && data.length > 0) {
            const newdata = data[data.length - 1]
            setRecipientData(newdata)
          }
        }
      })
    } catch (error) {
      console.log('Get Error')
    }
  }, [])

  return (
    <>
      {homepageData ? (
        <HomeTemplate
          sidebarNode={
            <Box width={'100%'}>
              <Sidebar showDetail={true} />
            </Box>
          }
          headerNode={<Header width="100%" />}
          contentNode={
            <Box>
              <Box className="OuterBox">
                <Box className="StackStyle">
                  <Typography variant="h1">{HP_HEADING}</Typography>
                  <SendMoneyButton onClick={() => navigate('/send-money')}>
                    <Typography variant="body2">{HP_BUTTON}</Typography>
                  </SendMoneyButton>
                </Box>
                <Box className="InnerBox">
                  <TransferStatusHeader
                    name={`${recipientData.first_name} ${recipientData.last_name}`}
                    amountSend={`${transferData.amount_sent} ${transferData.from_currency}`}
                    amountReceived={
                      transferData.amount_received
                        ? `${transferData.amount_received.toFixed(2)} ${
                            transferData.to_currency
                          }`
                        : ''
                    }
                    dropdownBoxTop="5.3rem"
                    width="78vw"
                    dropdownContent={
                      <Box className="DropdownStyle">
                        <CollapsablePaymentCard
                          name={`${userData.first_name} ${userData.last_name} (YOU)`}
                          width="100%"
                        />
                      </Box>
                    }
                  />
                </Box>
              </Box>
            </Box>
          }
        ></HomeTemplate>
      ) : (
        <HomeTemplate
          sidebarNode={
            <Box width={'100%'}>
              <Sidebar showDetail={false} />
            </Box>
          }
          headerNode={<Header width="100%" />}
          contentNode={
            <Box>
              <Box className="TopBox">
                <Box className="StackStyle">
                  <Typography variant="h1">{HP_HEADING}</Typography>
                  <SendMoneyButton onClick={() => navigate('/send-money')}>
                    <Typography variant="body2">{HP_BUTTON}</Typography>
                  </SendMoneyButton>
                </Box>
                <Box className="ContentBoxStyle">
                  <Box className="ImageStyle">
                    <Image source={HOMEPAGE_IMG}></Image>
                  </Box>
                  <Typography
                    variant="body1"
                    color={theme.palette.textColor.lowEmphasis}
                  >
                    {HP_TEXTLINE_ONE}
                  </Typography>
                  <Typography
                    variant="body1"
                    color={theme.palette.textColor.lowEmphasis}
                  >
                    {HP_TEXTLINE_TWO}
                  </Typography>
                </Box>
              </Box>
            </Box>
          }
        ></HomeTemplate>
      )}
    </>
  )
}
export default HomePageFlow

const SendMoneyButton = styled(Button)({
  width: '159px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
  textTransform: 'capitalize',
})
