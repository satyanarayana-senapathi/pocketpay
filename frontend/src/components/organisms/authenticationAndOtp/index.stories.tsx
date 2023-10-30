import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import AuthenticationAndOtp from '.'

export default {
  title: 'organisms/AuthenticationAndOtp',
  component: AuthenticationAndOtp,
} as Meta<typeof AuthenticationAndOtp>

const template: StoryFn<typeof AuthenticationAndOtp> = (args) => (
  <AuthenticationAndOtp {...args} />
)

export const Primary = template.bind({})
Primary.args = {
  height: '600px',
  width: '600px',
}
