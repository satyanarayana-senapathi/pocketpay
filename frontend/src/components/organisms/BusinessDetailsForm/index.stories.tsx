import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import BusinessDetailsForm, { BusinessDetailsFormProps } from '.'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

export default {
  title: 'Organisms/BusinessDetailsForm',
  component: BusinessDetailsForm,
  decorators: [
    (Story) => (
      <SendMoneyContext>
        <Story />
      </SendMoneyContext>
    ),
  ],
} as Meta

const Template: StoryFn<BusinessDetailsFormProps> = (args) => (
  <BusinessDetailsForm {...args} />
)

export const VerifyDirectorsForm = Template.bind({})

VerifyDirectorsForm.args = {
  businessData: [
    {
      id: 1,
      firstName: '',
      lastName: '',
      selectedDate: '',
      selectedCountry: null,
    },
  ],
  clearData: false,
  roleName: 'Director',
  addRoleButtonText: 'director',
  formHeading: 'Confirm your business directors',
  formDescription:
    'Please confirm these details from companies house. If anyone’s missing, add them below.',
  onContinue: action('Continue button clicked..'),
}

export const VerifyOwnersForm = Template.bind({})

VerifyOwnersForm.args = {
  businessData: [
    {
      id: 1,
      firstName: '',
      lastName: '',
      selectedDate: '',
      selectedCountry: null,
    },
  ],
  clearData: false,
  roleName: 'Shareholder',
  addRoleButtonText: 'owner',
  formHeading: 'Confirm your business owners',
  formDescription:
    'Please confirm these details from companies house. If anyone else controls more than 25% of your business, add them below.',
  onContinue: action('Continue button clicked..'),
}
