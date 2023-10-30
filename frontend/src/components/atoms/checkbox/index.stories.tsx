import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import CustomCheckbox, { CustomCheckboxProps } from '.'
import { action } from '@storybook/addon-actions'

export default {
  component: CustomCheckbox,
  title: 'Atoms/CustomCheckbox',
} as Meta

const Template: StoryFn<CustomCheckboxProps> = (args) => (
  <CustomCheckbox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  height: '1.5rem',
  width: '1.5rem',
  onClick: action('Continue button clicked..'),
}

export const Disabled = Template.bind({})
Disabled.args = {
  checked: false,
  height: '1.5rem',
  width: '1.5rem',
  disabled: false,
  onClick: action('Continue button clicked..'),
}
