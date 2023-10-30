import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { CountryRegistration, CountryRegistrationProps } from './index'

export default {
  title: 'Organisms/CountryRegistration',
  component: CountryRegistration,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta

const Template: StoryFn<CountryRegistrationProps> = (args) => (
  <CountryRegistration {...args} />
)

export const Default = Template.bind({})
Default.args = {
  width: '700px',
  height: '700px',
  top: '50px',
  left: '100px',
  comboWidth: '400px',
}
