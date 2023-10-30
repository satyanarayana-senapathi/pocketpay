import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AccountVerificationCard from '.'
import '@testing-library/jest-dom/extend-expect'
import {
  AV_LABEL_CATEGORY,
  AV_LABEL_SIZE,
  AV_LABEL_SUBCATEGORY,
} from '../../../utils/constants'
import { BrowserRouter } from 'react-router-dom'
import { YourDetailContext } from '../../../Context/YourDetailContext'

describe('VerificationForm', () => {
  const onContinueMock = jest.fn()

  beforeEach(() => {
    onContinueMock.mockClear()
  })
  const renderVerificationForm = () => {
    render(
      <BrowserRouter>
        <YourDetailContext>
          <AccountVerificationCard
            handleCont={onContinueMock}
            optionDetails={{
              selectedCategory: null,
              selectedSubcategory: null,
              selectedSize: null,
            }}
          />
        </YourDetailContext>
      </BrowserRouter>
    )
  }

  test('should call onContinue correctly', () => {
    renderVerificationForm()

    const button = screen.getByRole('button', { name: 'Continue' })
    fireEvent.click(button)
    expect(onContinueMock).toHaveBeenCalledTimes(1)

    const comboboxOpen = screen.getAllByRole('button', { name: 'Open' })
    fireEvent.click(comboboxOpen[0])
    const categoryOption = screen.getByText('Health, sports or personal care')
    fireEvent.click(categoryOption)

    waitFor(() => {
      fireEvent.click(comboboxOpen[1])
      const subCategoryOption = screen.getByText('Health')
      fireEvent.click(subCategoryOption)
    })

    fireEvent.click(comboboxOpen[2])
    const sizeOption = screen.getByText('1-50')
    fireEvent.click(sizeOption)
  })

  test('subarray should should be empty', () => {
    renderVerificationForm()

    const comboboxOpen = screen.getAllByRole('button', { name: 'Open' })
    fireEvent.click(comboboxOpen[0])
    const categoryOption = screen.getByText('Others')
    fireEvent.click(categoryOption)

    fireEvent.click(comboboxOpen[1])
    const subcategoryInput = screen.getByLabelText(AV_LABEL_SUBCATEGORY)
    expect(subcategoryInput.children.length).toBe(0)
  })

  test('should update subcategory state when handleSubcategoryChange is called', () => {
    renderVerificationForm()
    const categoryInput = screen.getByLabelText(AV_LABEL_CATEGORY)
    const subcategoryInput = screen.getByLabelText(AV_LABEL_SUBCATEGORY)
    const sizeInput = screen.getByLabelText(AV_LABEL_SIZE)
    const role = screen.getAllByRole('combobox')

    fireEvent.click(categoryInput)
    fireEvent.keyDown(categoryInput, { key: 'ArrowDown' })
    const categoryOption = screen.getByText('Health, sports or personal care')
    fireEvent.click(categoryOption)

    expect(categoryInput).toHaveValue('Health, sports or personal care')
    expect(subcategoryInput).toBeInTheDocument()
    expect(sizeInput).toBeInTheDocument()
    expect(role).toBeTruthy()
  })
})
