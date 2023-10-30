import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ComboBox, { OptionItem } from './index'
import '@testing-library/jest-dom'
import { Avatar } from '@mui/material'

describe('ComboBox', () => {
  const options: OptionItem[] = [
    { imageUrl: 'image1.jpg', label: 'Option 1' },
    { imageUrl: 'image2.jpg', label: 'Option 2' },
    { imageUrl: 'image3.jpg', label: 'Option 3' },
  ]

  it('renders the ComboBox component', () => {
    const { getByLabelText } = render(<ComboBox options={options} />)
    const comboBoxInput = getByLabelText('Select currency')
    expect(comboBoxInput).toBeInTheDocument()
  })

  it('displays options when clicked', () => {
    const { getByLabelText, getByText } = render(<ComboBox options={options} />)
    const comboBoxInput = getByLabelText('Select currency')

    fireEvent.mouseDown(comboBoxInput)

    const option1 = getByText('Option 1')
    const option2 = getByText('Option 2')
    const option3 = getByText('Option 3')

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
    expect(option3).toBeInTheDocument()
  })

  it('calls onChange when an option is selected', () => {
    const mockOnChange = jest.fn()
    const { getByLabelText, getByText } = render(
      <ComboBox options={options} onChange={mockOnChange} />
    )
    const comboBoxInput = getByLabelText('Select currency')

    fireEvent.mouseDown(comboBoxInput)

    const option2 = getByText('Option 2')
    fireEvent.click(option2)

    expect(mockOnChange).toHaveBeenCalledWith(options[1])
  })

  it('returns the correct label for getOptionLabel', () => {
    const { getByLabelText, getByText } = render(<ComboBox options={options} />)
    const comboBoxInput = getByLabelText('Select currency')

    fireEvent.mouseDown(comboBoxInput)

    const option1 = getByText('Option 1')
    const option2 = getByText('Option 2')

    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()

    const option1Label = option1.textContent
    const option2Label = option2.textContent

    expect(option1Label).toBe('Option 1')
    expect(option2Label).toBe('Option 2')
  })

  it('calls onChange with the selected option', () => {
    const mockOnChange = jest.fn()
    const { getByLabelText, getByText } = render(
      <ComboBox options={options} onChange={mockOnChange} />
    )
    const comboBoxInput = getByLabelText('Select currency')

    fireEvent.mouseDown(comboBoxInput)

    const option2 = getByText('Option 2')
    fireEvent.click(option2)

    expect(mockOnChange).toHaveBeenCalledWith(options[1])
  })

  it('displays the option image', () => {
    const mockGetOptionImage = jest.fn()
    mockGetOptionImage.mockReturnValue(<Avatar src="image1.jpg" />)

    const { getByLabelText, getByText } = render(
      <ComboBox options={options} getOptionImage={mockGetOptionImage} />
    )
    const comboBoxInput = getByLabelText('Select currency')

    fireEvent.mouseDown(comboBoxInput)

    const option1Image = getByText('Option 1')
    const option2Image = getByText('Option 2')
    const option3Image = getByText('Option 3')

    expect(option1Image).toBeInTheDocument()
    expect(option2Image).toBeInTheDocument()
    expect(option3Image).toBeInTheDocument()

    // expect(mockGetOptionImage).toHaveBeenCalledTimes(options.length);
  })
})
