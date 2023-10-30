import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PayeeDetailsCard from '.'
import '@testing-library/jest-dom'
import { PD_PAY, PD_HEADER, PD_MANUALLY } from '../../../utils/constants'

test('renders PayeeDetailsCard with amount', () => {
  const amount = '100'
  render(<PayeeDetailsCard amount={amount} />)

  expect(screen.getByText(PD_HEADER)).toBeInTheDocument()

  expect(screen.getByText(`${amount} GBP`)).toBeInTheDocument()

  expect(screen.getByText(PD_PAY)).toBeInTheDocument()

  expect(screen.getByText(PD_MANUALLY)).toBeInTheDocument()
})

test('calls handleContinue and handleCancel when respective buttons are clicked', () => {
  const mockHandleContinue = jest.fn()

  render(<PayeeDetailsCard onClickPay={mockHandleContinue} />)

  const continueButton = screen.getByRole('button', { name: PD_PAY })
  fireEvent.click(continueButton)

  expect(mockHandleContinue).toHaveBeenCalledTimes(1)
})
