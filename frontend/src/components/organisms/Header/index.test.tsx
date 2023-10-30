import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Header } from '.'
import { ROSS_GENER, dropdownValues } from '../../../utils/constants'

describe('Test for Header Component', () => {
  it('Test for Styled Box ', () => {
    render(<Header />)

    const outerBox = screen.getByTestId('styled-box')
    expect(outerBox).toBeInTheDocument()
  })

  it('Test for Bell icon rendering', () => {
    render(<Header />)

    const bellIcon = screen.getByAltText('icon-bell')
    expect(bellIcon).toBeInTheDocument()
  })

  it('Test for header text rendering', () => {
    render(<Header />)

    const headerText = screen.getByText(ROSS_GENER)
    expect(headerText).toBeInTheDocument()
  })

  it('renders the dropdownValues correctly', () => {
    const { getByTestId, queryByText, getByAltText } = render(<Header />)

    const avatarButton = getByTestId('avatar-dropdown-button')
    fireEvent.click(avatarButton)

    dropdownValues.forEach((value) => {
      const option = getByTestId(`dropdown-option-${value.id}`)
      expect(option).toBeInTheDocument()

      const textElement = queryByText(value.children)
      expect(textElement).toBeInTheDocument()

      const imageElement = getByAltText(value.alt)
      expect(imageElement).toBeInTheDocument()
    })
  })
})
