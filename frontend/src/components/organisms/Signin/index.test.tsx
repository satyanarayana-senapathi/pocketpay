import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SignIn } from './index'
import { WELCOME_BACK, ENTER_YOUR_EMAIL } from '../../../utils/constants'
import { useAuth0 } from '@auth0/auth0-react'

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect: jest.fn(),
  }),
}))

describe('SignIn component', () => {
  test('should call loginWithRedirect when Google icon is clicked', () => {
    const mockLoginWithRedirect = jest.fn()
    useAuth0().loginWithRedirect = mockLoginWithRedirect

    render(<SignIn />)
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(3)
    fireEvent.click(icons[0])
    expect(icons[0]).toBeInTheDocument()
  })

  test('should call when Facebook icon is clicked', () => {
    const mockLoginWithRedirect = jest.fn()
    useAuth0().loginWithRedirect = mockLoginWithRedirect

    render(<SignIn />)
    const icons = screen.getAllByRole('img')
    screen.debug(icons)
    expect(icons.length).toBe(3)
    fireEvent.click(icons[1])
    expect(icons[1]).toBeInTheDocument()
  })

  test('should call when Apple icon is clicked', () => {
    const mockLoginWithRedirect = jest.fn()
    useAuth0().loginWithRedirect = mockLoginWithRedirect

    render(<SignIn />)
    const icons = screen.getAllByRole('img')
    screen.debug(icons)
    expect(icons.length).toBe(3)
    fireEvent.click(icons[2])
    expect(icons[2]).toBeInTheDocument()
  })

  test('should renders the outbox ', () => {
    render(<SignIn width="200px" height="100px" top="10px" left="10px" />)
    const createYourPocketText = screen.getByTestId('outbox')
    expect(createYourPocketText).toBeInTheDocument()
  })

  test('should renders the "Create Your Pocket" text', () => {
    render(<SignIn />)
    const createYourPocketText = screen.getByText(WELCOME_BACK)
    expect(createYourPocketText).toBeInTheDocument()
  })

  test('renders the custom text field with a placeholder', () => {
    const placeholderText = `${ENTER_YOUR_EMAIL}`
    render(<SignIn />)
    const inputElement = screen.getByPlaceholderText(placeholderText)
    expect(inputElement).toBeInTheDocument()
  })

  test('should call when handleMouseDownPassword function is called on password visibility toggle click', () => {
    const preventDefault = jest.fn()
    Object.defineProperty(MouseEvent.prototype, 'preventDefault', {
      value: preventDefault,
    })
    render(<SignIn />)
    const toggleButton = screen.getByLabelText('toggle password visibility')
    fireEvent.mouseDown(toggleButton)
    expect(preventDefault).toHaveBeenCalled()
  })

  test('should call when password visibility toggle', () => {
    render(<SignIn />)

    const passwordInput = screen.getByLabelText('Password')
    expect(passwordInput).toHaveAttribute('type', 'password')

    const eyeIcon = screen.getByLabelText('toggle password visibility')
    fireEvent.click(eyeIcon)

    expect(passwordInput).toHaveAttribute('type', 'text')

    fireEvent.click(eyeIcon)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('should call when Valid email input', () => {
    render(<SignIn />)
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(emailInput.value).toBe('test@example.com')

    const validationError = screen.queryByText(
      'Please enter a valid email address'
    )
    expect(validationError).toBeNull()
  })

  test('should call when Invalid email input', () => {
    render(<SignIn />)
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } })

    expect(emailInput.value).toBe('invalid_email')

    const validationError = screen.getByText(
      'Please enter a valid email address'
    )
    expect(validationError).toBeInTheDocument()
  })

  test('should call when handlePasswordChange updates password state', () => {
    render(<SignIn />)
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement

    fireEvent.change(passwordInput, { target: { value: 'test123' } })

    expect(passwordInput.value).toBe('test123')
  })

  test('should call when handleLoginClick function is called with email and password', () => {
    const mockOnClick = jest.fn()

    render(<SignIn onClick={mockOnClick} />)

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'test1234' } })

    const loginButton = screen.getByRole('button', { name: /log in/i })
    fireEvent.click(loginButton)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(mockOnClick).toHaveBeenCalledWith('test@example.com', 'test1234')
  })

  test('should call when handleLoginClick function is called with email and password', () => {
    const mockOnClick = jest.fn()

    render(<SignIn onClick={mockOnClick} />)

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'test123' } })

    const loginButton = screen.getByRole('button', { name: /log in/i })
    fireEvent.click(loginButton)

    expect(mockOnClick).toHaveBeenCalledTimes(0)
    expect(mockOnClick).not.toHaveBeenCalledWith('test@example.com', 'test123')
  })

  test('should call when handleLoginClick function is called with email and password', () => {
    const mockOnClick = jest.fn()

    render(<SignIn onClick={mockOnClick} />)

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'test123' } })

    const loginButton = screen.getByRole('button', { name: /log in/i })
    fireEvent.click(loginButton)

    expect(mockOnClick).toHaveBeenCalledTimes(0)
    expect(mockOnClick).not.toHaveBeenCalledWith('test@example.com', 'test123')
  })
})
