import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {
  SIDEBAR_BALANCE_VALUES,
  SIDEBAR_VALUES,
} from '../../../utils/constants'
import Sidebar from '.'

describe('Sidebar', () => {
  const handleClickMock = jest.fn()

  afterEach(() => {
    handleClickMock.mockClear()
  })

  test('renders the Sidebar component', () => {
    render(<Sidebar showDetail={true} handleClick={handleClickMock} />)

    const buttons = screen.getAllByRole('button')
    const numberOfButtons =
      SIDEBAR_VALUES.length + SIDEBAR_BALANCE_VALUES.length
    expect(buttons).toHaveLength(numberOfButtons)
  })

  test('calls handleClick when a button is clicked', () => {
    render(<Sidebar showDetail={true} handleClick={handleClickMock} />)

    const buttons = screen.getAllByRole('button')

    buttons.forEach((button) => {
      fireEvent.click(button)
      expect(handleClickMock).toHaveBeenCalledTimes(1)
    })
  })

  test('disables the button when value.disabled is true', () => {
    render(<Sidebar showDetail={true} handleClick={handleClickMock} />)

    const buttons = screen.getAllByRole('button')

    SIDEBAR_VALUES.forEach((value, index) => {
      if (value.disabled) {
        expect(buttons[index]).toBeDisabled()
      } else {
        expect(buttons[index]).not.toBeDisabled()
      }
    })
  })
})
