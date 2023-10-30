/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ConfirmTradingAddress from '.'
import '@testing-library/jest-dom'
import { TradingAddress } from '../../../utils/constants'
import { BrowserRouter } from 'react-router-dom'
import { YourDetailContext } from '../../../Context/YourDetailContext'
import axios from 'axios'

const mockBusinessData = [
  {
    id: 1,
    registered_address: 'Business Address 1',
  },
  {
    id: 2,
    registered_address: 'Business Address 2',
  },
]
jest.mock('../../../services/api/api', () => ({
  API: {
    patch: jest.fn(() =>
      Promise.resolve({
        data: { registered_address: 'Updated Address' },
      })
    ),
    get: jest.fn(() => {
      return Promise.resolve({ data: [mockBusinessData] })
    }),
  },
}))

describe('ConfirmTradingAddress component', () => {
  const tradingAddresses: TradingAddress[] = [
    {
      id: 1,
      address: 'Address 1',
    },
    {
      id: 2,
      address: 'Address 2',
    },
  ]

  jest.spyOn(axios, 'get').mockResolvedValue({ data: tradingAddresses })
  render(
    <BrowserRouter>
      <YourDetailContext>
        <ConfirmTradingAddress addressArray={tradingAddresses} />
      </YourDetailContext>
    </BrowserRouter>
  )

  test('adding a new trading address works correctly', async () => {
    const newAddress = '   New Trading Address    '

    const addButton = screen.getByTestId('add-address')
    fireEvent.click(addButton)

    const addTextField = screen.getByTestId('add-address-textfield')
    const modalAddButton = screen.getByTestId('modal-add-btn')

    expect(addTextField).toBeInTheDocument()
    expect(modalAddButton).toBeInTheDocument()

    const inputField = screen.getByRole('textbox')
    fireEvent.change(inputField, {
      target: { value: newAddress },
    })

    console.log(inputField.textContent)
    const modalButton = screen.getByRole('button')
    expect(modalButton).toBeInTheDocument()
    fireEvent.click(modalButton)

    expect(screen.getByText('New Trading Address')).toBeInTheDocument()
    expect(screen.queryByTestId('address-modal')).not.toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('New Trading Address')).toBeInTheDocument()
      expect(screen.queryByTestId('address-modal')).not.toBeInTheDocument()
    })
  })

  test('displays trading addresses correctly', async () => {
    render(
      <BrowserRouter>
        <YourDetailContext>
          <ConfirmTradingAddress addressArray={tradingAddresses} />
        </YourDetailContext>
      </BrowserRouter>
    )

    await waitFor(() => {
      tradingAddresses.forEach((addressData) => {
        const addressElements = screen.queryAllByText(
          `Address ${addressData.id}`
        )
        expect(addressElements.length).toBeGreaterThan(0)

        const detailElements = screen.queryAllByText(addressData.address)
        expect(detailElements.length).toBeGreaterThan(0)
      })
    })
  })
  test('update the selected address onClick on address card', () => {
    render(
      <BrowserRouter>
        <YourDetailContext>
          <ConfirmTradingAddress addressArray={tradingAddresses} />
        </YourDetailContext>
      </BrowserRouter>
    )
    const addressCards = screen.getAllByRole('radio')
    fireEvent.click(addressCards[0])
    expect(addressCards[0]).toBeChecked()
  })

  test('editing and saving trading address works correctly', () => {
    render(
      <BrowserRouter>
        <YourDetailContext>
          <ConfirmTradingAddress addressArray={tradingAddresses} />
        </YourDetailContext>
      </BrowserRouter>
    )
    const editButton = screen.getByRole('button', { name: 'Edit' })
    fireEvent.click(editButton)

    const newAddress = 'New Trading Address'
    const inputField = screen.getByRole('textbox')
    fireEvent.change(inputField, {
      target: { value: newAddress },
    })
    const saveButton = screen.getByTestId('save-address')
    fireEvent.click(saveButton)
  })

  test('clicking on Edit button enables edit mode', () => {
    render(
      <BrowserRouter>
        <YourDetailContext>
          <ConfirmTradingAddress addressArray={tradingAddresses} />
        </YourDetailContext>
      </BrowserRouter>
    )
    const editButton = screen.getByTestId('edit-button')
    fireEvent.click(editButton)
    expect(screen.getByTestId('edit-address-textfield')).toBeInTheDocument()
    expect(screen.getByTestId('save-address')).toBeInTheDocument()
  })

  test('clicking on Cancel button disables edit mode', () => {
    render(
      <BrowserRouter>
        <YourDetailContext>
          <ConfirmTradingAddress addressArray={tradingAddresses} />
        </YourDetailContext>
      </BrowserRouter>
    )
    const editButton = screen.getByTestId('edit-button')
    fireEvent.click(editButton)
    const cancelButton = screen.getByTestId('cancel-button')
    fireEvent.click(cancelButton)
    expect(
      screen.queryByTestId('edit-address-textfield')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('save-address')).not.toBeInTheDocument()
  })

  test('fetching business data and initializing tradingAddressList works correctly', async () => {
    jest.setTimeout(10000)
    render(
      <BrowserRouter>
        <YourDetailContext>
          <ConfirmTradingAddress addressArray={tradingAddresses} />
        </YourDetailContext>
      </BrowserRouter>
    )
  })
})
