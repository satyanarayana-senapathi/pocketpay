import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SelectingPurpose from '.'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

export default {
  title: 'organisms/SelectingPurpose',
  component: SelectingPurpose,
  decorators: [
    (Story) => (
      <SendMoneyContext>
        <Story />
      </SendMoneyContext>
    ),
  ],
} as Meta<typeof SelectingPurpose>

const Template: StoryFn<typeof SelectingPurpose> = (args) => (
  <SelectingPurpose {...args} />
)

export const SelectingPurposeOfUse = Template.bind({})
SelectingPurposeOfUse.args = {
  optionDetails: {
    selectedPurpose: null,
  },
  handleClick: action('Continue button clicked..'),
}
