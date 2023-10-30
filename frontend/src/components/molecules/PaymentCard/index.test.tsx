import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import PaymentCard, { PaymentCardProps } from './index'

describe('PaymentCard', () => {
  const defaultProps: PaymentCardProps = {
    backgroundColor: 'blue',
    icon: 'icon-url',
    cardContent: 'Card Content',
    primaryContent: 'Detail Content 1',
    secondaryContent: 'Detail Content 2',
    color: 'white',
    cardVariant: 'body1',
    detailVariant: 'body1',
    width: '200px',
    height: '200px',
    iconColor: 'red',
    onClick: jest.fn(),
    flexDirection: 'row',
  }

  it('renders the payment card component with provided props', () => {
    const { getByTestId } = render(<PaymentCard {...defaultProps} />)

    const paymentCard = getByTestId('payment-card')
    expect(paymentCard).toBeInTheDocument()

    const boxelement = getByTestId('box-id')
    expect(boxelement).toBeInTheDocument()
    console.log(boxelement.children)

    const cardContent = getByTestId('card-content')
    expect(cardContent).toBeInTheDocument()

    const primaryContent = getByTestId('detail-content1')
    expect(primaryContent).toBeInTheDocument()

    const secondaryContent = getByTestId('detail-content2')
    expect(secondaryContent).toBeInTheDocument()

    const radioButton = getByTestId('radio-button')
    expect(radioButton).toBeInTheDocument()
  })

  it('calls onClick when the radio button is clicked', () => {
    const { getByTestId } = render(<PaymentCard {...defaultProps} />)

    const radioButton = getByTestId('radio-button')
    fireEvent.click(radioButton)

    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('test with height and width', () => {
    render(<PaymentCard height="200px" width="200px" flexDirection={'row'} />)
    const boxelement = screen.getByTestId('box-id')
    expect(boxelement).toBeInTheDocument()
  })
})
