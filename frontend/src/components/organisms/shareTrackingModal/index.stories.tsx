import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import ShareTrackingModal from '.'

export default {
  title: 'organisms/ShareTrackingModal',
  component: ShareTrackingModal,
} as Meta<typeof ShareTrackingModal>

const template: StoryFn<typeof ShareTrackingModal> = () => (
  <ShareTrackingModal />
)

export const Primary = template.bind({})
