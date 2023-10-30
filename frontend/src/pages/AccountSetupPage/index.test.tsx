import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AccountSetupPage from '.'
import {
  BUSINESS_ACCOUNT,
  CONTINUE,
  COUNTRY_REGISTRATION,
  SELECT_YOUR_COUNTRY,
  setupHorizontalStepperValues,
} from '../../utils/constants'
import { useData } from '../../Context/UserContext'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../Context/UserContext')

jest.mock('../../services/api/api', () => ({
  API: {
    post: jest.fn((url, data) => {
      if (url === '/users') {
        if (data) {
          return Promise.resolve({
            data: 'Successfully posted data',
          })
        } else {
          return Promise.reject(new Error('Mocked API error'))
        }
      }
    }),
  },
}))

describe('AccountSetupPage component', () => {
  beforeEach(() => {
    const mockUpdateData = jest.fn()
    ;(useData as jest.Mock).mockReturnValue({ updateData: mockUpdateData })

    render(
      <BrowserRouter>
        <AccountSetupPage />
      </BrowserRouter>
    )
  })

  test('currency conversion page is rendering correctly and 1st stepper value is active', async () => {
    jest.setTimeout(15000)

    const textElement = screen.getByText(BUSINESS_ACCOUNT)
    expect(textElement).toBeInTheDocument()
    const businessTextElement = screen.getByText(
      setupHorizontalStepperValues[1]
    )
    expect(businessTextElement).toBeInTheDocument()
    expect(businessTextElement).toHaveClass('MuiSlider-markLabelActive')

    fireEvent.click(textElement)

    const stepperElement = screen.queryByRole('slider')
    expect(stepperElement).toBeInTheDocument()

    const currencyConversionTextElement = screen.getByText(COUNTRY_REGISTRATION)
    expect(currencyConversionTextElement).toBeInTheDocument()

    const stepperTextElement = screen.getByText(setupHorizontalStepperValues[2])
    expect(stepperTextElement).toBeInTheDocument()
    expect(stepperTextElement).toHaveClass('MuiSlider-markLabelActive')

    const amountSendingTextField = screen.getByLabelText(SELECT_YOUR_COUNTRY)
    expect(amountSendingTextField).toBeInTheDocument()
    fireEvent.change(amountSendingTextField, { target: { value: 'I' } })
    const india = screen.getByText('AUSTRIA')
    expect(india).toBeInTheDocument()
    fireEvent.click(india)

    const continueButton = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton).toBeInTheDocument()
    fireEvent.click(continueButton)

    const mobileTextField = screen.getByText(
      'Verify your phone number with a code'
    )
    expect(mobileTextField).toBeInTheDocument()

    const mobileNumber = screen.getByLabelText('Mobile number')
    expect(mobileNumber).toBeInTheDocument()

    fireEvent.change(mobileNumber, { target: { value: '23223423423' } })

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    expect(submitButton).toBeEnabled()
    fireEvent.click(submitButton)

    const mobileNumber1 = screen.getByText('Enter the 6-digit code')
    expect(mobileNumber1).toBeInTheDocument()

    const enterValue = screen.getByLabelText('Enter code here')
    expect(enterValue).toBeInTheDocument()

    fireEvent.change(enterValue, { target: { value: '232232' } })

    const helperText = screen.getByText('I didn’t recieve a code')
    expect(helperText).toBeInTheDocument()
    fireEvent.click(helperText)

    const approveText = screen.getByText('Approve another way')
    expect(approveText).toBeInTheDocument()

    const changeMobile = screen.getByText('Use a different phone number')
    fireEvent.click(changeMobile)

    const mobileTextField1 = screen.getByText(
      'Verify your phone number with a code'
    )
    expect(mobileTextField1).toBeInTheDocument()

    const mobileNumber2 = screen.getByLabelText('Mobile number')
    expect(mobileNumber2).toBeInTheDocument()

    fireEvent.change(mobileNumber2, { target: { value: '23223423423' } })

    const submitButton1 = screen.getByRole('button', { name: 'Submit' })
    expect(submitButton1).toBeEnabled()
    fireEvent.click(submitButton1)

    const mobileNumber3 = screen.getByText('Enter the 6-digit code')
    expect(mobileNumber3).toBeInTheDocument()

    const enterValue1 = screen.getByLabelText('Enter code here')
    expect(enterValue1).toBeInTheDocument()

    fireEvent.change(enterValue1, { target: { value: '232232' } })

    const submitButton3 = screen.getByRole('button', { name: 'Submit' })
    expect(submitButton3).toBeEnabled()
    fireEvent.click(submitButton3)

    const createPassword = screen.getByText('Create your password')
    expect(createPassword).toBeInTheDocument()

    const passwordValue = screen.getByLabelText('Enter your password')
    expect(passwordValue).toBeInTheDocument()

    fireEvent.change(passwordValue, { target: { value: '23223423423' } })

    const continueButton1 = screen.getByRole('button', { name: 'Continue' })
    expect(continueButton1).toBeEnabled()
    fireEvent.click(continueButton1)

    const backButtonElement = screen.getByAltText('back-button')
    expect(backButtonElement).toBeInTheDocument()
    fireEvent.click(backButtonElement)
  })
})
