import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import ConfirmBusinessDetails from '.'
import {
  BUSINESS_NAME,
  CANCEL,
  CONFIRM,
  REGISTERED_ADDRESS,
  REGISTRATION_NUMBER,
  SAVE,
} from '../../../utils/constants'
import { BrowserRouter } from 'react-router-dom'
import { YourDetailContext } from '../../../Context/YourDetailContext'

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
jest.mock('../../../services/api/api', () => ({
  API: {
    patch: jest.fn(() =>
      Promise.resolve({
        data: { registered_address: 'Updated Address' },
      })
    ),
    get: jest.fn(() => {
      return Promise.resolve({ data: [mockBusinessData] })
    }),
  },
}))

describe('Confirm business component working correctly', () => {
  const onContinueMock = jest.fn()

  beforeEach(() => {
    onContinueMock.mockClear()
  })

  const renderConfirmBusinessDetails = () => {
    render(
      <BrowserRouter>
        <YourDetailContext>
          <ConfirmBusinessDetails handleConfirm={onContinueMock} />
        </YourDetailContext>
      </BrowserRouter>
    )
  }

  test('text rendering correctly', () => {
    renderConfirmBusinessDetails()
    const textElement = screen.getByText('Confirm your business details')
    expect(textElement).toBeInTheDocument()
  })

  test('edit click working correctly', () => {
    renderConfirmBusinessDetails()
    const editElement = screen.getByTestId('edit-option')
    expect(editElement).toBeInTheDocument()
    fireEvent.click(editElement)
  })

  test('business name textfield working correctly', () => {
    renderConfirmBusinessDetails()
    const editElement = screen.getByTestId('edit-option')
    fireEvent.click(editElement)
    const businessNameTextfieldElement = screen.getByLabelText(BUSINESS_NAME)
    expect(businessNameTextfieldElement).toBeInTheDocument()
    fireEvent.change(businessNameTextfieldElement, { target: { value: 'abc' } })
    expect(businessNameTextfieldElement).toHaveValue('abc')
  })

  test('business registration number textfield working correctly', () => {
    renderConfirmBusinessDetails()
    const editElement = screen.getByTestId('edit-option')
    fireEvent.click(editElement)
    const registrationNumberTextfieldElement =
      screen.getByLabelText(REGISTRATION_NUMBER)
    expect(registrationNumberTextfieldElement).toBeInTheDocument()
    fireEvent.change(registrationNumberTextfieldElement, {
      target: { value: 'abc' },
    })
    expect(registrationNumberTextfieldElement).toHaveValue('abc')
  })

  test('business registration number textfield working correctly', () => {
    renderConfirmBusinessDetails()
    const editElement = screen.getByTestId('edit-option')
    fireEvent.click(editElement)
    const registrationAddressTextfieldElement =
      screen.getByLabelText(REGISTERED_ADDRESS)
    expect(registrationAddressTextfieldElement).toBeInTheDocument()
    fireEvent.change(registrationAddressTextfieldElement, {
      target: { value: 'abc' },
    })
    expect(registrationAddressTextfieldElement).toHaveValue('abc')
  })

  test('cancel button working correctly', () => {
    renderConfirmBusinessDetails()
    const editElement = screen.getByTestId('edit-option')
    fireEvent.click(editElement)
    const cancelButtonElement = screen.getByRole('button', { name: CANCEL })
    expect(cancelButtonElement).toBeInTheDocument()
    fireEvent.click(cancelButtonElement)
  })

  test('confirm button working correctly', () => {
    renderConfirmBusinessDetails()
    const confirmButtonElement = screen.getByRole('button', {
      name: CONFIRM,
    })
    expect(confirmButtonElement).toBeInTheDocument()
    fireEvent.click(confirmButtonElement)
  })

  test('save button working correctly', () => {
    renderConfirmBusinessDetails()
    const editElement = screen.getByTestId('edit-option')
    expect(editElement).toBeInTheDocument()
    fireEvent.click(editElement)
    const saveButtonElement = screen.getByRole('button', { name: SAVE })
    expect(saveButtonElement).toBeInTheDocument()
    fireEvent.click(saveButtonElement)
    expect(editElement).not.toBeInTheDocument()
  })
})
