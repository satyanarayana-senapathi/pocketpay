import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { CollapsablePaymentCard, CollapsablePaymentCardProps } from '.'

export default {
  title: 'Organisms/CollapsablePaymentCard',
  component: CollapsablePaymentCard,
} as Meta

const Template: StoryFn<CollapsablePaymentCardProps> = (args) => (
  <CollapsablePaymentCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onClick: action('Button Clicked ...'),
}
