import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import SummaryCard from '.'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

export default {
  title: 'organisms/SummaryCard',
  component: SummaryCard,
  decorators: [
    (Story) => (
      <SendMoneyContext>
        <Story />
      </SendMoneyContext>
    ),
  ],
} as Meta<typeof SummaryCard>

const template: StoryFn<typeof SummaryCard> = (args) => (
  <SummaryCard {...args} />
)

export const SummaryCardWithButtons = template.bind({})
SummaryCardWithButtons.args = {
  hasButtons: true,
}

export const SummaryCardWithoutButtons = template.bind({})
SummaryCardWithoutButtons.args = {
  hasButtons: false,
}
