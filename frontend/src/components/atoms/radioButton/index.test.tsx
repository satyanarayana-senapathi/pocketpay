import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import RadioButton from './index'

describe('RadioButton', () => {
  test('renders on the screen', () => {
    render(<RadioButton />)
    const radioElement = screen.getByRole('radio')
    expect(radioElement).toBeInTheDocument()
  })

  test('onClick is working properly', () => {
    const onChange = jest.fn()
    render(<RadioButton onChange={onChange} />)
    const radioElement = screen.getByRole('radio')
    fireEvent.click(radioElement)
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
