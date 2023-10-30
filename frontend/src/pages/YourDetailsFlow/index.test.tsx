import { render, screen, fireEvent } from '@testing-library/react'
import YourDetailsFlow from '.'
import '@testing-library/jest-dom/extend-expect'
import {
  BUSINESS_SEARCH,
  CONFIRM,
  CONTINUE,
  SELECT_YOUR_BUSINESS,
  UDF_continue,
} from '../../utils/constants'
import { YourDetailContext } from '../../Context/YourDetailContext'
import { BrowserRouter } from 'react-router-dom'

const mockBusinessData = [
  {
    id: 1,
    registered_address: 'Business Address 1',
  },
  {
    id: 2,
    registered_address: 'Business Address 2',
  },
]

jest.mock('../../services/api/api', () => ({
  API: {
    patch: jest.fn(() =>
      Promise.resolve({
        data: { registered_address: 'Updated Address' },
      })
    ),
    get: jest.fn(() => {
      return Promise.resolve({ data: mockBusinessData })
    }),
  },
}))

test('displays confirm business details form after clicking on a button', () => {
  render(
    <BrowserRouter>
      <YourDetailContext>
        <YourDetailsFlow />
      </YourDetailContext>
    </BrowserRouter>
  )
  const businessSearchForm = screen.getByText('Search for your business')
  const button = screen.getByRole('combobox', { name: 'Select your business' })
  fireEvent.click(button)

  const slider = screen.getByTestId('horizontal-slider')
  fireEvent.click(slider)

  expect(button).toBeInTheDocument()
  expect(businessSearchForm).toBeInTheDocument()
})

test('should render all components', () => {
  render(
    <BrowserRouter>
      <YourDetailContext>
        <YourDetailsFlow />
      </YourDetailContext>
    </BrowserRouter>
  )

  const businessSearchElement = screen.getByTestId('auto-complete')
  expect(businessSearchElement).toBeInTheDocument()
  fireEvent.click(businessSearchElement)

  const inputFieldElement = screen.getByLabelText(SELECT_YOUR_BUSINESS)
  fireEvent.change(inputFieldElement, { target: { value: 'Zemoso' } })
  const firstOption = screen.getByText(BUSINESS_SEARCH[0].label)
  fireEvent.click(firstOption)

  const businessConfirmForm = screen.getByText('Confirm your business details')
  expect(businessConfirmForm).toBeInTheDocument()
  const confirmButtonElement = screen.getByRole('button', {
    name: CONFIRM,
  })
  expect(confirmButtonElement).toBeInTheDocument()
  fireEvent.click(confirmButtonElement)

  const businessTradingForm = screen.getByText('Confirm trading address')
  expect(businessTradingForm).toBeInTheDocument()
  const confirmAddressButton = screen.getByRole('button', {
    name: CONFIRM,
  })
  expect(confirmAddressButton).toBeInTheDocument()
  fireEvent.click(confirmAddressButton)

  const businessSearchForm = screen.getByText(
    'Help us verify your account faster'
  )
  expect(businessSearchForm).toBeInTheDocument()
  const continueButton = screen.getByRole('button', {
    name: CONTINUE,
  })
  expect(continueButton).toBeInTheDocument()
  fireEvent.click(continueButton)

  const businessDetailForm = screen.getByText('Fill in your details')
  expect(businessDetailForm).toBeInTheDocument()
  const firstNameInput = screen.getByLabelText('First Name')
  const lastNameInput = screen.getByLabelText('Last Name')
  const dobSelector = screen.getByLabelText('Date of Birth')
  const address = screen.getByLabelText('Home address')
  const city = screen.getByLabelText('City')
  const code = screen.getByLabelText('Postal Code')
  fireEvent.change(firstNameInput, { target: { value: 'Rose' } })
  fireEvent.change(lastNameInput, { target: { value: 'Genner' } })
  fireEvent.change(dobSelector, { target: { value: '07/17/2000' } })
  fireEvent.change(address, { target: { value: '43 Baker Street' } })
  fireEvent.change(city, { target: { value: 'Paris' } })
  fireEvent.change(code, { target: { value: 'BK34 7CG' } })
  const continueDetailButton = screen.getByRole('button', {
    name: UDF_continue,
  })
  fireEvent.click(continueDetailButton)
  expect(continueDetailButton).toBeInTheDocument()

  const closeButtonElement = screen.getByTestId('close-button')
  fireEvent.click(closeButtonElement)
  expect(closeButtonElement).toBeInTheDocument()
})

test('should click close and back button', () => {
  render(
    <BrowserRouter>
      <YourDetailContext>
        <YourDetailsFlow />
      </YourDetailContext>
    </BrowserRouter>
  )

  const businessSearchElement = screen.getByTestId('auto-complete')
  expect(businessSearchElement).toBeInTheDocument()
  fireEvent.click(businessSearchElement)

  const inputFieldElement = screen.getByLabelText(SELECT_YOUR_BUSINESS)
  fireEvent.change(inputFieldElement, { target: { value: 'Zemoso' } })
  const firstOption = screen.getByText(BUSINESS_SEARCH[0].label)
  fireEvent.click(firstOption)

  const businessConfirmForm = screen.getByText('Confirm your business details')
  expect(businessConfirmForm).toBeInTheDocument()

  const backButtonElement = screen.getByTestId('back-button')
  expect(backButtonElement).toBeInTheDocument()
  fireEvent.click(backButtonElement)
})
