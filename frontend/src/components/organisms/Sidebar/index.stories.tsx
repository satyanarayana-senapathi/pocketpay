import { Meta, StoryFn } from '@storybook/react'
import Sidebar from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'organisms/Sidebar',
  component: Sidebar,
} as Meta<typeof Sidebar>

const template: StoryFn<typeof Sidebar> = (args) => <Sidebar {...args} />

export const SidebarMenu = template.bind({})
SidebarMenu.args = {
  handleClick: action('Continue button clicked..'),
}
