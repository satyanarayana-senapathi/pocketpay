import { Meta, StoryFn } from '@storybook/react'
import RecipientType from '.'
import PersonLogo from '../../../../public/assets/image/person.svg'
import DollarLogo from '../../../../public/assets/image/dollar.svg'
import SuitcaseLogo from '../../../../public/assets/image/suitcase.svg'

export default {
  title: 'molecules/RecipientsType',
  component: RecipientType,
  argTypes: {
    handleClick: { action: 'option clicked' },
  },
} as Meta<typeof RecipientType>

const template: StoryFn<typeof RecipientType> = (args) => (
  <RecipientType {...args} />
)

const RECIPEINT_TYPE_VALUES_DATA = [
  {
    id: 1,
    src: SuitcaseLogo,
    alt: 'my business logo',
    children: 'My Business',
  },
  {
    id: 2,
    src: PersonLogo,
    alt: 'person logo',
    children: 'Someone else',
  },
  {
    id: 3,
    src: DollarLogo,
    alt: 'dollar logo',
    children: 'Business or Charity',
  },
]

export const Primary = template.bind({})
Primary.args = {
  labels: RECIPEINT_TYPE_VALUES_DATA,
  cardId: 3,
  padding: '12px',
}
