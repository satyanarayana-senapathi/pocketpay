import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import Image from '.'
import HOMEPAGE_IMG from '../../../../public/assets/image/mobile.svg'
import SHARE_LINK from '../../../../public/assets/image/shareLink.svg'

export default {
  title: 'atoms/Image',
  component: Image,
  argTypes: {
    source: {
      control: { type: 'select' },
      options: [SHARE_LINK, HOMEPAGE_IMG],
    },
  },
} as Meta<typeof Image>

const template: StoryFn<typeof Image> = (args) => <Image {...args} />

export const HomePage = template.bind({})
HomePage.args = {
  source: HOMEPAGE_IMG,
  alt: 'Home page empty state image',
}

export const ShareImg = template.bind({})
ShareImg.args = {
  source: SHARE_LINK,
  alt: 'Share tracking link',
}
