import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '.'
import { CANCEL, SAVE } from '../../../utils/constants'
import theme from '../../../utils/themes/theme'

export default {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    color: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof Button>

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

export const Cancel = Template.bind({})
Cancel.args = {
  children: CANCEL,
  variant: 'contained',
  sx: {
    color: theme.palette.primary.primary500,
    backgroundColor: theme.palette.primary.contrastText,
  },
  onClick: action('cancel button clicked'),
}

export const Save = Template.bind({})
Save.args = {
  children: SAVE,
  sx: {
    backgroundColor: theme.palette.primary.primary500,
    color: theme.palette.primary.contrastText,
  },
  onClick: action('save button clicked'),
}
