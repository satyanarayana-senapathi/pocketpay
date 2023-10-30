import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import SummaryCard from '.'
import {
  CANCEL_THIS_TRANSFER,
  CONTINUE_TO_PAY,
  SUMMARY_CARD_VALUES,
} from '../../../utils/constants'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

describe('summary card working correctly', () => {
  test('text rendering correctly', () => {
    render(
      <SendMoneyContext>
        <SummaryCard />
      </SendMoneyContext>
    )
    const textElement = screen.getByText(SUMMARY_CARD_VALUES[0].heading)
    expect(textElement).toBeInTheDocument()
  })

  test('buttons rendering correctly', () => {
    render(
      <SendMoneyContext>
        <SummaryCard />
      </SendMoneyContext>
    )
    const buttonElements = screen.getAllByRole('button')
    expect(buttonElements).toHaveLength(2)
  })

  test('buttons are not rendering when props is given', () => {
    render(
      <SendMoneyContext>
        <SummaryCard hasButtons={false} />
      </SendMoneyContext>
    )
    const buttonElement = screen.queryByRole('button')
    expect(buttonElement).not.toBeInTheDocument()
  })

  test('continue button working correctly', () => {
    const mockContinueButton = jest.fn()
    render(
      <SendMoneyContext>
        <SummaryCard handleContinuePayment={mockContinueButton} />
      </SendMoneyContext>
    )
    const continueButtonElement = screen.getByRole('button', {
      name: CONTINUE_TO_PAY,
    })
    expect(continueButtonElement).toBeInTheDocument()
    fireEvent.click(continueButtonElement)
    expect(mockContinueButton).toBeCalledTimes(1)
  })

  test('cancel button working correctly', () => {
    render(
      <SendMoneyContext>
        <SummaryCard />
      </SendMoneyContext>
    )
    const cancelButtonElement = screen.getByRole('button', {
      name: CANCEL_THIS_TRANSFER,
    })
    expect(cancelButtonElement).toBeInTheDocument()
    fireEvent.click(cancelButtonElement)
  })
})
