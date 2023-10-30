import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import MoneySendingFlowPage from '.'
import { SendMoneyContext } from '../../Context/SendMoneyContext'
import { BrowserRouter } from 'react-router-dom'
import {
  ACCOUNT_NUMBER,
  CC_CONTINUE,
  CC_LABEL_RECEIVE,
  CC_LABEL_SEND,
  EMAIL,
  FIRST_NAME,
  IFSC,
  LAST_NAME,
  RECIPEINT_TYPE,
  RECIPEINT_TYPE_VALUES,
  SELECT_ACCOUNT_TYPE,
  UDF_label_FirstName,
  currencies,
  SAVING,
  CONTINUE,
  CONFIRM_AND_CONTINUE,
  SP_OPTIONS,
  SP_LABEL_OPTION,
  CONFIRM_BUSINESS_OWNERS,
  CONFIRM_YOUR_BUSINESS_DIRECTORS,
  UDF_COUNTRY_OPTIONS,
  UDF_label_LastName,
  UDF_label_option,
  REVIEW_DETAILS_OF_TRANSFER,
  CHOOSE_YOUR_TRANSFER_TYPE,
  CONTINUE_TO_PAY,
  CVV,
  CONFIRM_YOUR_PURCHASE,
  CB_LABEL_TEXT,
  PD_HEADER,
  BANK_CARD_VALUES,
} from '../../utils/constants'
import axios from 'axios'

jest.mock('axios')

