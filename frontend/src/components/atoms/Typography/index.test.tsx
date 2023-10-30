import React from 'react'
import { render } from '@testing-library/react'
import Typography from './index'
import '@testing-library/jest-dom'

describe('Typography component', () => {
  it('renders the typography component with the provided props', () => {
    const props = {
      variant: 'h1' as const, // Provide a valid variant value
      children: 'Hello, world!',
    }

    const { getByText } = render(<Typography {...props} />)
    const typographyElement = getByText('Hello, world!')

    expect(typographyElement).toBeInTheDocument()
    expect(typographyElement.tagName).toBe('H1')
  })
})
