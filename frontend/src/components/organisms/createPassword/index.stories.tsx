import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import CreatePassword from '.'
import { UserContext } from '../../../Context/UserContext'

export default {
  title: 'organisms/CreatePassword',
  component: CreatePassword,
  decorators: [
    (Story) => (
      <UserContext>
        <Story />
      </UserContext>
    ),
  ],
} as Meta<typeof CreatePassword>

const template: StoryFn<typeof CreatePassword> = (args) => (
  <CreatePassword {...args} />
)

export const Primary = template.bind({})
Primary.args = {
  height: '600px',
  width: '600px',
}
