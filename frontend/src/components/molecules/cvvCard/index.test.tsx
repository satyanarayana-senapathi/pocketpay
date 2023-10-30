import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import CvvCard from '.'
import { EUR_VISA_DEBIT, HELPER_TEXT } from '../../../utils/constants'

describe('Cvv card component ', () => {
  test('icon rendering correctly', () => {
    render(<CvvCard cardDigits={9313} expiryDate="09/25" />)
    const textElement = screen.getByText(EUR_VISA_DEBIT)
    expect(textElement).toBeInTheDocument()
  })

  test('Onclick of radio button working correctly', () => {
    render(<CvvCard cardDigits={9313} expiryDate="09/25" />)
    const radioElement = screen.getByRole('radio')
    expect(radioElement).toBeInTheDocument()
    fireEvent.click(radioElement)
  })

  test('icon rendering correctly', () => {
    render(<CvvCard cardDigits={9313} expiryDate="09/25" />)
    const iconElement = screen.getByRole('img')
    expect(iconElement).toBeInTheDocument()
  })

  test('text field is disabled', () => {
    render(
      <CvvCard cardDigits={9313} expiryDate="09/25" radioChecked={false} />
    )
    const textFieldElement = screen.getByRole('textbox')
    expect(textFieldElement).toHaveValue('')
    expect(textFieldElement).not.toBeDisabled()
  })

  test('textfield default empty string working correctly', () => {
    render(<CvvCard cardDigits={9313} expiryDate="09/25" />)
    const textFieldElement = screen.getByRole('textbox')
    expect(textFieldElement).toHaveValue('')
  })

  test('text field when validation is success', () => {
    render(<CvvCard cardDigits={9313} expiryDate="09/25" radioChecked={true} />)
    const textFieldElement = screen.getByRole('textbox')
    fireEvent.change(textFieldElement, { target: { value: 'abc' } })
    expect(textFieldElement).toHaveValue('')
  })

  test('text field when validation is failed', () => {
    render(
      <CvvCard
        cardDigits={9313}
        expiryDate="09/25"
        radioChecked={true}
        textValue="ab"
      />
    )
    const errorTextElement = screen.getByText(HELPER_TEXT)
    expect(errorTextElement).toBeInTheDocument()
  })
})
