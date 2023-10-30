import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ConfirmBusinessDetails from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'organisms/confirmBusinessDetails',
  component: ConfirmBusinessDetails,
} as Meta<typeof ConfirmBusinessDetails>

const template: StoryFn<typeof ConfirmBusinessDetails> = (args) => (
  <ConfirmBusinessDetails {...args} />
)

export const Primary = template.bind({})
Primary.args = {
  handleConfirm: action('Continue button clicked..'),
}
