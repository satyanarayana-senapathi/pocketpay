import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { TransferStatusHeader } from '.'

test('Styledbox test', () => {
  render(<TransferStatusHeader />)
  const styledBox = screen.getByTestId('outer-box')
  expect(styledBox).toBeInTheDocument()

  const dropdownIcon = screen.getByTestId('dropdown-icon')
  fireEvent.click(dropdownIcon)
})

test('Dropdown content is not displayed initially', () => {
  render(<TransferStatusHeader />)
  const dropdownContent = screen.queryByTestId('dropdown-content')
  expect(dropdownContent).not.toBeInTheDocument()
})
