import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import CustomTextField from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Atoms/TextField',
  component: CustomTextField,
} as Meta<typeof CustomTextField>

const Template: StoryFn<typeof CustomTextField> = (args) => (
  <CustomTextField {...args} />
)

export const TextFields = Template.bind({})
TextFields.args = {
  label: 'Email',
  variant: 'outlined',
  onChange: action('onChange event'),
}
