import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import ReviewTransferDetails from '.'
import {
  ACCOUNT_NUMBER,
  ACCOUNT_TYPE,
  AMOUNT,
  AMOUNT_WE_CONVERT,
  CHANGE,
  CONFIRM_AND_CONTINUE,
  EDIT,
  EMAIL,
  FEE,
  GUARANTEED_RATE,
  NAME,
  REVIEW_DETAILS_OF_TRANSFER,
} from '../../../utils/constants'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

describe('Review Transfer Details working correctly ', () => {
  test('text rendering correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const textElement = screen.getByText(REVIEW_DETAILS_OF_TRANSFER)
    expect(textElement).toBeInTheDocument()
  })

  test('Edit option working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )

    const editOptionElement = screen.getAllByText(EDIT)
    expect(editOptionElement[0]).toBeInTheDocument()
    fireEvent.click(editOptionElement[0])
  })

  test('Change option working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )

    const changeOptionElement = screen.getByText(CHANGE)
    expect(changeOptionElement).toBeInTheDocument()
    fireEvent.click(changeOptionElement)
  })

  test('confirm button working correctly', () => {
    const mockButton = jest.fn()
    render(
      <SendMoneyContext>
        <ReviewTransferDetails handleConfirmClick={mockButton} />
      </SendMoneyContext>
    )

    const confirmButtonElement = screen.getByRole('button', {
      name: CONFIRM_AND_CONTINUE,
    })
    expect(confirmButtonElement).toBeInTheDocument()
    fireEvent.click(confirmButtonElement)
    expect(mockButton).toBeCalledTimes(1)
  })

  test('on edit click textfields are rendering correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const editOptionElement = screen.getAllByText(EDIT)
    fireEvent.click(editOptionElement[0])
    const textFieldElements = screen.getAllByRole('textbox')
    expect(textFieldElements.length).toBe(4)
  })

  test('amount textfield rendering correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const editOptionElement = screen.getAllByText(EDIT)
    fireEvent.click(editOptionElement[0])
    const amountTextfieldElement = screen.getByLabelText(AMOUNT)
    expect(amountTextfieldElement).toBeInTheDocument()
    fireEvent.change(amountTextfieldElement, { target: { value: 'abc' } })
    expect(amountTextfieldElement).toHaveValue('abc')
  })

  test('fee textfield working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const editOptionElement = screen.getAllByText(EDIT)
    fireEvent.click(editOptionElement[0])
    const feeTextfieldElement = screen.getByLabelText(FEE)
    expect(feeTextfieldElement).toBeInTheDocument()
    fireEvent.change(feeTextfieldElement, { target: { value: 'abc' } })
    expect(feeTextfieldElement).toHaveValue('abc')
  })

  test('amount converted textfield working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const editOptionElement = screen.getAllByText(EDIT)
    fireEvent.click(editOptionElement[0])
    const amountConvertedTextfieldElement =
      screen.getByLabelText(AMOUNT_WE_CONVERT)
    expect(amountConvertedTextfieldElement).toBeInTheDocument()
    fireEvent.change(amountConvertedTextfieldElement, {
      target: { value: 'abc' },
    })
    expect(amountConvertedTextfieldElement).toHaveValue('abc')
  })

  test('rate converted textfield working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const editOptionElement = screen.getAllByText(EDIT)
    fireEvent.click(editOptionElement[0])
    const rateTextfieldElement = screen.getByLabelText(GUARANTEED_RATE)
    expect(rateTextfieldElement).toBeInTheDocument()
    fireEvent.change(rateTextfieldElement, {
      target: { value: 'abc' },
    })
    expect(rateTextfieldElement).toHaveValue('abc')
  })

  test('change option working correcly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const changeOptionElement = screen.getByText(CHANGE)
    expect(changeOptionElement).toBeInTheDocument()
    fireEvent.click(changeOptionElement)
    const textfieldElements = screen.getAllByRole('textbox')
    expect(textfieldElements.length).toBe(4)
  })

  test('name textfield working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const changeOptionElement = screen.getByText(CHANGE)
    fireEvent.click(changeOptionElement)
    const nameTextfield = screen.getByLabelText(NAME)
    expect(nameTextfield).toBeInTheDocument()
    fireEvent.change(nameTextfield, { target: { value: 'abc' } })
    expect(nameTextfield).toHaveValue('abc')
  })

  test('email textfield working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const changeOptionElement = screen.getByText(CHANGE)
    fireEvent.click(changeOptionElement)
    const emailTextfield = screen.getByLabelText(`${EMAIL}:`)
    expect(emailTextfield).toBeInTheDocument()
    fireEvent.change(emailTextfield, { target: { value: 'abc' } })
    expect(emailTextfield).toHaveValue('abc')
  })

  test('accountNumber textfield working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const changeOptionElement = screen.getByText(CHANGE)
    fireEvent.click(changeOptionElement)
    const accountNumberTextfield = screen.getByLabelText(`${ACCOUNT_NUMBER}:`)
    expect(accountNumberTextfield).toBeInTheDocument()
    fireEvent.change(accountNumberTextfield, { target: { value: '123' } })
    expect(accountNumberTextfield).toHaveValue('123')
  })

  test('accountType textfield working correctly', () => {
    render(
      <SendMoneyContext>
        <ReviewTransferDetails />
      </SendMoneyContext>
    )
    const changeOptionElement = screen.getByText(CHANGE)
    fireEvent.click(changeOptionElement)
    const accountTypeTextfield = screen.getByLabelText(`${ACCOUNT_TYPE}:`)
    expect(accountTypeTextfield).toBeInTheDocument()
    fireEvent.change(accountTypeTextfield, { target: { value: 'checking' } })
    expect(accountTypeTextfield).toHaveValue('checking')
  })
})
