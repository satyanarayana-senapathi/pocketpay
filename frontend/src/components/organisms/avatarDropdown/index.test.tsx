import React from 'react'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AvatarDropdown from '.'
import { AVATAR_DROPDOWN_OPTIONS } from '../../../utils/constants'

describe('Avatar Dropdown organism ', () => {
  test('popup options are closed by default', () => {
    render(<AvatarDropdown dropdownOptions={AVATAR_DROPDOWN_OPTIONS} />)
    const avatarButton = screen.getAllByRole('button')
    expect(avatarButton.length).toBe(1)
  })

  test('popover is opened on click', () => {
    render(<AvatarDropdown dropdownOptions={AVATAR_DROPDOWN_OPTIONS} />)
    const iconButtonElement = screen.getByTestId('avatar-dropdown-button')
    expect(iconButtonElement).toBeInTheDocument()
    fireEvent.click(iconButtonElement)
    const iconElements = screen.getAllByRole('img')
    expect(iconElements.length).toBe(4)
  })

  test('popover option is clicked', () => {
    render(<AvatarDropdown dropdownOptions={AVATAR_DROPDOWN_OPTIONS} />)
    const iconButtonElement = screen.getByTestId('avatar-dropdown-button')
    expect(iconButtonElement).toBeInTheDocument()
    fireEvent.click(iconButtonElement)
    const iconElements = screen.getAllByRole('img')
    expect(iconElements.length).toBe(4)
    fireEvent.click(iconElements[2])
  })

  test('popover is closed onclick', async () => {
    render(<AvatarDropdown dropdownOptions={AVATAR_DROPDOWN_OPTIONS} />)
    const iconButtonElement = screen.getByTestId('avatar-dropdown-button')
    expect(iconButtonElement).toBeInTheDocument()
    fireEvent.click(iconButtonElement)
    const iconElements = screen.getAllByRole('img')
    expect(iconElements.length).toBe(4)
    act(() => {
      userEvent.keyboard('{esc}')
    })
  })
})
