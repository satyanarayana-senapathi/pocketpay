import { Meta, StoryFn } from '@storybook/react'
import CvvCard from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'molecules/CvvCard',
  component: CvvCard,
  argTypes: {
    handleRadioClick: {
      action: 'radio button clicked',
    },
  },
} as Meta<typeof CvvCard>

const template: StoryFn<typeof CvvCard> = (args) => <CvvCard {...args} />

export const DisabledTextField = template.bind({})
DisabledTextField.args = {
  cardDigits: 9313,
  expiryDate: '09/25',
  radioChecked: false,
  isActive: true,
}

export const EnabledTextField = template.bind({})
EnabledTextField.args = {
  cardDigits: 9313,
  expiryDate: '09/25',
  radioChecked: true,
  isActive: false,
  handleTextFieldChange: action('cvv change'),
}
