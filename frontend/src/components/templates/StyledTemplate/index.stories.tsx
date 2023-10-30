import { Meta, StoryFn } from '@storybook/react'
import StyledTemplate from '.'
import { POCKET_PAY } from '../../../utils/constants'

export default {
  title: 'Templates/StyledTemplate',
  component: StyledTemplate,
} as Meta

const Template: StoryFn<typeof StyledTemplate> = (args) => (
  <StyledTemplate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  frontHeader: POCKET_PAY,
  middleHeader: POCKET_PAY,
  endHeader: POCKET_PAY,
  mainBody: POCKET_PAY,
}
