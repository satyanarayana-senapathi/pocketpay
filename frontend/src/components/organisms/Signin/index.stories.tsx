import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { SignIn, SigninProps } from './index'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Organisms/SignIn',
  component: SignIn,
} as Meta

const Template: StoryFn<SigninProps> = (args) => <SignIn {...args} />

export const Default = Template.bind({})
Default.args = {
  onClick: action('Continue button clicked..'),
}
