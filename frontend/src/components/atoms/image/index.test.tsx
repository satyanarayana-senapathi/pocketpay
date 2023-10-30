import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react'
import React from 'react'
import Image from '.'

const url = './assets/image/shareLink.svg'
const alt = 'Share tracking link'

describe('Image component', () => {
  test('image is rendering correctly', () => {
    render(<Image source={url} alt={alt} />)
    const imgElement = screen.getByRole('img')
    expect(imgElement).toBeInTheDocument()
  })
  test('image alt text is rendering correctly', () => {
    render(<Image source={url} alt={alt} />)
    const imgElement = screen.getByRole('img')
    expect(imgElement).toHaveAttribute('alt', alt)
  })
})
