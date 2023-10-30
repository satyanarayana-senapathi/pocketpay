import { Meta, StoryFn } from '@storybook/react'
import AccountCard from '.'
import { action } from '@storybook/addon-actions'
import { GET_ACCOUNT_CARD_VALUES } from '../../../utils/constants'

export default {
  title: 'molecules/AccountCard',
  component: AccountCard,
} as Meta

const Template: StoryFn<typeof AccountCard> = (args) => (
  <AccountCard {...args} />
)

export const AccountCards = Template.bind({})

AccountCards.args = {
  item: GET_ACCOUNT_CARD_VALUES(
    action('Send button clicked...'),
    action('Setup button clicked...'),
    true,
    true
  ),
}
