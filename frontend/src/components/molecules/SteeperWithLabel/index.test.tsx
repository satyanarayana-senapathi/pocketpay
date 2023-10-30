import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomStepper from './index'

describe('CustomStepper', () => {
  const horizontalStepperValues = ['Step 1', 'Step 2', 'Step 3']
  const verticalStepperValues = [
    { leftlable: 'Step 1', rightlable: 'Label 1' },
    { leftlable: 'Step 2', rightlable: 'Label 2' },
    { leftlable: 'Step 3', rightlable: 'Label 3' },
  ]
  const presentValue = 2
  const width = '800px'

  it('renders horizontal stepper correctly', () => {
    render(
      <CustomStepper
        presentValue={presentValue}
        horizontalStepperValues={horizontalStepperValues}
        width={width}
      />
    )

    const slider = screen.getByTestId('horizontal-slider')
    expect(slider).toBeInTheDocument()
  })

  it('renders vertical stepper correctly', () => {
    render(
      <CustomStepper
        presentValue={presentValue}
        verticalStepperValues={verticalStepperValues}
        width={width}
      />
    )

    const stepper = screen.getByTestId('vertical-stepper')
    expect(stepper).toBeInTheDocument()
  })

  it('renders vertical stepper correctly', () => {
    render(
      <CustomStepper
        presentValue={presentValue}
        verticalStepperValues={verticalStepperValues}
        width={width}
      />
    )

    const stepper = screen.getByTestId('vertical-stepper')
    expect(stepper).toBeInTheDocument()

    const stepLabels = screen.getAllByText(/Step \d/)
    expect(stepLabels).toHaveLength(verticalStepperValues.length)

    const rightLabels = screen.getAllByText(/Label \d/)
    expect(rightLabels).toHaveLength(verticalStepperValues.length)
  })
  it('renders vertical stepper correctly', () => {
    render(
      <CustomStepper
        presentValue={presentValue}
        verticalStepperValues={verticalStepperValues}
        width={width}
      />
    )

    const stepper = screen.getByTestId('vertical-stepper')
    expect(stepper).toBeInTheDocument()

    const stepLabels = screen.getAllByText(/Step \d/)
    expect(stepLabels).toHaveLength(verticalStepperValues.length)

    const rightLabels = screen.getAllByText(/Label \d/)
    expect(rightLabels).toHaveLength(verticalStepperValues.length)

    // Verify that the left and right labels are rendered correctly
    verticalStepperValues.forEach((step) => {
      const leftLabel = screen.getByText(step.leftlable)
      expect(leftLabel).toBeInTheDocument()

      const rightLabel = screen.getByText(step.rightlable)
      expect(rightLabel).toBeInTheDocument()
    })
  })

  it('renders horizontal stepper correctly', () => {
    const marks = [
      { value: 0, label: 'Start' },
      { value: 50, label: 'Middle' },
      { value: 100, label: 'End' },
    ]

    render(
      <CustomStepper
        presentValue={presentValue}
        horizontalStepperValues={horizontalStepperValues}
        width={width}
        marks={marks}
      />
    )

    const slider = screen.getByTestId('horizontal-slider')
    expect(slider).toBeInTheDocument()

    marks.forEach((mark) => {
      const markLabel = screen.getByText(mark.label)
      expect(markLabel).toBeInTheDocument()
    })
  })
  it('renders vertical stepper correctly', () => {
    render(
      <CustomStepper
        presentValue={presentValue}
        verticalStepperValues={verticalStepperValues}
        width={width}
      />
    )

    const stepper = screen.getByTestId('vertical-stepper')
    expect(stepper).toBeInTheDocument()

    const stepLabels = screen.getAllByText(/Step \d/)
    expect(stepLabels).toHaveLength(verticalStepperValues.length)

    const rightLabels = screen.getAllByText(/Label \d/)
    expect(rightLabels).toHaveLength(verticalStepperValues.length)

    // Verify that the left and right labels are rendered correctly
    verticalStepperValues.forEach((step) => {
      const leftLabel = screen.getByText(step.leftlable)
      expect(leftLabel).toBeInTheDocument()

      const rightLabel = screen.getByText(step.rightlable)
      expect(rightLabel).toBeInTheDocument()
    })
  })
})
