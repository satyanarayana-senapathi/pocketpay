import { Meta, StoryFn } from '@storybook/react'
import AvatarDropdown from '.'
import React from 'react'
import PersonImg from '../../../../public/assets/image/person2.svg'
import SettingsImg from '../../../../public/assets/image/settings.svg'
import QuestionMarkImg from '../../../../public/assets/image/questionMark.svg'
import LogoutImg from '../../../../public/assets/image/logout.svg'

export default {
  title: 'organisms/AvatarDropdown',
  component: AvatarDropdown,
} as Meta<typeof AvatarDropdown>

const template: StoryFn<typeof AvatarDropdown> = (args) => (
  <AvatarDropdown {...args} />
)

const dropdownValues = [
  {
    id: 1,
    src: PersonImg,
    alt: 'personIcon',
    children: 'Your Details',
  },
  {
    id: 2,
    src: SettingsImg,
    alt: 'settingsIcon',
    children: 'Settings',
  },
  {
    id: 3,
    src: QuestionMarkImg,
    alt: 'questionMarkIcon',
    children: 'Help center',
  },
  {
    id: 4,
    src: LogoutImg,
    alt: 'logoutIcon',
    children: 'Logout',
  },
]

export const Primary = template.bind({})
Primary.args = {
  dropdownOptions: dropdownValues,
}
