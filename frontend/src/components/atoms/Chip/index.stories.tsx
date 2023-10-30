import CustomChip from '.'
import { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Atoms/Chip',
  component: CustomChip,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof CustomChip>

const Template: StoryFn<typeof CustomChip> = (args) => <CustomChip {...args} />

export const Chips = Template.bind({})
Chips.args = {
  label: 'New',
  variant: 'filled',
}
