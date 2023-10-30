import { Meta, StoryFn } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import GOOGLE from '../../../../public/assets/image/google.svg'
import APPLE from '../../../../public/assets/image/apple.svg'
import FACEBOOK from '../../../../public/assets/image/facebook.svg'
import IconGrid from '.'

export default {
  title: 'molecules/IconGrid',
  component: IconGrid,
} as Meta<typeof IconGrid>

const Template: StoryFn<typeof IconGrid> = (args) => <IconGrid {...args} />

export const CustomIconGrid = Template.bind({})
CustomIconGrid.args = {
  thirdPartySignUpArray: [
    {
      id: 1,
      partyIcon: GOOGLE,
      onClick: action('Google clicked'),
      active: true,
    },
    {
      id: 2,
      partyIcon: FACEBOOK,
      onClick: action('Facebook clicked'),
      active: false,
    },
    {
      id: 3,
      partyIcon: APPLE,
      onClick: action('Apple clicked'),
      active: false,
    },
  ],
}
