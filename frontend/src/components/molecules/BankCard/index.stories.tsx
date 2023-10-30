import { Meta, StoryFn } from '@storybook/react'
import BankCard from '.'
import LLOYDLOGO from '../../../../public/assets/image/Lloydsbank.svg'
import { action } from '@storybook/addon-actions'

export default {
  title: 'molecules/BankCard',
  component: BankCard,
} as Meta<typeof BankCard>

const template: StoryFn<typeof BankCard> = (args) => <BankCard {...args} />

const BANK_CARD_VALUES = [
  {
    id: 1,
    BC_header: 'Next, go to your Lloyds`s online banking and make a payment',
    BC_heading: 'Our bank details for payments in GBP',
    BC_subheading:
      'Below are the bank detail for this payment.Please only send the money from an account in your name',
    BC_name: 'Payee name',
    BC_amount: 'Amount to send',
    BC_code: 'UK Sort code',
    BC_refernce_number: 'Use this reference',
    BC_account_number: 'Account number',
    BC_address: 'Our bank address',
    BC_footer:
      'You can use your Lloyds online banking or mobile app to make your bank transfer to Wise',
    BC_continue: 'Continue',
    BC_cancel: 'Cancel this transfer',
    BC_iconSrc: LLOYDLOGO,
    BC_iconAlt: 'Lloyd Bank Icon',
  },
]

export const LloydBankCard = template.bind({})
LloydBankCard.args = {
  name: 'Mario Gabriel',
  code: '24-14-70',
  amount: '100.00 GBP',
  reference_no: '#356778810',
  account_no: 729019188810,
  address: `TransferWise\n
        56 Shoreditch High Street\n 
        London\n
        E16JJ\n
        United Kingdom`,
  item: BANK_CARD_VALUES,
  width: '30%',
  handleContinue: action('Continue Button Clicked'),
  handleCancel: action('Cancel Button Clicked'),
}
