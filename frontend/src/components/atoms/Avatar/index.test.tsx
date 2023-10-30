import React from 'react'
import { render, screen } from '@testing-library/react'
import CustomAvatar from '.'
import '@testing-library/jest-dom/extend-expect'

describe('AvatarComponent', () => {
  test('image rendered correctly', () => {
    render(<CustomAvatar src="image" alt="example" />)
    const imageElement = screen.getByRole('img')
    expect(imageElement.getAttribute('src')).toBe('image')
    expect(imageElement).toBeInTheDocument()
  })

  test('renders without image if no src is provided', () => {
    render(<CustomAvatar alt="example" />)
    const imageElement = screen.queryByAltText('example')
    expect(imageElement).not.toBeInTheDocument()
  })
})
