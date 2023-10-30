import React from 'react'
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import ShareTrackingModal from '.'
import { EMAIL, SHARE_LINK_ABOVE } from '../../../utils/constants'
import userEvent from '@testing-library/user-event'

describe('Share tracking modal organism', () => {
  test('modal working correctly', () => {
    render(<ShareTrackingModal />)
    const iconButtonElement = screen.getByTestId('modal-open-button')
    expect(iconButtonElement).toBeInTheDocument()
    fireEvent.click(iconButtonElement)
    const textElement = screen.getByText(EMAIL)
    expect(textElement).toBeInTheDocument()
  })

  test('modal closing when clicked', () => {
    render(<ShareTrackingModal />)
    const iconButtonElement = screen.getByTestId('modal-open-button')
    fireEvent.click(iconButtonElement)
    act(() => {
      userEvent.keyboard('{esc}')
    })
  })

  test('modal rendering correctly with all images', () => {
    render(<ShareTrackingModal />)
    const iconButtonElement = screen.getByTestId('modal-open-button')
    fireEvent.click(iconButtonElement)
    const imageElements = screen.getAllByRole('img')
    expect(imageElements.length).toBe(3)
    const textElement = screen.getByText(SHARE_LINK_ABOVE)
    expect(textElement).toBeInTheDocument()
  })
})
