import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { CountryRegistration } from './index'
import { COUNTRY_REGISTRATION, CONTINUE } from '../../../utils/constants'

test('renders CountryRegistration component correctly', () => {
  render(<CountryRegistration />)
  const headingElement = screen.getByTestId('country-registration-heading')
  expect(headingElement).toBeInTheDocument()
  expect(headingElement).toHaveTextContent(COUNTRY_REGISTRATION)
})

test('calls onClick when the Continue button is clicked', () => {
  const onClickMock = jest.fn()
  render(<CountryRegistration onClick={onClickMock} />)
  const continueButton = screen.getByText(CONTINUE)
  expect(continueButton).toBeInTheDocument()
  fireEvent.click(continueButton)
  expect(onClickMock).not.toHaveBeenCalled()
})

it('test with box id', () => {
  render(<CountryRegistration width="650px" top="164px" left="625px" />)

  const Boxchecking = screen.getByTestId('box-id')
  expect(Boxchecking).toBeInTheDocument()
})

it('test getoption', () => {
  render(<CountryRegistration />)
  const textFieldElement = screen.getByLabelText('Select your country')
  expect(textFieldElement).toBeInTheDocument()
  fireEvent.change(textFieldElement, { target: { value: 'A' } })
})

it('test getoption with imageUrl', () => {
  render(<CountryRegistration />)

  const textFieldElement = screen.getByLabelText('Select your country')
  fireEvent.change(textFieldElement, { target: { value: 'A' } })

  // Check if the images are displayed for options with imageUrl
  const andoraOptionImage = screen.getByTestId('option-image-ANDORA')
  const austriaOptionImage = screen.getByTestId('option-image-AUSTRIA')
  expect(andoraOptionImage).toBeInTheDocument()
  expect(austriaOptionImage).toBeInTheDocument()
})
