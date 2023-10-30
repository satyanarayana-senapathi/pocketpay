import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import Button from './index'
import { CANCEL, SAVE } from '../../../utils/constants'

describe('Button atom renders', () => {
  test('OnClick event is working correctly', () => {
    const onClick = jest.fn()
    render(
      <Button color="primary" variant="text" onClick={onClick}>
        {CANCEL}
      </Button>
    )
    const image = screen.getByRole('button')
    fireEvent.click(image)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('text rendering correctly', () => {
    render(
      <Button color="primary" variant="text">
        {SAVE}
      </Button>
    )
    const buttonText = screen.getByText(SAVE)
    expect(buttonText).toBeInTheDocument()
  })

  test('should have variant contained default', () => {
    render(<Button color="primary">{SAVE}</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('MuiButton-contained')
  })
})
