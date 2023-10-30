import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SelectingPurpose from '.'
import '@testing-library/jest-dom/extend-expect'
import { SP_LABEL_OPTION } from '../../../utils/constants'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

describe('SelectingPurpose', () => {
  const onContinueMock = jest.fn()

  beforeEach(() => {
    onContinueMock.mockClear()
  })

  const renderSelectingPurpose = () => {
    render(
      <SendMoneyContext>
        <SelectingPurpose
          handleClick={onContinueMock}
          optionDetails={{
            selectedPurpose: null,
          }}
        />
      </SendMoneyContext>
    )
  }

  test('should select options correctly', () => {
    renderSelectingPurpose()

    const autocompleteComponent = screen.getByLabelText(
      SP_LABEL_OPTION
    ) as HTMLInputElement
    expect(autocompleteComponent).toBeInTheDocument()
    fireEvent.keyDown(autocompleteComponent, {
      key: 'ArrowDown',
    })
    waitFor(() => {
      const optionOne = screen.getByText(
        'Paying rent, utilities or property charges'
      )
      fireEvent.click(optionOne)
      expect(autocompleteComponent.value).toBe(
        'Paying rent, utilities or property charges'
      )
      const optionTwo = screen.getByText(
        'Paying suppliers/contractors/employees'
      )
      fireEvent.click(optionTwo)
      expect(autocompleteComponent.value).toBe(
        'Paying suppliers/contractors/employees'
      )
    })
  })

  test('should call onContinue correctly', () => {
    renderSelectingPurpose()

    const button = screen.getByRole('button', { name: 'Continue' })
    fireEvent.click(button)
    expect(onContinueMock).toHaveBeenCalledTimes(1)
  })

  test('selecting combobox', () => {
    renderSelectingPurpose()

    fireEvent.change(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).not.toHaveValue()
  })
})
