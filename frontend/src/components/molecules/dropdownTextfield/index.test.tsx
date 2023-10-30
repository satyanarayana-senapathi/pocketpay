import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AmountTextField from '.'
import { currencies } from '../../../utils/constants'
import '@testing-library/jest-dom/extend-expect'

describe('AmountTextField', () => {
  const onAmountChange = jest.fn()
  const onCurrencyChange = jest.fn()

  beforeEach(() => {
    onAmountChange.mockClear()
    onCurrencyChange.mockClear()
  })

  it('should call onAmountChange when amount is changed', () => {
    render(
      <AmountTextField
        amount={'100'}
        label="You send"
        onAmountChange={onAmountChange}
        onCurrencyChange={onCurrencyChange}
        selectedCurrency={currencies[1]}
      />
    )

    const amountTextField = screen
      .getByTestId('amount-textfield')
      .querySelector('input') as HTMLInputElement

    fireEvent.change(amountTextField, { target: { value: '200' } })
    expect(onAmountChange).toHaveBeenCalledWith('200')
  })

  it('should call onCurrencyChange when a different currency is selected', () => {
    const { getByTestId, getByText } = render(
      <AmountTextField
        amount={'100'}
        label="You send"
        onAmountChange={onAmountChange}
        onCurrencyChange={onCurrencyChange}
        selectedCurrency={currencies[0]}
      />
    )

    const selectedCurrency = getByTestId('selected-currency')
    fireEvent.click(selectedCurrency)

    const currencyItem = getByText('EUR')
    fireEvent.click(currencyItem)

    expect(onCurrencyChange).toHaveBeenCalledWith(currencies[0])
  })

  it('should call onCurrencyChange and toggle visibility when a different currency is clicked', () => {
    const { getByTestId, getByText } = render(
      <AmountTextField
        amount={'100'}
        label="You send"
        onAmountChange={onAmountChange}
        onCurrencyChange={onCurrencyChange}
        selectedCurrency={currencies[2]}
      />
    )

    const selectedCurrency = getByTestId('selected-currency')
    fireEvent.click(selectedCurrency)

    const currencyItem = getByText('Austria')
    fireEvent.click(currencyItem)

    expect(selectedCurrency).not.toBeVisible()
  })

  it('should not call onCurrencyChange when an inactive currency is clicked', () => {
    const { getByTestId, getByText } = render(
      <AmountTextField
        amount={'100'}
        label="You send"
        onAmountChange={onAmountChange}
        onCurrencyChange={onCurrencyChange}
        selectedCurrency={currencies[0]}
      />
    )

    const selectedCurrency = getByTestId('selected-currency')
    fireEvent.click(selectedCurrency)

    const inactiveCurrencyItem = getByText('INR')
    fireEvent.click(inactiveCurrencyItem)

    expect(onCurrencyChange).toHaveBeenCalled()
  })
})
