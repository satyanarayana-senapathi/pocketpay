import { Meta, StoryFn } from '@storybook/react'
import { ReceiptantsDetailsForm, ReceiptantsDetailsFormProps } from '.'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

export default {
  title: 'Organisms/ReceiptantsDetailsForm',
  component: ReceiptantsDetailsForm,
  argTypes: {
    onclick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <SendMoneyContext>
        <Story />
      </SendMoneyContext>
    ),
  ],
} as Meta

const Template: StoryFn<ReceiptantsDetailsFormProps> = (args) => (
  <ReceiptantsDetailsForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  width: '600px',
  height: '800px',
  top: '10.25rem',
  left: '500px',
}
