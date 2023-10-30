import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import ConfirmPurchase from '.'
import Lloydsbank from '../../../../public/assets/image/Lloydsbank.svg'
import Visabank from '../../../../public/assets/image/visa.svg'
import { LLOYDS_BANK_ALT, VISA_BANK_ALT } from '../../../utils/constants'

export default {
  title: 'molecules/ConfirmPurchase',
  component: ConfirmPurchase,
  argTypes: {
    handleClick: { action: 'Complete button clicked' },
  },
} as Meta<typeof ConfirmPurchase>

const template: StoryFn<typeof ConfirmPurchase> = (args) => (
  <ConfirmPurchase {...args} />
)

export const Primary = template.bind({})
Primary.args = {
  amount: '100.00',
  cardDigits: 9313,
  currenyType: 'GBP',
  leftIconSrc: Lloydsbank,
  rightIconSrc: Visabank,
  leftIconAlt: LLOYDS_BANK_ALT,
  rightIconAlt: VISA_BANK_ALT,
}
