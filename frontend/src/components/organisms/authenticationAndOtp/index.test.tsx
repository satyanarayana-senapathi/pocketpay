import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import AuthenticationAndOtp from '.'
import { ENTER_6_DIGIT_CODE, ENTER_YOUR_CODE } from '../../../utils/constants'

describe('Authentication and OTP organism working correctly', () => {
  test('text rendering correctly', () => {
    render(<AuthenticationAndOtp />)
    const textElement = screen.getByText(ENTER_6_DIGIT_CODE)
    expect(textElement).toBeInTheDocument()
  })
  test('text field rendering correctly', () => {
    render(<AuthenticationAndOtp />)
    const textFieldElement = screen.getByTestId('OTP-textField')
    expect(textFieldElement).toBeInTheDocument()
  })

  test('button is disabled by default', () => {
    render(<AuthenticationAndOtp />)
    const buttonElement = screen.getByTestId('submit-button')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeDisabled()
  })

  test('button is disabled when textfield value is not of 6 digits', () => {
    render(<AuthenticationAndOtp />)
    const textFieldElement = screen.getByLabelText(ENTER_YOUR_CODE)
    const buttonElement = screen.getByTestId('submit-button')
    expect(buttonElement).toBeDisabled()
    fireEvent.change(textFieldElement, { target: { value: '3453' } })
    expect(buttonElement).toBeDisabled()
  })

  test('button is enabled when textfield value is of 6 digits', () => {
    render(<AuthenticationAndOtp />)
    const textFieldElement = screen.getByLabelText(ENTER_YOUR_CODE)
    const buttonElement = screen.getByTestId('submit-button')
    expect(buttonElement).toBeDisabled()
    fireEvent.change(textFieldElement, { target: { value: '345362' } })
    expect(buttonElement).not.toBeDisabled()
  })
})
