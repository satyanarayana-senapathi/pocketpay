import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AccountCard from '.'
import { GET_ACCOUNT_CARD_VALUES } from '../../../utils/constants'

describe('OperationType organism', () => {
  test('Icons rendering correctly', () => {
    render(
      <AccountCard
        item={GET_ACCOUNT_CARD_VALUES(
          () => console.log('Send button clicked...'),
          () => console.log('Setup button clicked...'),
          true,
          false
        )}
      />
    )
    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(2)
  })
  test('onClick working correctly', () => {
    const mockHandleClick = jest.fn()

    render(
      <AccountCard
        item={GET_ACCOUNT_CARD_VALUES(
          mockHandleClick,
          () => console.log('Setup button clicked...'),
          true,
          false
        )}
      />
    )
    const actionButtons = screen.getAllByRole('button')
    expect(actionButtons[0]).toBeEnabled()
    expect(actionButtons[1]).toBeDisabled()
    fireEvent.click(actionButtons[0])
    expect(mockHandleClick).toHaveBeenCalled()
  })
})
