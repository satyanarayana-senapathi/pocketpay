import { Meta, StoryFn } from '@storybook/react'
import { ChooseAccountType, ChooseAccountTypeProps } from '.'

export default {
  title: 'Organisms/ChooseAccountType',
  component: ChooseAccountType,
  argTypes: {
    onCardSelected: { action: 'Trigger click event' },
  },
} as Meta

const Template: StoryFn<ChooseAccountTypeProps> = (args) => (
  <ChooseAccountType {...args} />
)

export const Default = Template.bind({})
Default.args = {
  width: '525px',
  height: '800px',
  top: '100px',
  left: '100px',
}
