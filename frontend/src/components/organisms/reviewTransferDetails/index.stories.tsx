import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ReviewTransferDetails from '.'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

export default {
  title: 'organisms/ReviewTransferDetails',
  component: ReviewTransferDetails,
  decorators: [
    (Story) => (
      <SendMoneyContext>
        <Story />
      </SendMoneyContext>
    ),
  ],
} as Meta<typeof ReviewTransferDetails>

const template: StoryFn<typeof ReviewTransferDetails> = () => (
  <ReviewTransferDetails />
)

export const Primary = template.bind({})
