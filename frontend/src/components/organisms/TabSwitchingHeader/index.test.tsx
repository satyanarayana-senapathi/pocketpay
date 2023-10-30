import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { TabSwitchingHeader } from '.'

test('Test for Styled Box', () => {
  render(<TabSwitchingHeader />)

  const outerBox = screen.getByTestId('outer_box')
  expect(outerBox).toBeInTheDocument()
})

test('Test presence of help circle icon', () => {
  render(<TabSwitchingHeader />)

  const helpCircleIcon = screen.getByAltText('help-circle')
  expect(helpCircleIcon).toBeInTheDocument()
})

test('Test presence of ShareTrackingModal component', () => {
  render(<TabSwitchingHeader />)

  const shareButton = screen.getByRole('button')
  expect(shareButton).toBeInTheDocument()
})
