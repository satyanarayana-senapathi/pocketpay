import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import UserDetailForm from '.'
import { YourDetailContext } from '../../../Context/YourDetailContext'

export default {
  title: 'organisms/UserDetailForm',
  component: UserDetailForm,
  decorators: [
    (Story) => (
      <YourDetailContext>
        <Story />
      </YourDetailContext>
    ),
  ],
} as Meta<typeof UserDetailForm>

const Template: StoryFn<typeof UserDetailForm> = (args) => (
  <UserDetailForm {...args} />
)

export const FillUserDetailForm = Template.bind({})
FillUserDetailForm.args = {
  userDetails: {
    firstName: '',
    lastName: '',
    selectedCountry: null,
    selectedDate: null,
    address: '',
    city: '',
    code: '',
  },
  handleContinue: action('Continue button clicked..'),
}
