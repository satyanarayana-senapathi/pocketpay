import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignUpPage from '.'
import { CREATE_YOUR_POCKET } from '../../utils/constants'
import { BrowserRouter } from 'react-router-dom'
import { useData } from '../../Context/UserContext'

jest.mock('../../Context/UserContext')

describe('SignUpPage component', () => {
  beforeEach(() => {
    const mockUpdateData = jest.fn()
    ;(useData as jest.Mock).mockReturnValue({ updateData: mockUpdateData })

    render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    )
  })
  test('its should renders the icon', () => {
    const frontHeaderElement = screen.getByAltText('pocket-pay')
    expect(frontHeaderElement).toBeInTheDocument()
  })
  test('its should renders heading text', () => {
    const headingText = screen.getByText(CREATE_YOUR_POCKET)
    expect(headingText).toBeInTheDocument()
  })

  
  test('its should renders and fire the onClick', () => {
    const labelText = screen.getByLabelText('Email')
    expect(labelText).toBeInTheDocument()
    fireEvent.change(labelText, { target: { value: 'abc@gmail.com' } })

    const signupButton = screen.getByRole('button', { name: 'Sign up' })
    expect(signupButton).toBeEnabled()
    fireEvent.click(signupButton)
    expect(signupButton).toBeInTheDocument()
  })

  test('it should fire the login text', () => {
    const loginText = screen.getByText('Log in')
    expect(loginText).toBeInTheDocument()
    fireEvent.click(loginText)
    expect(loginText).toBeInTheDocument()
  })
})
