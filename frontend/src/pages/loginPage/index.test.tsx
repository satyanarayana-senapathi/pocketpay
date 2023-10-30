import '@testing-library/jest-dom'
import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import LoginPage from '.'
import { EMAIL } from '../../utils/constants'
import { BrowserRouter } from 'react-router-dom'

describe('Login Page rendering correctly', () => {
  it('login component rendering correctly', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )
    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })
    expect(emailTextField).toHaveValue('abc@gmail.com')

    const passwordTextfield = screen.getByLabelText('Password')
    fireEvent.change(passwordTextfield, { target: { value: 'abcd@1234' } })
    expect(passwordTextfield).toHaveValue('abcd@1234')

    const buttonElement = screen.getByRole('button', { name: 'Log in' })
    fireEvent.click(buttonElement)
  })
})
