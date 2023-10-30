import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import RadioButton from '.'

export default {
  title: 'Atoms/RadioButton',
  component: RadioButton,
  argTypes: {
    size: {
      options: ['small', 'medium'],
      control: { type: 'radio' },
    },
    onChange: { action: 'clicked' },
  },
} as Meta<typeof RadioButton>

const Template: StoryFn<typeof RadioButton> = (args) => (
  <RadioButton {...args} />
)

export const RadioButton1 = Template.bind({})
RadioButton1.args = {}
