import { Meta, StoryFn } from '@storybook/react'
import BusinessSearch from '.'
import React from 'react'

export default {
  title: 'organisms/BusinessSearch',
  component: BusinessSearch,
} as Meta<typeof BusinessSearch>

const template: StoryFn<typeof BusinessSearch> = () => <BusinessSearch />

export const Primary = template.bind({})
