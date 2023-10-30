import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import ApproveAnotherWay from '.'
import {
  APPROVE_ANOTHER_WAY,
  USE_DIFFERENT_PHONE_NUMBER,
} from '../../../utils/constants'

describe('Approve another way organism working correctly', () => {
  test('text rendering correctly', () => {
    render(<ApproveAnotherWay />)
    const textElement = screen.getByText(APPROVE_ANOTHER_WAY)
    expect(textElement).toBeInTheDocument()
  })

  test('onclick working correctly', () => {
    render(<ApproveAnotherWay />)
    const clickableElement = screen.getByText(USE_DIFFERENT_PHONE_NUMBER)
    expect(clickableElement).toBeInTheDocument()
    fireEvent.click(clickableElement)
  })
})
