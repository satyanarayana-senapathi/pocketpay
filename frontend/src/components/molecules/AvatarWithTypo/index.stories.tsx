import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import AvatarTypograpy, { AvatarTypograpyProps } from './index'
import sbi from '../../../../public/assets/image/sbi.svg'
import llyod from '../../../../public/assets/image/Lloydsbank.svg'
import theme from '../../../utils/themes/theme'

export default {
  title: 'molecules/AvatarTypograpy',
  component: AvatarTypograpy,
} as Meta

const Template: StoryFn<AvatarTypograpyProps> = (args) => (
  <AvatarTypograpy {...args} />
)

export const Default = Template.bind({})
Default.args = {
  icon: `${sbi}`,
  content: 'State Bank of India',
  color: theme.palette.textColor.highEmphasis,
  variant: 'caption',
}

export const WithCustomStyles = Template.bind({})
WithCustomStyles.args = {
  icon: `${llyod}`,
  content: 'LLyod',
  color: theme.palette.textColor.highEmphasis,
  variant: 'caption',
}
