import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { AccountTypeCard, AccountTypeCardProps } from './index'
export default {
  title: 'Organisms/AccountTypeCard',
  component: AccountTypeCard,
  argTypes: {
    onclick: { action: 'Trigger click event' },
  },
} as Meta

const Template: StoryFn<AccountTypeCardProps> = (args) => (
  <AccountTypeCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  width: '100%',
  height: '100%',
}
