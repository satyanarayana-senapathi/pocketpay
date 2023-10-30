import { Meta, StoryFn } from '@storybook/react'
import PayeeDetailsCard from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'organisms/PayeeDetailsCard',
  component: PayeeDetailsCard,
} as Meta<typeof PayeeDetailsCard>

const template: StoryFn<typeof PayeeDetailsCard> = (args) => (
  <PayeeDetailsCard {...args} />
)

export const PayeeDetails = template.bind({})
PayeeDetails.args = {
  amount: '75.38',
  onClickPay: action('Continue button clicked..'),
}
