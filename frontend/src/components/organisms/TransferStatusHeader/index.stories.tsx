import { Meta, StoryFn } from '@storybook/react'
import { TransferStatusHeader } from '.'
import { CollapsablePaymentCard } from '../CollapsablePaymentCard'
import { Box } from '@mui/material'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

export default {
  title: 'organisms/TransferStatusHeader',
  component: TransferStatusHeader,
  decorators: [
    (Story) => (
      <SendMoneyContext>
        <Story />
      </SendMoneyContext>
    ),
  ],
} as Meta<typeof TransferStatusHeader>

const template: StoryFn<typeof TransferStatusHeader> = (args) => (
  <TransferStatusHeader
    name="Mario Gabriel"
    amountReceived="100 GBP"
    amountSend="114.68 EUR"
    {...args}
  />
)

export const Primary = template.bind({})
Primary.args = {
  radius: '4px 0px 0px 0px',
  dropdownBoxTop: '4.5rem',
  width: '100%',
  dropdownContent: (
    <Box width={'95.7vw'}>
      <CollapsablePaymentCard width="100%" />
    </Box>
  ),
}
