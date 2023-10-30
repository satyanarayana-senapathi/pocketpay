import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BankCard from '.'
import '@testing-library/jest-dom'
import { BANK_CARD_VALUES } from '../../../utils/constants'

const mockProps = {
  name: 'John Doe',
  account_no: 1234567890,
  code: 'ABC123',
  address: '123 Main St Apt 4B City, State',
  amount: '$1000',
  reference_no: 'REF123456',
}

test('renders BankCard component with correct data', () => {
  render(<BankCard item={BANK_CARD_VALUES} {...mockProps} />)

  expect(screen.getByText(`${mockProps.name}`)).toBeInTheDocument()
  expect(screen.getByText(`${mockProps.account_no}`)).toBeInTheDocument()
  expect(screen.getByText(`${mockProps.code}`)).toBeInTheDocument()
  expect(screen.getByText(`${mockProps.address}`)).toBeInTheDocument()
  expect(screen.getByText(`${mockProps.amount}`)).toBeInTheDocument()
  expect(screen.getByText(`${mockProps.reference_no}`)).toBeInTheDocument()
})

test('calls handleContinue and handleCancel when respective buttons are clicked', () => {
  const mockHandleContinue = jest.fn()
  const mockHandleCancel = jest.fn()

  render(
    <BankCard
      item={BANK_CARD_VALUES}
      {...mockProps}
      handleContinue={mockHandleContinue}
      handleCancel={mockHandleCancel}
    />
  )

  const continueButton = screen.getByRole('button', { name: /Continue/i })
  const cancelButton = screen.getByRole('button', { name: /Cancel/i })

  fireEvent.click(continueButton)
  fireEvent.click(cancelButton)

  expect(mockHandleContinue).toHaveBeenCalledTimes(1)
  expect(mockHandleCancel).toHaveBeenCalledTimes(1)
})
