import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DateSelector from '.'
import '@testing-library/jest-dom/extend-expect'

describe('DateSelector', () => {
  const onChange = jest.fn()

  it('should render without errors', () => {
    render(
      <DateSelector
        onChange={() => {
          console.log('Renders DateSelector')
        }}
        value={new Date()}
      />
    )
    const dateSelector = screen.getByLabelText(
      'Date of Birth'
    ) as HTMLInputElement
    expect(dateSelector).toBeInTheDocument()
  })

  it('should update the value when a date is selected', () => {
    render(<DateSelector onChange={onChange} value={new Date()} />)
    const dateSelector = screen.getByLabelText(
      'Date of Birth'
    ) as HTMLInputElement
    fireEvent.change(dateSelector, { target: { value: '07/17/2023' } })
    expect(dateSelector.value).toBe('07/17/2023')
    fireEvent.change(dateSelector, { target: { value: '' } })
  })
})
