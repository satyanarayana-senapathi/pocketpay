import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import CancelTransferModal from '.'
import {
  AN_EXISTING_ACCOUNT,
  CANCEL_THE_TRANSFER,
  CANCEL_TRANSFER_BUTTON,
  ROSS_GENER,
  SELECT_AN_OPTION,
  WHERE_WOULD_YOU_LIKE_TO_REFUND,
} from '../../../utils/constants'

describe('Cancel transfer working correctly', () => {
  const onContinueMock = jest.fn()

  afterEach(() => {
    onContinueMock.mockClear()
  })

  const renderCancelTransferModal = () => {
    render(<CancelTransferModal handleCancelTransfer={onContinueMock} />)
  }

  test('text rendering correctly', () => {
    renderCancelTransferModal()
    const buttonElement = screen.getByRole('button', {
      name: CANCEL_THE_TRANSFER,
    })
    expect(buttonElement).toBeInTheDocument()
    fireEvent.click(buttonElement)
    const textElement = screen.getByText(WHERE_WOULD_YOU_LIKE_TO_REFUND)
    expect(textElement).toBeInTheDocument()
  })

  test('select component working correct', () => {
    renderCancelTransferModal()
    const buttonElement = screen.getByRole('button', {
      name: CANCEL_THE_TRANSFER,
    })
    fireEvent.click(buttonElement)
    const existingAccountElement = screen.getByText(AN_EXISTING_ACCOUNT)
    expect(existingAccountElement).toBeInTheDocument()
    fireEvent.click(existingAccountElement)
    const selectElement = screen.getByLabelText(SELECT_AN_OPTION)
    expect(selectElement).toBeInTheDocument()
    fireEvent.mouseDown(selectElement)
    const nameElement = screen.getAllByText(ROSS_GENER)
    expect(nameElement.length).toBe(2)
    fireEvent.click(nameElement[0])
    const button = screen.queryByRole('button', {
      name: CANCEL_TRANSFER_BUTTON,
    })
    waitFor(() => {
      expect(button).toBeInTheDocument()
    })
  })

  test('selecting 2nd select option working correct', () => {
    renderCancelTransferModal()
    const buttonElement = screen.getByRole('button', {
      name: CANCEL_THE_TRANSFER,
    })
    fireEvent.click(buttonElement)
    const existingAccountElement = screen.getByText(AN_EXISTING_ACCOUNT)
    expect(existingAccountElement).toBeInTheDocument()
    fireEvent.click(existingAccountElement)
    const selectElement = screen.getByLabelText(SELECT_AN_OPTION)
    expect(selectElement).toBeInTheDocument()
    fireEvent.mouseDown(selectElement)
    const nameElement = screen.getAllByText(ROSS_GENER)
    expect(nameElement.length).toBe(2)
    fireEvent.click(nameElement[1])
    const button = screen.queryByRole('button', {
      name: CANCEL_TRANSFER_BUTTON,
    })
    waitFor(() => {
      expect(button).toBeInTheDocument()
    })
  })

  test('modal is closed on button click', () => {
    renderCancelTransferModal()
    const buttonElement = screen.getByRole('button', {
      name: CANCEL_THE_TRANSFER,
    })
    fireEvent.click(buttonElement)
    const existingAccountElement = screen.getByText(AN_EXISTING_ACCOUNT)
    expect(existingAccountElement).toBeInTheDocument()
    fireEvent.click(existingAccountElement)
    const selectElement = screen.getByLabelText(SELECT_AN_OPTION)
    expect(selectElement).toBeInTheDocument()
    fireEvent.mouseDown(selectElement)
    const nameElement = screen.getAllByText(ROSS_GENER)
    expect(nameElement.length).toBe(2)
    fireEvent.click(nameElement[0])
    const button = screen.getByRole('button', { name: CANCEL_TRANSFER_BUTTON })
    waitFor(() => {
      expect(button).toBeInTheDocument()
      fireEvent.click(button)
    })
    expect(existingAccountElement).not.toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  })
})