describe('money sending flow working correctly', () => {
  const mockApiResponse = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      dob: '1990-01-01',
      country_of_residency: 'USA',
      type: 'director',
    },
    {
      id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      dob: '1985-05-15',
      country_of_residency: 'Canada',
      type: 'stakeholder',
    },
  ]

  // Mocked axios.get using Jest
  jest.spyOn(axios, 'get').mockResolvedValue({ data: mockApiResponse })
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SendMoneyContext>
          <MoneySendingFlowPage />
        </SendMoneyContext>
      </BrowserRouter>
    )
  })

  afterEach(() => {
    cleanup()
  })

  test('account card component rendering correctly', () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const closeIconButtons = screen.getAllByRole('button')
    fireEvent.click(closeIconButtons[1])
  })

  test('curency conversion rendering correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    // this block of tests start here

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
  })

  test('recipient type component rendering correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])

    // this block of tests start here

    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)
  })

  test('receipient details card renders correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])

    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)

    // this block of tests start here

    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })

    const accountNoTextField = screen.getByLabelText(ACCOUNT_NUMBER)
    fireEvent.change(accountNoTextField, { target: { value: '1234' } })

    const firstNameTextField = screen.getByLabelText(FIRST_NAME)
    fireEvent.change(firstNameTextField, { target: { value: 'john' } })

    const lastNameTextField = screen.getByLabelText(LAST_NAME)
    fireEvent.change(lastNameTextField, { target: { value: 'roy' } })

    const ifscTextField = screen.getByLabelText(IFSC)
    fireEvent.change(ifscTextField, { target: { value: 'abc' } })

    const accountTypeDropdown = screen.getByLabelText(SELECT_ACCOUNT_TYPE)

    const iconButtonElement = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement)

    const savingAccount = screen.getByText(SAVING)
    fireEvent.click(savingAccount)
    expect(accountTypeDropdown).toHaveValue(SAVING)

    const continueButton2 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton2).toBeEnabled()
    await fireEvent.click(continueButton2)
  })

  test('selecting purpose of pocketPay rendering correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])

    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)

    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })

    const accountNoTextField = screen.getByLabelText(ACCOUNT_NUMBER)
    fireEvent.change(accountNoTextField, { target: { value: '1234' } })

    const firstNameTextField = screen.getByLabelText(FIRST_NAME)
    fireEvent.change(firstNameTextField, { target: { value: 'john' } })

    const lastNameTextField = screen.getByLabelText(LAST_NAME)
    fireEvent.change(lastNameTextField, { target: { value: 'roy' } })

    const ifscTextField = screen.getByLabelText(IFSC)
    fireEvent.change(ifscTextField, { target: { value: 'abc' } })

    const accountTypeDropdown = screen.getByLabelText(SELECT_ACCOUNT_TYPE)

    const iconButtonElement = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement)

    const savingAccount = screen.getByText(SAVING)
    fireEvent.click(savingAccount)
    expect(accountTypeDropdown).toHaveValue(SAVING)

    const continueButton2 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton2).toBeEnabled()
    await fireEvent.click(continueButton2)

    // this block of tests start here

    const selectTextFeild = screen.getByLabelText(SP_LABEL_OPTION)

    const iconButtonElement2 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement2)

    const payingForGoods = screen.getByText(SP_OPTIONS[2].label)
    fireEvent.click(payingForGoods)
    expect(selectTextFeild).toHaveValue(SP_OPTIONS[2].label)

    const continueButton3 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton3).toBeEnabled()
    await fireEvent.click(continueButton3)
  })

  test('confirm business details rendering corerectly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])

    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)

    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })

    const accountNoTextField = screen.getByLabelText(ACCOUNT_NUMBER)
    fireEvent.change(accountNoTextField, { target: { value: '1234' } })

    const firstNameTextField = screen.getByLabelText(FIRST_NAME)
    fireEvent.change(firstNameTextField, { target: { value: 'john' } })

    const lastNameTextField = screen.getByLabelText(LAST_NAME)
    fireEvent.change(lastNameTextField, { target: { value: 'roy' } })

    const ifscTextField = screen.getByLabelText(IFSC)
    fireEvent.change(ifscTextField, { target: { value: 'abc' } })

    const accountTypeDropdown = screen.getByLabelText(SELECT_ACCOUNT_TYPE)

    const iconButtonElement = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement)

    const savingAccount = screen.getByText(SAVING)
    fireEvent.click(savingAccount)
    expect(accountTypeDropdown).toHaveValue(SAVING)

    const continueButton2 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton2).toBeEnabled()
    await fireEvent.click(continueButton2)

    const selectTextFeild = screen.getByLabelText(SP_LABEL_OPTION)

    const iconButtonElement2 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement2)

    const payingForGoods = screen.getByText(SP_OPTIONS[2].label)
    fireEvent.click(payingForGoods)
    expect(selectTextFeild).toHaveValue(SP_OPTIONS[2].label)

    const continueButton3 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton3).toBeEnabled()
    await fireEvent.click(continueButton3)

    // this block of tests start here

    const confirmBusinessDirectors = screen.getByText(
      CONFIRM_YOUR_BUSINESS_DIRECTORS
    )
    expect(confirmBusinessDirectors).toBeInTheDocument()

    const firstNameTextField2 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField2, { target: { value: 'Ross' } })
    expect(firstNameTextField2).toHaveValue('Ross')

    const lastNameTextField2 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField2, { target: { value: 'Gener' } })
    expect(lastNameTextField2).toHaveValue('Gener')

    const iconButtonElement3 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement3)

    const countryTextfields = screen.getAllByLabelText(UDF_label_option)

    const indiaElement = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement)
    expect(countryTextfields[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton4 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton4).toBeEnabled()
    await fireEvent.click(continueButton4)
  })

  test('confirm business owners component rendering correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])

    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)

    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })

    const accountNoTextField = screen.getByLabelText(ACCOUNT_NUMBER)
    fireEvent.change(accountNoTextField, { target: { value: '1234' } })

    const firstNameTextField = screen.getByLabelText(FIRST_NAME)
    fireEvent.change(firstNameTextField, { target: { value: 'john' } })

    const lastNameTextField = screen.getByLabelText(LAST_NAME)
    fireEvent.change(lastNameTextField, { target: { value: 'roy' } })

    const ifscTextField = screen.getByLabelText(IFSC)
    fireEvent.change(ifscTextField, { target: { value: 'abc' } })

    const accountTypeDropdown = screen.getByLabelText(SELECT_ACCOUNT_TYPE)

    const iconButtonElement = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement)

    const savingAccount = screen.getByText(SAVING)
    fireEvent.click(savingAccount)
    expect(accountTypeDropdown).toHaveValue(SAVING)

    const continueButton2 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton2).toBeEnabled()
    await fireEvent.click(continueButton2)

    const selectTextFeild = screen.getByLabelText(SP_LABEL_OPTION)

    const iconButtonElement2 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement2)

    const payingForGoods = screen.getByText(SP_OPTIONS[2].label)
    fireEvent.click(payingForGoods)
    expect(selectTextFeild).toHaveValue(SP_OPTIONS[2].label)

    const continueButton3 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton3).toBeEnabled()
    await fireEvent.click(continueButton3)

    const confirmBusinessDirectors = screen.getByText(
      CONFIRM_YOUR_BUSINESS_DIRECTORS
    )
    expect(confirmBusinessDirectors).toBeInTheDocument()

    const firstNameTextField2 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField2, { target: { value: 'Ross' } })
    expect(firstNameTextField2).toHaveValue('Ross')

    const lastNameTextField2 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField2, { target: { value: 'Gener' } })
    expect(lastNameTextField2).toHaveValue('Gener')

    const iconButtonElement3 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement3)

    const countryTextfields = screen.getAllByLabelText(UDF_label_option)

    const indiaElement = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement)
    expect(countryTextfields[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton4 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton4).toBeEnabled()
    await fireEvent.click(continueButton4)

    // this block of tests start here

    const confirmBusinessOwners = screen.getByText(CONFIRM_BUSINESS_OWNERS)
    expect(confirmBusinessOwners).toBeInTheDocument()

    const firstNameTextField3 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField3, { target: { value: 'Ross' } })
    expect(firstNameTextField3).toHaveValue('Ross')

    const lastNameTextField3 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField3, { target: { value: 'Gener' } })
    expect(lastNameTextField3).toHaveValue('Gener')

    const iconButtonElement4 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement4)

    const countryTextfield2 = screen.getAllByLabelText(UDF_label_option)

    const indiaElement2 = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement2)
    expect(countryTextfield2[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton5 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton5).toBeEnabled()
    await fireEvent.click(continueButton5)
  })

  test('review transfer details component rendering correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])

    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)

    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })

    const accountNoTextField = screen.getByLabelText(ACCOUNT_NUMBER)
    fireEvent.change(accountNoTextField, { target: { value: '1234' } })

    const firstNameTextField = screen.getByLabelText(FIRST_NAME)
    fireEvent.change(firstNameTextField, { target: { value: 'john' } })

    const lastNameTextField = screen.getByLabelText(LAST_NAME)
    fireEvent.change(lastNameTextField, { target: { value: 'roy' } })

    const ifscTextField = screen.getByLabelText(IFSC)
    fireEvent.change(ifscTextField, { target: { value: 'abc' } })

    const accountTypeDropdown = screen.getByLabelText(SELECT_ACCOUNT_TYPE)

    const iconButtonElement = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement)

    const savingAccount = screen.getByText(SAVING)
    fireEvent.click(savingAccount)
    expect(accountTypeDropdown).toHaveValue(SAVING)

    const continueButton2 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton2).toBeEnabled()
    fireEvent.click(continueButton2)

    const selectTextFeild = screen.getByLabelText(SP_LABEL_OPTION)

    const iconButtonElement2 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement2)

    const payingForGoods = screen.getByText(SP_OPTIONS[2].label)
    fireEvent.click(payingForGoods)
    expect(selectTextFeild).toHaveValue(SP_OPTIONS[2].label)

    const continueButton3 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton3).toBeEnabled()
    await fireEvent.click(continueButton3)

    const confirmBusinessDirectors = screen.getByText(
      CONFIRM_YOUR_BUSINESS_DIRECTORS
    )
    expect(confirmBusinessDirectors).toBeInTheDocument()

    const firstNameTextField2 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField2, { target: { value: 'Ross' } })
    expect(firstNameTextField2).toHaveValue('Ross')

    const lastNameTextField2 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField2, { target: { value: 'Gener' } })
    expect(lastNameTextField2).toHaveValue('Gener')

    const iconButtonElement3 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement3)

    const countryTextfields = screen.getAllByLabelText(UDF_label_option)

    const indiaElement = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement)
    expect(countryTextfields[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton4 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton4).toBeEnabled()
    await fireEvent.click(continueButton4)

    const confirmBusinessOwners = screen.getByText(CONFIRM_BUSINESS_OWNERS)
    expect(confirmBusinessOwners).toBeInTheDocument()

    const firstNameTextField3 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField3, { target: { value: 'Ross' } })
    expect(firstNameTextField3).toHaveValue('Ross')

    const lastNameTextField3 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField3, { target: { value: 'Gener' } })
    expect(lastNameTextField3).toHaveValue('Gener')

    const iconButtonElement4 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement4)

    const countryTextfield2 = screen.getAllByLabelText(UDF_label_option)

    const indiaElement2 = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement2)
    expect(countryTextfield2[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton5 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton5).toBeEnabled()
    await fireEvent.click(continueButton5)

    // this block of tests start here

    const reviewTransferText = screen.getByText(REVIEW_DETAILS_OF_TRANSFER)
    expect(reviewTransferText).toBeInTheDocument()

    const confirmAndContinueButton = screen.getByRole('button', {
      name: CONFIRM_AND_CONTINUE,
    })
    await fireEvent.click(confirmAndContinueButton)
  })

  test('choose transfer type and summary card rendering correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])
    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)

    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })

    const accountNoTextField = screen.getByLabelText(ACCOUNT_NUMBER)
    fireEvent.change(accountNoTextField, { target: { value: '1234' } })

    const firstNameTextField = screen.getByLabelText(FIRST_NAME)
    fireEvent.change(firstNameTextField, { target: { value: 'john' } })

    const lastNameTextField = screen.getByLabelText(LAST_NAME)
    fireEvent.change(lastNameTextField, { target: { value: 'roy' } })

    const ifscTextField = screen.getByLabelText(IFSC)
    fireEvent.change(ifscTextField, { target: { value: 'abc' } })

    const accountTypeDropdown = screen.getByLabelText(SELECT_ACCOUNT_TYPE)

    const iconButtonElement = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement)

    const savingAccount = screen.getByText(SAVING)
    fireEvent.click(savingAccount)
    expect(accountTypeDropdown).toHaveValue(SAVING)

    const continueButton2 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton2).toBeEnabled()
    await fireEvent.click(continueButton2)

    const selectTextFeild = screen.getByLabelText(SP_LABEL_OPTION)

    const iconButtonElement2 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement2)

    const payingForGoods = screen.getByText(SP_OPTIONS[2].label)
    fireEvent.click(payingForGoods)
    expect(selectTextFeild).toHaveValue(SP_OPTIONS[2].label)

    const continueButton3 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton3).toBeEnabled()
    await fireEvent.click(continueButton3)

    const confirmBusinessDirectors = screen.getByText(
      CONFIRM_YOUR_BUSINESS_DIRECTORS
    )
    expect(confirmBusinessDirectors).toBeInTheDocument()

    const firstNameTextField2 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField2, { target: { value: 'Ross' } })
    expect(firstNameTextField2).toHaveValue('Ross')

    const lastNameTextField2 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField2, { target: { value: 'Gener' } })
    expect(lastNameTextField2).toHaveValue('Gener')

    const iconButtonElement3 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement3)

    const countryTextfields = screen.getAllByLabelText(UDF_label_option)

    const indiaElement = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement)
    expect(countryTextfields[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton4 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton4).toBeEnabled()
    await fireEvent.click(continueButton4)

    const confirmBusinessOwners = screen.getByText(CONFIRM_BUSINESS_OWNERS)
    expect(confirmBusinessOwners).toBeInTheDocument()

    const firstNameTextField3 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField3, { target: { value: 'Ross' } })
    expect(firstNameTextField3).toHaveValue('Ross')

    const lastNameTextField3 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField3, { target: { value: 'Gener' } })
    expect(lastNameTextField3).toHaveValue('Gener')

    const iconButtonElement4 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement4)

    const countryTextfield2 = screen.getAllByLabelText(UDF_label_option)

    const indiaElement2 = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement2)
    expect(countryTextfield2[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton5 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton5).toBeEnabled()
    await fireEvent.click(continueButton5)

    const reviewTransferText = screen.getByText(REVIEW_DETAILS_OF_TRANSFER)
    expect(reviewTransferText).toBeInTheDocument()

    const confirmAndContinueButton = screen.getByRole('button', {
      name: CONFIRM_AND_CONTINUE,
    })
    fireEvent.click(confirmAndContinueButton)

    // this block of tests start here

    const chooseTransferText = screen.getByText(CHOOSE_YOUR_TRANSFER_TYPE)
    expect(chooseTransferText).toBeInTheDocument()

    const radioButtons = screen.getAllByRole('radio')

    fireEvent.click(radioButtons[0])

    const continueToPayButton = screen.getByRole('button', {
      name: CONTINUE_TO_PAY,
    })
    await fireEvent.click(continueToPayButton)
  })

  test('pay through debit card rendering correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])

    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)

    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })

    const accountNoTextField = screen.getByLabelText(ACCOUNT_NUMBER)
    fireEvent.change(accountNoTextField, { target: { value: '1234' } })

    const firstNameTextField = screen.getByLabelText(FIRST_NAME)
    fireEvent.change(firstNameTextField, { target: { value: 'john' } })

    const lastNameTextField = screen.getByLabelText(LAST_NAME)
    fireEvent.change(lastNameTextField, { target: { value: 'roy' } })

    const ifscTextField = screen.getByLabelText(IFSC)
    fireEvent.change(ifscTextField, { target: { value: 'abc' } })

    const accountTypeDropdown = screen.getByLabelText(SELECT_ACCOUNT_TYPE)

    const iconButtonElement = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement)

    const savingAccount = screen.getByText(SAVING)
    fireEvent.click(savingAccount)
    expect(accountTypeDropdown).toHaveValue(SAVING)

    const continueButton2 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton2).toBeEnabled()
    await fireEvent.click(continueButton2)

    const selectTextFeild = screen.getByLabelText(SP_LABEL_OPTION)

    const iconButtonElement2 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement2)

    const payingForGoods = screen.getByText(SP_OPTIONS[2].label)
    fireEvent.click(payingForGoods)
    expect(selectTextFeild).toHaveValue(SP_OPTIONS[2].label)

    const continueButton3 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton3).toBeEnabled()
    await fireEvent.click(continueButton3)

    const confirmBusinessDirectors = screen.getByText(
      CONFIRM_YOUR_BUSINESS_DIRECTORS
    )
    expect(confirmBusinessDirectors).toBeInTheDocument()

    const firstNameTextField2 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField2, { target: { value: 'Ross' } })
    expect(firstNameTextField2).toHaveValue('Ross')

    const lastNameTextField2 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField2, { target: { value: 'Gener' } })
    expect(lastNameTextField2).toHaveValue('Gener')

    const iconButtonElement3 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement3)

    const countryTextfields = screen.getAllByLabelText(UDF_label_option)

    const indiaElement = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement)
    expect(countryTextfields[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton4 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton4).toBeEnabled()
    await fireEvent.click(continueButton4)

    const confirmBusinessOwners = screen.getByText(CONFIRM_BUSINESS_OWNERS)
    expect(confirmBusinessOwners).toBeInTheDocument()

    const firstNameTextField3 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField3, { target: { value: 'Ross' } })
    expect(firstNameTextField3).toHaveValue('Ross')

    const lastNameTextField3 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField3, { target: { value: 'Gener' } })
    expect(lastNameTextField3).toHaveValue('Gener')

    const iconButtonElement4 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement4)

    const countryTextfield2 = screen.getAllByLabelText(UDF_label_option)

    const indiaElement2 = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement2)
    expect(countryTextfield2[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton5 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton5).toBeEnabled()
    await fireEvent.click(continueButton5)

    const reviewTransferText = screen.getByText(REVIEW_DETAILS_OF_TRANSFER)
    expect(reviewTransferText).toBeInTheDocument()

    const confirmAndContinueButton = screen.getByRole('button', {
      name: CONFIRM_AND_CONTINUE,
    })
    fireEvent.click(confirmAndContinueButton)

    const chooseTransferText = screen.getByText(CHOOSE_YOUR_TRANSFER_TYPE)
    expect(chooseTransferText).toBeInTheDocument()

    const radioButtons = screen.getAllByRole('radio')

    fireEvent.click(radioButtons[0])

    const continueToPayButton = screen.getByRole('button', {
      name: CONTINUE_TO_PAY,
    })
    await fireEvent.click(continueToPayButton)

    // this block of tests start here

    const bankAccountRadioButtons = screen.getAllByRole('radio')
    fireEvent.click(bankAccountRadioButtons[0])

    const cvvTextFields = screen.getAllByLabelText(CVV)
    fireEvent.change(cvvTextFields[0], { target: { value: '234' } })

    const continueToPay2 = screen.getByRole('button', {
      name: CONTINUE_TO_PAY,
    })

    await fireEvent.click(continueToPay2)

    // confirm you payment card component renders

    const confirmPayText = screen.getByText(CONFIRM_YOUR_PURCHASE)
    expect(confirmPayText).toBeInTheDocument()

    const completeButton = screen.getByRole('button', { name: 'Complete' })
    await fireEvent.click(completeButton)
  })

  test('pay through bank working correctly', async () => {
    const sendMoneyCard = screen.getByText('Send Money')
    expect(sendMoneyCard).toBeInTheDocument()
    fireEvent.click(sendMoneyCard)

    const backIconElements = screen.getAllByRole('img')
    fireEvent.click(backIconElements[1])

    const sendMoneyCard1 = screen.getByText('Send Money')

    fireEvent.click(sendMoneyCard1)

    const sendingTextField = screen.getByLabelText(CC_LABEL_SEND)
    expect(sendingTextField).toBeInTheDocument()

    const iconButtons = screen.getAllByRole('img')
    fireEvent.click(iconButtons[4])

    const unitedKindom = screen.getByText(currencies[2].label)
    fireEvent.click(unitedKindom)

    const receivingTextField = screen.getByLabelText(CC_LABEL_RECEIVE)
    expect(receivingTextField).toBeInTheDocument()
    fireEvent.click(iconButtons[6])
    const andora = screen.getByText(currencies[0].label)
    fireEvent.click(andora)

    fireEvent.change(sendingTextField, { target: { value: 100 } })

    const continueButton = screen.getByRole('button', { name: CC_CONTINUE })
    expect(continueButton).toBeEnabled()
    await fireEvent.click(continueButton)
    await fireEvent.click(iconButtons[7])

    expect(screen.getByText(RECIPEINT_TYPE)).toBeInTheDocument()

    const businessCard = screen.getByText(RECIPEINT_TYPE_VALUES[2].children)
    fireEvent.click(businessCard)

    const emailTextField = screen.getByLabelText(EMAIL)
    fireEvent.change(emailTextField, { target: { value: 'abc@gmail.com' } })

    const accountNoTextField = screen.getByLabelText(ACCOUNT_NUMBER)
    fireEvent.change(accountNoTextField, { target: { value: '1234' } })

    const firstNameTextField = screen.getByLabelText(FIRST_NAME)
    fireEvent.change(firstNameTextField, { target: { value: 'john' } })

    const lastNameTextField = screen.getByLabelText(LAST_NAME)
    fireEvent.change(lastNameTextField, { target: { value: 'roy' } })

    const ifscTextField = screen.getByLabelText(IFSC)
    fireEvent.change(ifscTextField, { target: { value: 'abc' } })

    const accountTypeDropdown = screen.getByLabelText(SELECT_ACCOUNT_TYPE)

    const iconButtonElement = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement)

    const savingAccount = screen.getByText(SAVING)
    fireEvent.click(savingAccount)
    expect(accountTypeDropdown).toHaveValue(SAVING)

    const continueButton2 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton2).toBeEnabled()
    await fireEvent.click(continueButton2)

    const selectTextFeild = screen.getByLabelText(SP_LABEL_OPTION)

    const iconButtonElement2 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement2)

    const payingForGoods = screen.getByText(SP_OPTIONS[2].label)
    fireEvent.click(payingForGoods)
    expect(selectTextFeild).toHaveValue(SP_OPTIONS[2].label)

    const continueButton3 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton3).toBeEnabled()
    await fireEvent.click(continueButton3)

    const confirmBusinessDirectors = screen.getByText(
      CONFIRM_YOUR_BUSINESS_DIRECTORS
    )
    expect(confirmBusinessDirectors).toBeInTheDocument()

    const firstNameTextField2 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField2, { target: { value: 'Ross' } })
    expect(firstNameTextField2).toHaveValue('Ross')

    const lastNameTextField2 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField2, { target: { value: 'Gener' } })
    expect(lastNameTextField2).toHaveValue('Gener')

    const iconButtonElement3 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement3)

    const countryTextfields = screen.getAllByLabelText(UDF_label_option)

    const indiaElement = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement)
    expect(countryTextfields[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton4 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton4).toBeEnabled()
    await fireEvent.click(continueButton4)

    const confirmBusinessOwners = screen.getByText(CONFIRM_BUSINESS_OWNERS)
    expect(confirmBusinessOwners).toBeInTheDocument()

    const firstNameTextField3 = screen.getByLabelText(UDF_label_FirstName)
    fireEvent.change(firstNameTextField3, { target: { value: 'Ross' } })
    expect(firstNameTextField3).toHaveValue('Ross')

    const lastNameTextField3 = screen.getByLabelText(UDF_label_LastName)
    fireEvent.change(lastNameTextField3, { target: { value: 'Gener' } })
    expect(lastNameTextField3).toHaveValue('Gener')

    const iconButtonElement4 = screen.getByTestId('ArrowDropDownIcon')
    fireEvent.click(iconButtonElement4)

    const countryTextfield2 = screen.getAllByLabelText(UDF_label_option)

    const indiaElement2 = screen.getByText(UDF_COUNTRY_OPTIONS[0].label)
    fireEvent.click(indiaElement2)
    expect(countryTextfield2[0]).toHaveValue(UDF_COUNTRY_OPTIONS[0].label)

    const continueButton5 = screen.getByRole('button', { name: CONTINUE })
    expect(continueButton5).toBeEnabled()
    await fireEvent.click(continueButton5)

    const reviewTransferText = screen.getByText(REVIEW_DETAILS_OF_TRANSFER)
    expect(reviewTransferText).toBeInTheDocument()

    const confirmAndContinueButton = screen.getByRole('button', {
      name: CONFIRM_AND_CONTINUE,
    })
    await fireEvent.click(confirmAndContinueButton)

    const chooseTransferText = screen.getByText(CHOOSE_YOUR_TRANSFER_TYPE)
    expect(chooseTransferText).toBeInTheDocument()

    const radioButtons = screen.getAllByRole('radio')

    fireEvent.click(radioButtons[2])

    const continueToPayButton = screen.getByRole('button', {
      name: CONTINUE_TO_PAY,
    })
    await fireEvent.click(continueToPayButton)

    // this block of tests start here

    // choose bank component renders

    const chooseBankTextfield = screen.getByLabelText(CB_LABEL_TEXT)
    fireEvent.change(chooseBankTextfield, { target: { value: 'l' } })
    const lloydsBank = screen.getByText('Lloyds')
    fireEvent.click(lloydsBank)

    // pay from llyods account renders

    const payFromLloydsText = screen.getByText(PD_HEADER)
    expect(payFromLloydsText).toBeInTheDocument()

    const continueToPay3 = screen.getByRole('button', { name: CONTINUE_TO_PAY })
    await fireEvent.click(continueToPay3)

    // confirm and make payment card renders

    const confirmAndPayText = screen.getByText(BANK_CARD_VALUES[0].BC_header)
    expect(confirmAndPayText).toBeInTheDocument()

    const continueBtn = screen.getByRole('button', { name: CONTINUE })
    expect(continueBtn).toBeEnabled()
    await fireEvent.click(continueBtn)
  })
})
