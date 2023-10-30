import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import DateSelector from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'molecules/DateSelector',
  component: DateSelector,
} as Meta<typeof DateSelector>

const template: StoryFn<typeof DateSelector> = (args) => (
  <DateSelector {...args} />
)

export const DatePicker = template.bind({})
DatePicker.args = {
  value: new Date(),
  onChange: action('Date change'),
}
