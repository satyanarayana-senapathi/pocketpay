import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import BusinessSearch from '.'
import {
  BUSINESS_SEARCH,
  ENTER_DETAILS,
  SEARCH_FOR_BUSINESS,
  SELECT_YOUR_BUSINESS,
} from '../../../utils/constants'

describe('Business search organism', () => {
  const onContinueMock = jest.fn()

  beforeEach(() => {
    onContinueMock.mockClear()
  })

  const renderBusinessSearch = () => {
    render(<BusinessSearch onClick={onContinueMock} />)
  }

  test('text rendering correctly', () => {
    renderBusinessSearch()
    const textElement = screen.getByText(SEARCH_FOR_BUSINESS)
    expect(textElement).toBeInTheDocument()
  })

  test('autocomplete value is changing correctly', () => {
    renderBusinessSearch()
    const autoCompleteElement = screen.getByTestId('auto-complete')
    expect(autoCompleteElement).toBeInTheDocument()
    fireEvent.click(autoCompleteElement)
    const inputFieldElement = screen.getByLabelText(SELECT_YOUR_BUSINESS)
    fireEvent.change(inputFieldElement, { target: { value: 'Zemoso' } })
    const firstOption = screen.getByText(BUSINESS_SEARCH[0].label)
    fireEvent.click(firstOption)
  })

  test('autocomplete when cannot find business is clicked', () => {
    renderBusinessSearch()
    const autoCompleteElement = screen.getByTestId('auto-complete')
    expect(autoCompleteElement).toBeInTheDocument()
    fireEvent.click(autoCompleteElement)
    const inputFieldElement = screen.getByLabelText(SELECT_YOUR_BUSINESS)
    fireEvent.change(inputFieldElement, { target: { value: 'c' } })
    const lastOption = screen.getByText(ENTER_DETAILS)
    fireEvent.click(lastOption)
  })
})
