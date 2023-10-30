import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react'
import RecipientType from '.'
import { RECIPEINT_TYPE_VALUES } from '../../../utils/constants'

describe('Recipient Type molecule', () => {
  test('Icons rendering correctly', () => {
    render(
      <RecipientType cardId={3} padding="14px" labels={RECIPEINT_TYPE_VALUES} />
    )
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(3)
  })
  test('onClick working correctly', () => {
    const mockHandleClick = jest.fn()
    render(
      <RecipientType
        cardId={3}
        padding="14px"
        labels={RECIPEINT_TYPE_VALUES}
        handleClick={mockHandleClick}
      />
    )
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(3)

    const clickableIcon = screen.getByAltText('dollar logo')
    expect(clickableIcon).toBeInTheDocument()
    fireEvent.click(clickableIcon)
    expect(mockHandleClick).toBeCalled()
  })
})
