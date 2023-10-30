import { Meta, StoryFn } from '@storybook/react'
import PaymentThroughDebitCard, { PaymentThroughDebitCardProps } from './index'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

export default {
  title: 'Organisms/PaymentThroughDebitCard',
  component: PaymentThroughDebitCard,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <SendMoneyContext>
        <Story />
      </SendMoneyContext>
    ),
  ],
} as Meta

const Template: StoryFn<PaymentThroughDebitCardProps> = (args) => (
  <PaymentThroughDebitCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  width: '500px',
  height: '500px',
}
