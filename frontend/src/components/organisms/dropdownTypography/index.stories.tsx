import { Meta, StoryFn } from '@storybook/react'
import DropdownTypography from '.'
import AUDImg from '../../../../public/assets/image/AUD.svg'
import INRImg from '../../../../public/assets/image/inr.svg'
import GBPImg from '../../../../public/assets/image/gbp.svg'
import { UserContext } from '../../../Context/UserContext'

export default {
  title: 'organisms/DropdownWithTypography',
  component: DropdownTypography,
  decorators: [
    (Story) => (
      <UserContext>
        <Story />
      </UserContext>
    ),
  ],
} as Meta<typeof DropdownTypography>

const template: StoryFn<typeof DropdownTypography> = (args) => (
  <DropdownTypography {...args} />
)

const MOBILE_NUMBER_DROPDOWN = [
  {
    id: 1,
    src: AUDImg,
    alt: 'AUD',
    start: '+43',
  },
  {
    id: 2,
    src: GBPImg,
    alt: 'GBP',
    start: '+44',
  },
  {
    id: 3,
    src: INRImg,
    alt: 'INR',
    start: '+91',
  },
]
export const Primary = template.bind({})
Primary.args = {
  array: MOBILE_NUMBER_DROPDOWN,
  height: '600px',
  width: '600px',
}
