import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ComboBox, { ComboBoxProps, OptionItem } from './index'
import andorra from '../../../../public/assets/image/andorra.svg'
import uk from '../../../../public/assets/image/uk.svg'
import austria from '../../../../public/assets/image/austria.svg'
import india from '../../../../public/assets/image/india.svg'
import { action } from '@storybook/addon-actions'

export default {
  component: ComboBox,
  title: 'Atoms/ComboBox',
} as Meta

const Template: StoryFn<ComboBoxProps> = (args) => <ComboBox {...args} />

// Define options for the ComboBox
const options: OptionItem[] = [
  { label: 'Option 1', imageUrl: `${andorra}` },
  { label: 'Option 2', imageUrl: `${uk}` },
  { label: 'Option 3', imageUrl: `${austria}` },
  { label: 'Option 4', imageUrl: `${india}` },
]

export const Default = Template.bind({})
Default.args = {
  label: 'Select currency',
  options: options,
  onChange: action('trigger Onchange event..'),
}
