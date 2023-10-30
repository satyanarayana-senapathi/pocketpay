import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { SignUp, SignupProps } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Organisms/SignUp',
  component: SignUp,
} as Meta

const Template: StoryFn<SignupProps> = (args) => <SignUp {...args} />

export const Default = Template.bind({})
Default.args = {
  onClick: action('SignUp button clicked..'),
  onLoginClick: action('Log in test clicked..'),
}
