import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import CheckboxWithTypography from '.'
import { I_KNOW_BANK_DETAILS, REMEMBER_ME } from '../../../utils/constants'
import theme from '../../../utils/themes/theme'

export default {
  title: 'molecules/CheckboxWithTypography',
  component: CheckboxWithTypography,
  argTypes: {
    onClick: { action: 'Checkbox clicked' },
  },
} as Meta<typeof CheckboxWithTypography>

const template: StoryFn<typeof CheckboxWithTypography> = (args) => (
  <CheckboxWithTypography {...args} />
)

export const RememberMe = template.bind({})
RememberMe.args = {
  children: REMEMBER_ME,
  color: theme.palette.textColor.highEmphasis,
}

export const AlreadyKnowBankDetails = template.bind({})
AlreadyKnowBankDetails.args = {
  children: I_KNOW_BANK_DETAILS,
  color: theme.palette.textColor.mediumEmphasis,
}
