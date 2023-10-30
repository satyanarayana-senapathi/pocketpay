import { Meta, StoryFn } from '@storybook/react'
import Icon from '.'
import BankIcon from '../../../../public/assets/image/bank.svg'
import CardIcon from '../../../../public/assets/image/card.svg'
import LyodsBankIcon from '../../../../public/assets/image/Lloydsbank.svg'

export default {
  title: 'atoms/Icon',
  component: Icon,
} as Meta<typeof Icon>

const template: StoryFn<typeof Icon> = (args) => <Icon {...args} />

export const DebitCard = template.bind({})
DebitCard.args = {
  src: CardIcon,
  alt: 'Debit Card',
}

export const Bank = template.bind({})
Bank.args = {
  src: BankIcon,
  alt: 'Bank Icon',
}

export const LyodsBank = template.bind({})
LyodsBank.args = {
  src: LyodsBankIcon,
  alt: 'Lyods Bank Logo',
}
