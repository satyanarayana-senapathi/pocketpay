import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import DropdownTypography from '.'
import React from 'react'
import { MOBILE_LABEL, MOBILE_NUMBER_DROPDOWN } from '../../../utils/constants'
import { useData } from '../../../Context/UserContext'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../../Context/UserContext')

describe('DropdownTypography', () => {
  beforeEach(() => {
    const mockUpdateData = jest.fn()
    ;(useData as jest.Mock).mockReturnValue({ updateData: mockUpdateData })

    render(
      <BrowserRouter>
        <DropdownTypography array={MOBILE_NUMBER_DROPDOWN} />
      </BrowserRouter>
    )
  })

  test('component renders with the correct content', () => {
    const componentContent = screen.getByText(
      'Verify your phone number with a code'
    )
    expect(componentContent).toBeInTheDocument()
  })

  test('textfield rendering correctly', () => {
    const textFieldElement = screen.getByLabelText(MOBILE_LABEL)
    expect(textFieldElement).toBeInTheDocument()
  })

  test('icon rendering correctly when popover is closed', () => {
    const iconElements = screen.getAllByRole('img')
    expect(iconElements.length).toBe(2)
  })

  test('popover is closed by default ', () => {
    const iconButtonElement = screen.getByTestId('country-select-button')
    expect(iconButtonElement).toBeInTheDocument()
    fireEvent.click(iconButtonElement)
  })

  test('popover is opened when clicked', () => {
    const iconElementsBeforeClick = screen.getAllByRole('img')
    expect(iconElementsBeforeClick.length).toBe(2)
    const iconButtonElement = screen.getByTestId('country-select-button')
    expect(iconButtonElement).toBeInTheDocument()
    fireEvent.click(iconButtonElement)
    const iconElements = screen.getAllByRole('img')
    expect(iconElements.length).toBe(4)
    fireEvent.click(iconElements[2])
  })

  test('textfield value change working correctly', () => {
    const textFieldElement = screen.getByLabelText(MOBILE_LABEL)
    expect(textFieldElement).toBeInTheDocument()
    fireEvent.change(textFieldElement, { target: { value: '98989898' } })
    expect(textFieldElement).toHaveValue('+44 98989898')
  })

  test('textfield when country code is added everytime', () => {
    const textFieldElement = screen.getByLabelText(MOBILE_LABEL)
    expect(textFieldElement).toBeInTheDocument()
    fireEvent.change(textFieldElement, { target: { value: '+44 98989898' } })
    expect(textFieldElement).toHaveValue('+44 98989898')
  })

  test('popover is closed on click', () => {
    const iconButtonElement = screen.getByTestId('country-select-button')
    expect(iconButtonElement).toBeInTheDocument()
    fireEvent.click(iconButtonElement)
    const popoverElement = screen.getByTestId('pop-over')
    expect(popoverElement).toBeInTheDocument()
    const iconButtonInsidePopover = screen.getAllByTestId('pop-over-click')
    fireEvent.click(iconButtonInsidePopover[2])
    const iconElements = screen.getAllByRole('img')
    expect(iconElements.length).toBe(2)
  })
})
