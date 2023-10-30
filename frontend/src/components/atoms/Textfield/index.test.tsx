import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomTextField from './index'
import '@testing-library/jest-dom/extend-expect'

describe('CustomTextField', () => {
  test('renders with provided label', () => {
    render(<CustomTextField label="Test Label" />)

    const labelElement = screen.getByLabelText('Test Label')
    expect(labelElement).toBeInTheDocument()
  })

  test('updates input value when changed', () => {
    render(<CustomTextField />)

    const inputElement = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(inputElement, { target: { value: 'New Value' } })

    expect(inputElement.value).toBe('New Value')
  })
})
