import React from 'react'
import { screen, render } from '@testing-library/react'
import AvatarTypograpy from '.'
import '@testing-library/jest-dom'

describe('AvatarTypograpy', () => {
  test('renders content and icon correctly', () => {
    const iconSrc = 'path/to/icon.svg'
    const content = 'Lorem Ipsum'
    const variant = 'h1'
    const color = 'blue'

    const { getByTestId, getByAltText } = render(
      <AvatarTypograpy
        icon={iconSrc}
        content={content}
        variant={variant}
        color={color}
      />
    )

    const iconTypography = getByTestId('avatar-typography')
    const icon = getByAltText('icon')
    const typographyContent = getByTestId('avatar-typography-content')

    expect(iconTypography).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
    expect(typographyContent).toBeInTheDocument()
    expect(typographyContent).toHaveStyle(`color: ${color}`)
  })

  it('test with height and width', () => {
    render(<AvatarTypograpy height="200px" width="200px" />)
    const boxelement = screen.getByTestId('box-id')
    expect(boxelement).toBeInTheDocument()
  })
})
