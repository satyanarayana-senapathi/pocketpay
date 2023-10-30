import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomCheckbox, { CustomCheckboxProps } from './index'

describe('CustomCheckbox', () => {
  const defaultProps: CustomCheckboxProps = {
    width: 'auto',
    height: 'auto',
  }

  test('calls that Checkbox function when text is changed', () => {
    let clicked = false
    const onClick = () => {
      clicked = true
    }
    render(<CustomCheckbox {...defaultProps} onClick={onClick} />)
    const CheckBox = screen.getByTestId('myCheck')
    fireEvent.click(CheckBox)
    expect(clicked).toBe(true)
  })

  test('renders  checkbox with default props', () => {
    render(<CustomCheckbox />)
    const checkbox = screen.getByTestId('myCheck')
    expect(checkbox).toBeInTheDocument()
  })

  test('renders a checkbox with the custom props', () => {
    render(<CustomCheckbox {...defaultProps} />)
    const checkbox = screen.getByTestId('myCheck')
    expect(checkbox).toHaveStyle(`width: auto`)
    expect(checkbox).toHaveStyle(`height: auto`)
  })

  it('testing with height and width', () => {
    render(<CustomCheckbox height="20px" width="20px" top="20px" left="20px" />)
    const boxelement = screen.getByTestId('myCheck')
    expect(boxelement).toBeInTheDocument()
  })
})
