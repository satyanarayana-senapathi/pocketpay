import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ApproveAnotherWay from '.'

export default {
  title: 'organisms/ApproveAnotherWay',
  component: ApproveAnotherWay,
} as Meta<typeof ApproveAnotherWay>

const template: StoryFn<typeof ApproveAnotherWay> = () => <ApproveAnotherWay />

export const Primary = template.bind({})
