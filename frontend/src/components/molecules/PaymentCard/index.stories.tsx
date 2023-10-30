import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import PaymentCard from '.'
import theme from '../../../utils/themes/theme'
import transfertype from '../../../../public/assets/image/transfertype.svg'

export default {
  title: 'Molecules/PaymentCard',
  argTypes: {
    onClick: { action: 'Radio clicked' },
  },
  component: PaymentCard,
} as Meta

const Template: StoryFn<typeof PaymentCard> = (args) => (
  <PaymentCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  backgroundColor: theme.palette.structuralColor.white,
  icon: transfertype,
  cardContent: 'Debit Card',
  primaryContent: 'Send from your Visa or Mastercard.',
  secondaryContent: 'Should arrive by January 28th.',
  cardVariant: 'body3',
  detailVariant: 'caption',
  iconColor: theme.palette.structuralColor.blue,
  flexDirection: 'row',
}
