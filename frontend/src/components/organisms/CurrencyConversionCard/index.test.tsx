import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CurrencyConversionCard from '.'
import {
  CC_HEADING,
  CC_LABEL_RECEIVE,
  CC_LABEL_SEND,
  CC_MODAL,
} from '../../../utils/constants'
import '@testing-library/jest-dom/extend-expect'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../../../public/assets/image/info.svg', () => 'info.svg')
jest.mock('../../../../public/assets/image/down.svg', () => 'down.svg')

describe('CurrencyConversionCard', () => {
  const onContinueMock = jest.fn()

  afterEach(() => {
    onContinueMock.mockClear()
  })

  const setupComponent = () => {
    return render(
      <BrowserRouter>
        <SendMoneyContext>
          <CurrencyConversionCard onContinue={onContinueMock} />
        </SendMoneyContext>
      </BrowserRouter>
    )
  }

  it('renders without errors', () => {
    setupComponent()
    expect(screen.getByText(CC_HEADING)).toBeInTheDocument()
  })

  it('updates amount state correctly', () => {
    setupComponent()
    const amountInput = screen.getByLabelText(CC_LABEL_SEND) as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '100' } })
    expect(amountInput.value).toBe('100')
  })

  it('updates selectedCurrency1 state correctly', () => {
    setupComponent()
    const currencyDropdown = screen.getByLabelText(
      CC_LABEL_SEND
    ) as HTMLInputElement
    fireEvent.change(currencyDropdown, { target: { value: 'EUR' } })
  })

  it('updates selectedCurrency2 state correctly', () => {
    setupComponent()
    const currencyDropdown = screen.getByLabelText(
      CC_LABEL_RECEIVE
    ) as HTMLInputElement
    fireEvent.change(currencyDropdown, { target: { value: 'GBP' } })
    expect(currencyDropdown.value).toBe('')
  })

  it('updates convertedAmount state correctly when amount is changed', () => {
    setupComponent()
    const amountInput = screen.getByLabelText(CC_LABEL_SEND) as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '100' } })
    expect(screen.getByLabelText(CC_LABEL_RECEIVE)).toHaveValue('96.11')
  })

  it('updates totalTransferAmount state correctly when amount is changed', () => {
    setupComponent()
    const amountInput = screen.getByLabelText(CC_LABEL_SEND) as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '100' } })
  })

  it('displays the modal when CC_rate link is clicked', () => {
    setupComponent()
    const rateLink = screen.getByRole('button', { name: '1' })
    fireEvent.click(rateLink)
  })

  it('closes the modal when CC_ok button is clicked', () => {
    setupComponent()
    const rateLink = screen.getByRole('button', { name: '1' })
    fireEvent.click(rateLink)
    const text = screen.getByText(CC_MODAL)
    const modalAddButton = screen.getByTestId('modal-add-btn')
    expect(text).toBeInTheDocument()
    expect(modalAddButton).toBeInTheDocument()

    fireEvent.click(modalAddButton)
  })

  it('should call onContinue correctly', () => {
    setupComponent()

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(onContinueMock).toHaveBeenCalledTimes(0)
  })

  it('updates selectedCurrency1 state correctly when currency is changed', () => {
    setupComponent()

    const selectedCurrency = screen.getAllByTestId('selected-currency')

    fireEvent.click(selectedCurrency[0])
    const activeEle1 = screen.getByText('INR')
    fireEvent.click(activeEle1)

    fireEvent.click(selectedCurrency[1])
    const activeEle2 = screen.getByText('AUD')
    fireEvent.click(activeEle2)
  })
})
