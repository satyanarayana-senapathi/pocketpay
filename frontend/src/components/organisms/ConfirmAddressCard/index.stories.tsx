import { Meta, StoryFn } from '@storybook/react'
import ConfirmTradingAddress, { ConfirmTradingAddressProps } from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Organisms/ConfirmTradingAddress',
  component: ConfirmTradingAddress,
} as Meta

const Template: StoryFn<ConfirmTradingAddressProps> = (args) => (
  <ConfirmTradingAddress {...args} />
)

export const ConfirmTradeAddressCard = Template.bind({})

ConfirmTradeAddressCard.args = {
  onConfirmAddress: action('Continue button clicked..'),
}
