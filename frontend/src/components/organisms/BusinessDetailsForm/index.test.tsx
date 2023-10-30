import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BusinessDetailsForm from '.'
import {
  UDF_label_FirstName,
  UDF_label_LastName,
  UDF_label_option,
} from '../../../utils/constants'
import '@testing-library/jest-dom/extend-expect'
import { SendMoneyContext } from '../../../Context/SendMoneyContext'

describe('BusinessDetailsForm', () => {
  const onContinueMock = jest.fn()

  beforeEach(() => {
    onContinueMock.mockClear()
  })

  const renderVerificationForm = () => {
    render(
      <SendMoneyContext>
        <BusinessDetailsForm
          addRoleButtonText="user"
          formHeading="Verification Form"
          formDescription="Please provide your details"
          roleName="User"
          onContinue={onContinueMock}
          businessData={[
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              selectedCountry: null,
              selectedDate: '07/16/2000',
            },
          ]}
          clearData={true}
        />
      </SendMoneyContext>
    )
  }

  test('should enable the Continue button when all data is valid and error-free', () => {
    const { getByRole } = render(
      <SendMoneyContext>
        <BusinessDetailsForm
          addRoleButtonText="user"
          formHeading="Verification Form"
          formDescription="Please provide your details"
          roleName="User"
          onContinue={onContinueMock}
          businessData={[]}
          clearData={false}
        />
      </SendMoneyContext>
    )

    const continueButton = getByRole('button', { name: 'Continue' })
    expect(continueButton).toBeEnabled()
    fireEvent.click(continueButton)
  })

  test('should update role details correctly on input change', () => {
    renderVerificationForm()

    const firstNameInput = screen.getByLabelText(UDF_label_FirstName)
    const lastNameInput = screen.getByLabelText(UDF_label_LastName)
    const dobSelector = screen.getByLabelText(
      'Date of Birth'
    ) as HTMLInputElement
    fireEvent.change(firstNameInput, { target: { value: 'Rose' } })
    fireEvent.change(lastNameInput, { target: { value: 'Genner' } })
    fireEvent.change(dobSelector, { target: { value: '07/16/2000' } })
    expect(firstNameInput).toHaveValue('Rose')
    expect(lastNameInput).toHaveValue('Genner')
    expect(dobSelector).toHaveValue('07/16/2000')

    const calender = screen.getByTestId('CalendarTodayOutlinedIcon')
    expect(calender).toBeInTheDocument()
    fireEvent.click(calender)

    const autocompleteComponent = screen.getByLabelText(
      UDF_label_option
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

    const continueButton = screen.getByRole('button', { name: 'Continue' })
    fireEvent.click(continueButton)
  })

  test('should disabled the continue button &  display error message on the wrong first/last name input', () => {
    renderVerificationForm()

    const firstNameInput = screen.getByLabelText(UDF_label_FirstName)
    const lastNameInput = screen.getByLabelText(UDF_label_LastName)

    fireEvent.change(firstNameInput, { target: { value: 'Rose1' } })
    fireEvent.change(lastNameInput, { target: { value: 'Genner1' } })

    expect(firstNameInput).toHaveValue('Rose1')
    expect(lastNameInput).toHaveValue('Genner1')

    expect(
      screen.getByText('First Name must contain only alphabetic characters.')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Last Name must contain only alphabetic characters.')
    ).toBeInTheDocument()

    const continueButton = screen.getByRole('button', { name: 'Continue' })
    expect(continueButton).toBeDisabled()
  })

  test('should add a new form to fill details', () => {
    renderVerificationForm()

    const roleAddButton = screen.getByRole('button', {
      name: 'Add another user',
    })
    fireEvent.click(roleAddButton)
    const closeButton = screen.getAllByRole('button', { name: 'close-button' })
    closeButton.forEach((e) => {
      expect(e).toBeDefined()
    })

    const noOfFirstNameLabel = 2
    const firstNameLabels = screen.getAllByLabelText(UDF_label_FirstName)
    expect(firstNameLabels.length).toBe(noOfFirstNameLabel)
  })

  test('should remove newly created form to fill details', () => {
    renderVerificationForm()
    const addRoleButton = screen.getByRole('button', {
      name: 'Add another user',
    })
    fireEvent.click(addRoleButton)

    const noOfFirstNameLabel = 2
    const firstNameLabels = screen.getAllByLabelText(UDF_label_FirstName)

    expect(firstNameLabels.length).toBe(noOfFirstNameLabel)
    const removeBtn = screen.getByRole('button', { name: 'close-button' })
    fireEvent.click(removeBtn)
    waitFor(() => {
      expect(firstNameLabels.length).toBe(1)
    })
  })
})
