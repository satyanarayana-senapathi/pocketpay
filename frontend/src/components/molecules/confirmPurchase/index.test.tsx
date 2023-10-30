import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import ConfirmPurchase from '.'
import {
  CONFIRM_YOUR_PURCHASE,
  LLOYDS_BANK_ALT,
  VISA_BANK_ALT,
} from '../../../utils/constants'
import LloydsBankLogo from '../../../../public/assets/image/Lloydsbank.svg'
import VisaBankLogo from '../../../../public/assets/image/visa.svg'

describe('Confirm purchase molecule', () => {
  test('text rendering correctly', () => {
    render(
      <ConfirmPurchase
        cardDigits={9313}
        currenyType="GBP"
        amount="100.00"
        leftIconSrc={LloydsBankLogo}
        rightIconSrc={VisaBankLogo}
        leftIconAlt={LLOYDS_BANK_ALT}
        rightIconAlt={VISA_BANK_ALT}
      />
    )
    const textElement = screen.getByText(CONFIRM_YOUR_PURCHASE)
    expect(textElement).toBeInTheDocument()
  })

  test('onClick working correctly', () => {
    const mockHandleClick = jest.fn()
    render(
      <ConfirmPurchase
        cardDigits={9313}
        currenyType="GBP"
        amount="100.00"
        leftIconSrc={LloydsBankLogo}
        rightIconSrc={VisaBankLogo}
        leftIconAlt={LLOYDS_BANK_ALT}
        rightIconAlt={VISA_BANK_ALT}
        handleClick={mockHandleClick}
      />
    )
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
    fireEvent.click(buttonElement)
    expect(mockHandleClick).toBeCalled()
  })
})
