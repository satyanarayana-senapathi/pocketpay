import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Typography, { TypographyProps } from './index'

export default {
  title: 'atoms/Typography',
  component: Typography,
} as Meta

const Template: StoryFn<TypographyProps> = (args) => <Typography {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'This is the default typography component.',
}

export const Heading = Template.bind({})
Heading.args = {
  variant: 'body3',
  children: 'This is a heading.',
}

export const Body = Template.bind({})
Body.args = {
  variant: 'caption',
  children: 'This is body text.',
}
