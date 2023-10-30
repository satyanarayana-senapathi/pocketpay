import './styles.css'
import React from 'react'
import { ThemeProvider } from '@emotion/react'
import theme from './utils/themes/theme'
import YourDetailsFlow from './pages/YourDetailsFlow'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUp'
import LoginPage from './pages/loginPage'
import AccountSetupPage from './pages/AccountSetupPage'
import MoneySendingFlowPage from './pages/moneySendingFlow'
import HomePageFlow from './pages/HomePageFlow'
import { SetupLayout } from './ContextRouting/SetupLayout'
import { YourDetailLayout } from './ContextRouting/YourDetailLayout'
import { SendMoneyLayout } from './ContextRouting/SendMoneyLayout'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<SetupLayout />}>
            <Route path="/" element={<SignUpPage />} />
            <Route path="account-setup" element={<AccountSetupPage />} />
          </Route>
          <Route element={<YourDetailLayout />}>
            <Route path="your-details" element={<YourDetailsFlow />} />
          </Route>
          <Route element={<SendMoneyLayout />}>
            <Route path="homepage" element={<HomePageFlow />} />
            <Route path="send-money" element={<MoneySendingFlowPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
