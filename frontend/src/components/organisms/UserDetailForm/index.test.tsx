import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserDetailForm from '.'
import '@testing-library/jest-dom/extend-expect'
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
          <UserDetailForm
            handleContinue={onContinueMock}
            userDetails={{
              firstName: '',
              lastName: '',
              selectedCountry: null,
              selectedDate: null,
              address: '',
              city: '',
              code: '',
            }}
          />
        </YourDetailContext>
      </BrowserRouter>
    )
  }

  test('should update role details correctly', () => {
    renderVerificationForm()

    const firstNameInput = screen.getByLabelText(
      'First Name'
    ) as HTMLInputElement
    const lastNameInput = screen.getByLabelText('Last Name') as HTMLInputElement
    const dobSelector = screen.getByLabelText(
      'Date of Birth'
    ) as HTMLInputElement
    const address = screen.getByLabelText('Home address') as HTMLInputElement
    const city = screen.getByLabelText('City') as HTMLInputElement
    const code = screen.getByLabelText('Postal Code') as HTMLInputElement

    fireEvent.change(firstNameInput, { target: { value: 'Rose' } })
    fireEvent.change(lastNameInput, { target: { value: 'Genner' } })
    fireEvent.change(dobSelector, { target: { value: '07/17/2000' } })
    fireEvent.change(address, { target: { value: '43 Baker Street' } })
    fireEvent.change(city, { target: { value: 'Paris' } })
    fireEvent.change(code, { target: { value: 'BK34 7CG' } })
    expect(firstNameInput).toHaveValue('Rose')
    expect(lastNameInput).toHaveValue('Genner')
    expect(dobSelector).toHaveValue('07/17/2000')
    expect(address).toHaveValue('43 Baker Street')
    expect(city).toHaveValue('Paris')
    expect(code).toHaveValue('BK34 7CG')

    fireEvent.change(dobSelector, { target: { value: '' } })
    expect(dobSelector).toHaveValue('')

    const autocompleteComponent = screen.getByLabelText(
      'Country of residence'
    ) as HTMLInputElement
    expect(autocompleteComponent).toBeInTheDocument()
    fireEvent.keyDown(autocompleteComponent, {
      key: 'ArrowDown',
    })
    waitFor(() => {
      const ukOption = screen.getByText('United Kingdom')
      fireEvent.click(ukOption)
      expect(autocompleteComponent.value).toBe('United Kingdom')
      const option = screen.getByText('Australia')
      fireEvent.click(option)
      expect(autocompleteComponent.value).toBe('')
    })
  })

  test('should not be clickable if no details filled', () => {
    renderVerificationForm()

    fireEvent.click(screen.getByTestId('continue-button'))
    expect(onContinueMock).toHaveBeenCalledTimes(0)
  })

  test('typing in form fields updates state', () => {
    renderVerificationForm()

    fireEvent.change(screen.getByLabelText('First Name'), {
      target: { value: 'John' },
    })
    expect(screen.getByLabelText('First Name')).toHaveValue('John')

    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    })
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe')
  })
  test('selecting a country updates state', () => {
    renderVerificationForm()

    fireEvent.change(screen.getByRole('combobox'))
    expect(screen.getByRole('combobox')).not.toHaveValue()
  })

  test('should give wrong input error', () => {
    renderVerificationForm()
    const firstNameInput = screen.getByLabelText(
      'First Name'
    ) as HTMLInputElement
    fireEvent.change(firstNameInput, { target: { value: '123' } })
    expect(firstNameInput).toHaveValue('123')
  })
})
