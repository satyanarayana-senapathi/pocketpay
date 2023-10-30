import { Meta, StoryFn } from '@storybook/react'
import AmountTextField, { AmountTextFieldProps } from '.'
import { action } from '@storybook/addon-actions'
import { CurrencyType, currencies } from '../../../utils/constants'
import React from 'react'

export default {
  title: 'Molecules/AmountTextField',
  component: AmountTextField,
} as Meta

export const AmountTextfield: StoryFn<AmountTextFieldProps> = (args) => {
  const [amount, setAmount] = React.useState<string>('100')
  const [selectedCurrency, setSelectedCurrency] = React.useState(currencies[1])

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount)
    action('Amount field changed...')(newAmount)
  }

  const handleCurrencyChange = (newCurrency: CurrencyType) => {
    setSelectedCurrency(newCurrency)
    action('Currency option changed...')(newCurrency)
  }

  return (
    <AmountTextField
      {...args}
      amount={amount}
      selectedCurrency={selectedCurrency}
      onAmountChange={handleAmountChange}
      onCurrencyChange={handleCurrencyChange}
      width="35%"
    />
  )
}

AmountTextfield.args = {
  label: 'You send',
}
