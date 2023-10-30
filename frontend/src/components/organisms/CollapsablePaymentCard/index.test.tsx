import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CollapsablePaymentCard } from '.'
import {
  SET_UP_BY,
  TRANSFER_DIGIT,
  TRANSFER_NUMBER,
} from '../../../utils/constants'
import { BrowserRouter } from 'react-router-dom'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

describe('Test for ChooseAccountType component', () => {
  test('render the styledBox', () => {
    render(
      <BrowserRouter>
        <SendMoneyContext>
          <CollapsablePaymentCard />
        </SendMoneyContext>
      </BrowserRouter>
    )
    const outerBox = screen.getByTestId('collapsable-payment-card')
    expect(outerBox).toBeInTheDocument()
  })
  test('renders the main headings', () => {
    render(
      <BrowserRouter>
        <SendMoneyContext>
          <CollapsablePaymentCard />
        </SendMoneyContext>
      </BrowserRouter>
    )
    const mainHeadingElement = screen.getByText(SET_UP_BY)
    expect(mainHeadingElement).toBeInTheDocument()
  })
  test('renders the subheadings', () => {
    render(
      <BrowserRouter>
        <SendMoneyContext>
          <CollapsablePaymentCard />
        </SendMoneyContext>
      </BrowserRouter>
    )
    const transferNumberElement = screen.getByText(TRANSFER_NUMBER)
    const transferDigitElement = screen.getByText(TRANSFER_DIGIT)
    expect(transferNumberElement).toBeInTheDocument()
    expect(transferDigitElement).toBeInTheDocument()
  })
})
