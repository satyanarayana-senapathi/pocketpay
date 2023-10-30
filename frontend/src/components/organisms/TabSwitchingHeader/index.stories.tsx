import { Meta, StoryFn } from '@storybook/react'
import { TabSwitchingHeader, TabSwitchingHeaderProps } from '.'

export default {
  title: 'Organisms/TabSwitchingHeader',
  component: TabSwitchingHeader,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta

const Template: StoryFn<TabSwitchingHeaderProps> = (args) => (
  <TabSwitchingHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {}
