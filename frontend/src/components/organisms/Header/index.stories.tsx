import { Meta, StoryFn } from '@storybook/react'
import { Header, HeaderProps } from '.'

export default {
  title: 'Organisms/Header',
  component: Header,
} as Meta

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {
  width: '1136px',
  height: '60px',
  left: '230px',
}
