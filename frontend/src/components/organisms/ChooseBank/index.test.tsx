import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ChooseBank from '.'
import '@testing-library/jest-dom'
import {
  CB_CANCEL,
  CB_HEADER,
  CB_HEADING,
  CB_LABEL_TEXT,
  CB_NO,
  CB_YES,
  ChooseBank_Values,
} from '../../../utils/constants'

describe('ChooseBank component', () => {
  const mockOptionClick = jest.fn()
  const mockModalClick = jest.fn()

  beforeEach(() => {
    render(
      <ChooseBank
        onOptionClick={mockOptionClick}
        onModalClick={mockModalClick}
      />
    )
  })

  test('renders header text', () => {
    const headerText = screen.getByText(CB_HEADER)
    expect(headerText).toBeInTheDocument()
  })

  test('renders all bank options', () => {
    const bankOptions = screen.getAllByRole('button', {
      name: /icon State bank of India|icon HDFC|icon HSBC|icon Axis|icon Lloyds|icon Other bank/,
    })
    expect(bankOptions).toHaveLength(ChooseBank_Values.length)
  })

  test('filters bank options based on search query', () => {
    const searchInput = screen.getByLabelText(CB_LABEL_TEXT)
    fireEvent.change(searchInput, {
      target: { value: 'icon State bank of India' },
    })
    expect(searchInput).toHaveValue('icon State bank of India')
  })

  test('calls onOptionClick when an option is clicked', () => {
    const bankOption = screen.getByRole('button', {
      name: 'icon Lloyds',
    })
    fireEvent.click(bankOption)
    expect(mockOptionClick).toHaveBeenCalledTimes(1)
  })

  test('displays modal when "Cancel Transfer" is clicked', () => {
    const cancelButton = screen.getByRole('button', {
      name: CB_CANCEL,
    })
    fireEvent.click(cancelButton)
    const modalHeading = screen.getByText(CB_HEADING)
    expect(modalHeading).toBeInTheDocument()
  })

  test('calls onModalClick when "Yes" is clicked in the modal', () => {
    const cancelButton = screen.getByRole('button', {
      name: CB_CANCEL,
    })
    fireEvent.click(cancelButton)

    const yesButton = screen.getByText(CB_YES)
    fireEvent.click(yesButton)
    expect(mockModalClick).toHaveBeenCalledTimes(1)
  })

  test('closes the modal when "No" is clicked in the modal', () => {
    const cancelButton = screen.getByRole('button', {
      name: CB_CANCEL,
    })
    fireEvent.click(cancelButton)

    const noButton = screen.getByText(CB_NO)
    fireEvent.click(noButton)

    const modalHeading = screen.queryByText(CB_HEADING)
    expect(modalHeading).not.toBeInTheDocument()
  })

  test('displays disabled bank options correctly', () => {
    const disabledBankOption = screen.getByRole('button', { name: 'icon HDFC' })
    expect(disabledBankOption).toBeDisabled()
  })
})
