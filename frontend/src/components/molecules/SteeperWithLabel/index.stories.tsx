import { Meta, Story } from '@storybook/react'
import CustomStepper, { StepperProps } from './index'
import {
  setupHorizontalStepperValues,
  verticalStepperValues,
} from '../../../utils/constants'

export default {
  title: 'Molecules/CustomStepper',
  component: CustomStepper,
} as Meta

const Template: Story<StepperProps> = (args) => <CustomStepper {...args} />

export const HorizontalStepper = Template.bind({})
HorizontalStepper.args = {
  horizontalStepperValues: setupHorizontalStepperValues,
  presentValue: 2,
  width: '700px',
}

export const VerticalStepper = Template.bind({})
VerticalStepper.args = {
  verticalStepperValues: verticalStepperValues,
  presentValue: 2,
  width: '710px',
  stepperwidth: '280px',
}
