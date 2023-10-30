import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StyledTemplate from '.'

describe('Template Signup/Signin component', () => {
  test('renders the parent grid', () => {
    render(<StyledTemplate />)
    const mainGrid = screen.getByTestId('main-grid')
    expect(mainGrid).toBeInTheDocument()
  })

  test('renders all child Grid components', () => {
    render(<StyledTemplate />)

    const frontGridElement = screen.getByTestId('front-grid')
    const middleGridElement = screen.getByTestId('middle-grid')
    const endGridElement = screen.getByTestId('end-grid')

    expect(frontGridElement).toBeInTheDocument()
    expect(middleGridElement).toBeInTheDocument()
    expect(endGridElement).toBeInTheDocument()
  })
})
