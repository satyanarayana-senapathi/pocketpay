import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Modal from '.'
import '@testing-library/jest-dom/extend-expect'

describe('Modal', () => {
  const mockOnClose = jest.fn()

  it('renders modal content when isModalOpen is true', () => {
    render(
      <Modal isModalOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )

    const modalContent = screen.getByTestId('modal-content')
    expect(modalContent).toBeInTheDocument()
    expect(modalContent.textContent).toBe('Modal Content')
  })

  it('does not render modal content when isModalOpen is false', () => {
    render(
      <Modal isModalOpen={false} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    )

    const modalContent = screen.queryByTestId('modal-content')
    expect(modalContent).toBeNull()
  })
  test('calls onClose when modal is closed', () => {
    render(
      <Modal isModalOpen={true} onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    )

    const modal = screen.getByTestId('modal')
    fireEvent.click(modal)
    waitFor(() => {
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
      expect(mockOnClose).toHaveBeenCalled()
    })
  })
})
