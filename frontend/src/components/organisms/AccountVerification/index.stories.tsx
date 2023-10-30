import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import AccountVerificationCard from '.'
import { YourDetailContext } from '../../../Context/YourDetailContext'

export default {
  title: 'organisms/AccountVerificationCard',
  component: AccountVerificationCard,
  decorators: [
    (Story) => (
      <YourDetailContext>
        <Story />
      </YourDetailContext>
    ),
  ],
} as Meta<typeof AccountVerificationCard>

const Template: StoryFn<typeof AccountVerificationCard> = (args) => (
  <AccountVerificationCard {...args} />
)

export const AccountVerification = Template.bind({})
AccountVerification.args = {
  optionDetails: {
    selectedCategory: null,
    selectedSubcategory: null,
    selectedSize: null,
  },
  handleCont: action('Continue button clicked..'),
}
