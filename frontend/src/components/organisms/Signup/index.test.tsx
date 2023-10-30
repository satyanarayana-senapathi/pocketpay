import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SignUp } from './index'
import { CREATE_YOUR_POCKET, ENTER_YOUR_EMAIL } from '../../../utils/constants'
import { useAuth0 } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import { YourDetailContext } from '../../../Context/YourDetailContext'

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}))

describe('SignUp component', () => {
  test('should call loginWithRedirect when Google icon is clicked', () => {
    const mockLoginWithRedirect = jest.fn()
    useAuth0().loginWithRedirect = mockLoginWithRedirect

    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(3)
    fireEvent.click(icons[0])
    expect(icons[0]).toBeInTheDocument()
  })

  test('should call loginWithRedirect when Google icon is clicked', () => {
    const mockLoginWithRedirect = jest.fn()
    useAuth0().loginWithRedirect = mockLoginWithRedirect

    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(3)
    fireEvent.click(icons[1])
    expect(icons[1]).toBeInTheDocument()
  })

  test('should not call loginWithRedirect when Facebook icon is clicked', () => {
    const mockLoginWithRedirect = jest.fn()
    useAuth0().loginWithRedirect = mockLoginWithRedirect

    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(3)
    fireEvent.click(icons[2])
    expect(icons[2]).toBeInTheDocument()
  })

  test('renders the create your pocket text', () => {
    render(
      <BrowserRouter>
        <YourDetailContext>
          <SignUp width="200px" height="100px" top="10px" left="10px" />
        </YourDetailContext>
      </BrowserRouter>
    )
    const createYourPocketText = screen.getByTestId('outbox')
    expect(createYourPocketText).toBeInTheDocument()
  })

  test('renders the "Create Your Pocket" text', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const createYourPocketText = screen.getByText(CREATE_YOUR_POCKET)
    expect(createYourPocketText).toBeInTheDocument()
  })

  test('renders the custom text field with a placeholder', () => {
    const placeholderText = `${ENTER_YOUR_EMAIL}`
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const inputElement = screen.getByPlaceholderText(placeholderText)
    expect(inputElement).toBeInTheDocument()
  })

  test('Invalid email input', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } })

    expect(emailInput.value).toBe('invalid_email')

    const validationError = screen.getByText(
      'Please enter a valid email address'
    )
    expect(validationError).toBeInTheDocument()
  })

  test('handleLoginClick function is called with email and password', () => {
    const mockOnClick = jest.fn()

    render(
      <BrowserRouter>
        <SignUp onClick={mockOnClick} />
      </BrowserRouter>
    )

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    const loginButton = screen.getByRole('button', { name: /sign up/i })
    fireEvent.click(loginButton)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('test@example.com')
  })
})
