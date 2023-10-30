import React from 'react'
import { screen, render } from '@testing-library/react'
import IconTypograpy from './index'
import '@testing-library/jest-dom'

describe('IconTypograpy', () => {
  test('renders content and icon correctly', () => {
    const backgroundColor = '#FFFFFF'
    const iconSrc = 'path/to/icon.svg'
    const content = 'Lorem Ipsum'
    const color = 'blue'
    const variant = 'h1'

    const { getByTestId, getByAltText } = render(
      <IconTypograpy
        backgroundColor={backgroundColor}
        icon={iconSrc}
        content={content}
        color={color}
        variant={variant}
      />
    )

    const iconTypography = getByTestId('icon-typography')
    const icon = getByAltText('icon')
    const typographyContent = getByTestId('icon-typography-content')

    expect(iconTypography).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
    expect(typographyContent).toBeInTheDocument()
    expect(icon).toHaveAttribute('src', iconSrc)
    expect(typographyContent).toHaveTextContent(content)
    expect(typographyContent).toHaveStyle(`color: ${color}`)
  })

  it('test with height and width', () => {
    render(<IconTypograpy height="200px" width="200px" />)
    const boxelement = screen.getByTestId('box-id')
    expect(boxelement).toBeInTheDocument()
  })
})
