import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ChooseAccountType } from '.'

describe('Test for ChooseAccountType component', () => {
  const mockCardFn = jest.fn()
  test('render the styledBox', () => {
    render(<ChooseAccountType onCardSelected={mockCardFn} />)
    const outerBox = screen.getByTestId('choose_account-type')
    expect(outerBox).toBeInTheDocument()
  })

  test('onClick event handler works and Mock the onCardSelected', () => {
    const mockHandleCardClick = jest.fn()
    render(<ChooseAccountType onCardSelected={mockHandleCardClick} />)

    const radioElements = screen.getAllByRole('radio')
    expect(radioElements.length).toBe(4)

    fireEvent.click(radioElements[0])
    expect(radioElements[0]).toBeChecked()
    fireEvent.click(radioElements[2])
    expect(radioElements[2]).toBeChecked()
    fireEvent.click(radioElements[2])
    expect(radioElements[2]).not.toBeChecked()

    expect(mockHandleCardClick).toHaveBeenCalledTimes(3)
  })

  test('onClick event handler works', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockCardSelect = (a: string) => jest.fn()
    render(<ChooseAccountType onCardSelected={mockCardSelect} />)

    const radioElements = screen.getAllByRole('radio')
    expect(radioElements.length).toBe(4)

    fireEvent.click(radioElements[0])
    expect(radioElements[0]).toBeChecked()
    fireEvent.click(radioElements[2])
    expect(radioElements[2]).toBeChecked()
    fireEvent.click(radioElements[2])
    expect(radioElements[2]).not.toBeChecked()
  })
})
