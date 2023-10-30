import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import PaymentThroughDebitCard from '.'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'
import { CVV } from '../../../utils/constants'

describe('Test for Header Component', () => {
  const mockOnChange = jest.fn()
  it('Test for Styled Box ', () => {
    render(
      <SendMoneyContext>
        <PaymentThroughDebitCard onChange={mockOnChange} />
      </SendMoneyContext>
    )

    const outerBox = screen.getByTestId('outer-box')
    expect(outerBox).toBeInTheDocument()
  })

  test('onClick event handler works and Mock the onCardSelected', () => {
    const mockHandleCardSelect = jest.fn()
    render(
      <SendMoneyContext>
        <PaymentThroughDebitCard onChange={mockOnChange} />
      </SendMoneyContext>
    )
    const radioElements = screen.getAllByRole('radio')
    expect(radioElements.length).toBe(2)

    fireEvent.click(radioElements[0])
    expect(radioElements[0]).toBeChecked()
    fireEvent.click(radioElements[1])
    expect(radioElements[1]).toBeChecked()
    fireEvent.click(radioElements[1])
    expect(radioElements[1]).not.toBeChecked()
  })

  test('cvv textfield validations are working', () => {
    render(
      <SendMoneyContext>
        <PaymentThroughDebitCard onChange={mockOnChange} />
      </SendMoneyContext>
    )

    const textFieldElements = screen.getAllByLabelText(CVV)
    expect(textFieldElements).toHaveLength(2)
    fireEvent.change(textFieldElements[0], { target: { value: 123 } })
  })

  test('cvv textfield when validations not met', () => {
    render(
      <SendMoneyContext>
        <PaymentThroughDebitCard onChange={mockOnChange} />
      </SendMoneyContext>
    )

    const textFieldElements = screen.getAllByLabelText(CVV)
    expect(textFieldElements).toHaveLength(2)
    fireEvent.change(textFieldElements[0], { target: { value: 'abc2' } })
  })
})
