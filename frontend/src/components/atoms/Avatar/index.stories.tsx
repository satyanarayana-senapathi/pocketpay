import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import CustomAvatar, { AvatarProps } from './index'
import avatar from '../../../../public/assets/image/avatar.svg'
import sbi from '../../../../public/assets/image/sbi.svg'
import lloyd from '../../../../public/assets/image/Lloydsbank.svg'
import flag from '../../../../public/assets/image/flag.svg'

export default {
  title: 'Atoms/Avatar',
  component: CustomAvatar,
} as Meta<typeof CustomAvatar>

const Template: StoryFn<AvatarProps> = (args) => <CustomAvatar {...args} />

export const Avatar = Template.bind({})
Avatar.args = {
  src: avatar,
  alt: 'Avatar Image',
  width: '1.75rem',
  height: '1.75rem',
}

export const SBI = Template.bind({})
SBI.args = {
  src: sbi,
  alt: 'Avatar Image',
  width: '1.75rem',
  height: '1.75rem',
}

export const Lloyd = Template.bind({})
Lloyd.args = {
  src: lloyd,
  alt: 'Avatar Image',
  width: '3.75rem',
  height: '3.75rem',
}

export const Logo = Template.bind({})
Logo.args = {
  src: flag,

  alt: 'Avatar Image',
  width: '3.75rem',
  height: '3.75rem',
}
