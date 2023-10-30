import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import CancelTransferModal from '.'

export default {
  title: 'organisms/CancelTransferModal',
  component: CancelTransferModal,
} as Meta<typeof CancelTransferModal>

const template: StoryFn<typeof CancelTransferModal> = () => (
  <CancelTransferModal />
)

export const Primary = template.bind({})
