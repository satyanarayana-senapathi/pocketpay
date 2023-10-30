import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AccountTypeCard } from '.'
import theme from '../../../utils/themes/theme'

test('Test for Outer Styled box', () => {
  render(<AccountTypeCard />)

  const styleBox = screen.getByTestId('outer-box')
  expect(styleBox).toBeInTheDocument()
})

test('Test rendering with custom width and height', () => {
  const customWidth = '400px'
  const customHeight = '120px'
  render(<AccountTypeCard width={customWidth} height={customHeight} />)

  const styleBox = screen.getByTestId('outer-box')
  expect(styleBox).toBeInTheDocument()
  expect(styleBox).toHaveStyle(`width: ${customWidth}`)
  expect(styleBox).toHaveStyle(`height: ${customHeight}`)
})

test('Test styles of card containers', () => {
  render(<AccountTypeCard />)

  const cardContainers = screen.getAllByTestId('card-container')

  cardContainers.forEach((container) => {
    expect(container).toHaveStyle('width: 516px')
    expect(container).toHaveStyle('height: 100%')
    expect(container).toHaveStyle('border-radius: 8px')
    expect(container).toHaveStyle('border: 1px solid')
    expect(container).toHaveStyle(`color: ${theme.palette.iconColor.stroke}`)
    expect(container).toHaveStyle('display: flex')
    expect(container).toHaveStyle('flex-direction: row')
    expect(container).toHaveStyle('cursor: pointer')
  })
})
