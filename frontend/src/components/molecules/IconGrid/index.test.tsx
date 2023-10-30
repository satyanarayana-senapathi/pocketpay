import IconGrid from '.'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '@testing-library/react'
import GOOGLE from '../../../../public/assets/image/google.svg'
import APPLE from '../../../../public/assets/image/apple.svg'
import FACEBOOK from '../../../../public/assets/image/facebook.svg'

describe('IconGrid', () => {
  it('renders the IconGrid component with the provided icons', () => {
    const mockOnClick = jest.fn()

    render(
      <IconGrid
        thirdPartySignUpArray={[
          {
            id: 1,
            partyIcon: GOOGLE,
            onClick: mockOnClick,
            active: true,
          },
          {
            id: 2,
            partyIcon: FACEBOOK,
            onClick: mockOnClick,
            active: false,
          },
          {
            id: 3,
            partyIcon: APPLE,
            onClick: mockOnClick,
            active: false,
          },
        ]}
      />
    )

    const icons = screen.getAllByRole('img')
    expect(icons.length).toBe(3)
    expect(icons[0]).toBeInTheDocument()

    expect(icons[0]).not.toBeDisabled()

    fireEvent.click(icons[0])
    expect(mockOnClick).toBeCalled()
  })
})
