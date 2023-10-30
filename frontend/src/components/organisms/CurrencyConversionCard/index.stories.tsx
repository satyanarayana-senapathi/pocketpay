import { Meta, StoryFn } from '@storybook/react'
import CurrencyConversionCard from '.'
import { action } from '@storybook/addon-actions'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

export default {
  title: 'organisms/CurrencyConversionCard',
  component: CurrencyConversionCard,
  decorators: [
    (Story) => (
      <SendMoneyContext>
        <Story />
      </SendMoneyContext>
    ),
  ],
} as Meta<typeof CurrencyConversionCard>

const template: StoryFn<typeof CurrencyConversionCard> = (args) => (
  <CurrencyConversionCard {...args} />
)

export const CurrencyConversion = template.bind({})
CurrencyConversion.args = {
  onContinue: action('Continue button clicked..'),
}
