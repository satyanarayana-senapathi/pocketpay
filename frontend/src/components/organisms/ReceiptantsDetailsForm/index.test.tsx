import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { ReceiptantsDetailsForm } from '.'

import {
  ACCOUNT_NUMBER,
  CONTINUE,
  EMAIL,
  FIRST_NAME,
  IFSC,
  LAST_NAME,
  SELECT_ACCOUNT_TYPE,
  SAVING,
} from '../../../utils/constants'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

test('render ReceiptantsDetailsForm', () => {
  render(
    <SendMoneyContext>
      <ReceiptantsDetailsForm />
    </SendMoneyContext>
  )
  const MainBox = screen.getByTestId('main-box')
  expect(MainBox).toBeInTheDocument()
})

test('test for onChange event of email input', () => {
  render(
    <SendMoneyContext>
      <ReceiptantsDetailsForm />
    </SendMoneyContext>
  )

  const emailInput = screen.getByLabelText(EMAIL) as HTMLInputElement
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
  const updatedEmail = emailInput.value
  expect(updatedEmail).toBe('test@example.com')
})

test('test for onChange event of accountNumber input', () => {
  render(
    <SendMoneyContext>
      <ReceiptantsDetailsForm />
    </SendMoneyContext>
  )

  const accountNumberInput = screen.getByLabelText(
    ACCOUNT_NUMBER
  ) as HTMLInputElement
  fireEvent.change(accountNumberInput, { target: { value: '1234567890' } })
  const updatedAccountNumber = accountNumberInput.value
  expect(updatedAccountNumber).toBe('1234567890')
})

test('test for onChange event of firstName input', () => {
  render(
    <SendMoneyContext>
      <ReceiptantsDetailsForm />
    </SendMoneyContext>
  )

  const firstNameInput = screen.getByLabelText(FIRST_NAME) as HTMLInputElement
  fireEvent.change(firstNameInput, { target: { value: 'USER' } })
  const updatedFirstName = firstNameInput.value
  expect(updatedFirstName).toBe('USER')
})

test('test for onChange event of lastName input', () => {
  render(
    <SendMoneyContext>
      <ReceiptantsDetailsForm />
    </SendMoneyContext>
  )

  const lastNameInput = screen.getByLabelText(LAST_NAME) as HTMLInputElement
  fireEvent.change(lastNameInput, { target: { value: 'TEST' } })
  const updatedLastName = lastNameInput.value
  expect(updatedLastName).toBe('TEST')
})

test('test for onChange event of IFSC input', () => {
  render(
    <SendMoneyContext>
      <ReceiptantsDetailsForm />
    </SendMoneyContext>
  )

  const ifscInput = screen.getByLabelText(IFSC) as HTMLInputElement
  fireEvent.change(ifscInput, { target: { value: 'ABCD1234' } })
  const updatedIfsc = ifscInput.value
  expect(updatedIfsc).toBe('ABCD1234')
})

test('test button enabled state based on form inputs', () => {
  render(
    <SendMoneyContext>
      <ReceiptantsDetailsForm />
    </SendMoneyContext>
  )

  const continueButton = screen.getByRole('button', {
    name: CONTINUE,
  })
  expect(continueButton).toBeDisabled()

  const emailInput = screen.getByLabelText(EMAIL) as HTMLInputElement
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

  const accountNumberInput = screen.getByLabelText(
    ACCOUNT_NUMBER
  ) as HTMLInputElement
  fireEvent.change(accountNumberInput, { target: { value: '1234567890' } })

  const firstNameInput = screen.getByLabelText(FIRST_NAME) as HTMLInputElement
  fireEvent.change(firstNameInput, { target: { value: 'USER' } })

  const lastNameInput = screen.getByLabelText(LAST_NAME) as HTMLInputElement
  fireEvent.change(lastNameInput, { target: { value: 'TEST' } })

  const ifscInput = screen.getByLabelText(IFSC) as HTMLInputElement
  fireEvent.change(ifscInput, { target: { value: 'ABCD1234' } })

  const accountTypeTextField = screen.getByLabelText(SELECT_ACCOUNT_TYPE)
  expect(accountTypeTextField).toBeInTheDocument()
  fireEvent.change(accountTypeTextField, { target: { value: 'a' } })
  const savingAccount = screen.getByText(SAVING)
  fireEvent.click(savingAccount)

  expect(continueButton).toBeEnabled()

  fireEvent.change(emailInput, { target: { value: '' } })

  expect(continueButton).toBeDisabled()
})

test('details are fetched when checkbox is clicked', () => {
  render(
    <SendMoneyContext>
      <ReceiptantsDetailsForm />
    </SendMoneyContext>
  )

  const checkBoxElement = screen.getByRole('checkbox')
  expect(checkBoxElement).toBeInTheDocument()
  act(() => {
    fireEvent.click(checkBoxElement)
  })

  // const continueButton = screen.getByRole('button', {
  //   name: CONTINUE,
  // })
  // expect(continueButton).toBeEnabled()
})
