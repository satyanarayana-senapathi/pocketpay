import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CreatePassword from '.'
import {
  CONTINUE,
  CREATE_YOUR_PASSWORD,
  ENTER_YOUR_PASSWORD,
} from '../../../utils/constants'
import { useData } from '../../../Context/UserContext'
import { BrowserRouter } from 'react-router-dom'
import { evaluatePasswordStrength } from './passwordValidation'

jest.mock('../../../Context/UserContext')

describe('DropdownTypography', () => {
  beforeEach(() => {
    const mockUpdateData = jest.fn()
    ;(useData as jest.Mock).mockReturnValue({ updateData: mockUpdateData })

    render(
      <BrowserRouter>
        <CreatePassword />
      </BrowserRouter>
    )
  })

  test('text element is rendering correctly', () => {
    const textElement = screen.getByText(CREATE_YOUR_PASSWORD)
    expect(textElement).toBeInTheDocument()
  })
  test('password icons changing when clicked', async () => {
    const iconElement = screen.getByRole('img')
    waitFor(() => {
      expect(iconElement).toHaveAttribute('src', 'eyeOpenLite.svg')
    })
  })

  test('password icons changing when clicked', async () => {
    const iconButton = screen.getByTestId('password-iconbutton')
    const iconElement = screen.getByRole('img')
    waitFor(() => {
      expect(iconElement).toHaveAttribute('src', 'eyeOpenLite.svg')
    })
    expect(iconButton).toBeInTheDocument()
    fireEvent.click(iconButton)
    waitFor(() => {
      expect(iconElement).toHaveAttribute('src', 'eyeclosed.svg')
    })
  })
  test('textfield value changing correctly', () => {
    const textFieldElement = screen.getByLabelText(ENTER_YOUR_PASSWORD)
    expect(textFieldElement).toBeInTheDocument()
    fireEvent.change(textFieldElement, { target: { value: 'abc' } })
    expect(textFieldElement).toHaveValue('abc')
    fireEvent.change(textFieldElement, { target: { value: '' } })
    expect(textFieldElement).toHaveValue('')
  })

  test('button is disabled by default', () => {
    const buttonElement = screen.getByRole('button', { name: CONTINUE })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeDisabled()
  })

  test('it should contains proper validation', () => {
    const textFieldElement = screen.getByLabelText(ENTER_YOUR_PASSWORD)
    expect(textFieldElement).toBeInTheDocument()
    fireEvent.change(textFieldElement, { target: { value: 'Abcd@1234' } })
    const buttonElement = screen.getByRole('button', { name: CONTINUE })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toBeEnabled()
  })

  test('it should not contains special character', () => {
    const textFieldElement = screen.getByLabelText(ENTER_YOUR_PASSWORD)
    expect(textFieldElement).toBeInTheDocument()
    fireEvent.change(textFieldElement, { target: { value: 'Abcd1234' } })
    const validationMessage = evaluatePasswordStrength('Abcd1234')
    expect(validationMessage).toContain(
      'Password should contain at least one special character'
    )
  })

  test('it should not contains numeric character', () => {
    const textFieldElement = screen.getByLabelText(ENTER_YOUR_PASSWORD)
    expect(textFieldElement).toBeInTheDocument()
    fireEvent.change(textFieldElement, { target: { value: 'Abcdefg@sdfsd' } })
    const validationMessage = evaluatePasswordStrength('Abcdefg@sdfsd')
    expect(validationMessage).toContain(
      'Password should contain at least one number (0-9)'
    )
  })
  test('it should not contains small character', () => {
    const textFieldElement = screen.getByLabelText(ENTER_YOUR_PASSWORD)
    expect(textFieldElement).toBeInTheDocument()
    fireEvent.change(textFieldElement, { target: { value: 'ABCDE@1234' } })
    const validationMessage = evaluatePasswordStrength('ABCDE@1234')
    expect(validationMessage).toContain(
      'Password should contain at least one lowercase letter'
    )
  })
  test('it should not contains capital character', () => {
    const textFieldElement = screen.getByLabelText(ENTER_YOUR_PASSWORD)
    expect(textFieldElement).toBeInTheDocument()
    fireEvent.change(textFieldElement, { target: { value: 'abcde@1234' } })
    const validationMessage = evaluatePasswordStrength('abcde@1234')
    expect(validationMessage).toContain(
      'Password should contain at least one uppercase letter'
    )
  })
})
