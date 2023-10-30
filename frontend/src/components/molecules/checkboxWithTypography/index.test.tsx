import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import CheckboxWithTypography from '.'
import { REMEMBER_ME } from '../../../utils/constants'
import theme from '../../../utils/themes/theme'

describe('Checkbox with Typography component', () => {
  test('Text rendering correctly', () => {
    render(
      <CheckboxWithTypography color={theme.palette.textColor.highEmphasis}>
        {REMEMBER_ME}
      </CheckboxWithTypography>
    )
    const textElement = screen.getByText(REMEMBER_ME)
    expect(textElement).toBeInTheDocument()
  })

  test('onClick working correctly', () => {
    const mockOnClick = jest.fn()
    render(
      <CheckboxWithTypography
        onClick={mockOnClick}
        color={theme.palette.textColor.highEmphasis}
      >
        {REMEMBER_ME}
      </CheckboxWithTypography>
    )
    const checkboxElement = screen.getByRole('checkbox')
    expect(checkboxElement).toBeInTheDocument()
    fireEvent.click(checkboxElement)
    expect(mockOnClick).toBeCalled()
  })
})
