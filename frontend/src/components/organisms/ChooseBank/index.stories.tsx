import { Meta, StoryFn } from '@storybook/react'
import ChooseBank from '.'
import { action } from '@storybook/addon-actions'

export default {
  title: 'organisms/ChooseBank',
  component: ChooseBank,
} as Meta<typeof ChooseBank>

const template: StoryFn<typeof ChooseBank> = (args) => <ChooseBank {...args} />

export const ChooseBankCard = template.bind({})
ChooseBankCard.args = {
  onOptionClick: action('Option button clicked..'),
  onModalClick: action('Continue button clicked..'),
}
