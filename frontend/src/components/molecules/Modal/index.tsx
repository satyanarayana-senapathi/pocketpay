import { Grid, Modal as MuiModal, styled } from '@mui/material'
import theme from '../../../utils/themes/theme'

export interface ModalProps {
  children: React.ReactNode
  isModalOpen: boolean
  onClose?: () => void
}

const Modal = ({ children, isModalOpen, onClose }: ModalProps) => {
  return (
    <div data-testid="modal-container">
      <MuiModal open={isModalOpen} onClose={onClose} data-testid="modal">
        <StyledContainer data-testid="modal-content">
          {children}
        </StyledContainer>
      </MuiModal>
    </div>
  )
}

export default Modal

const StyledContainer = styled(Grid)({
  all: 'unset',
  display: 'flex',
  flexWrap: 'wrap',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: theme.palette.structuralColor.white,
  bordercolor: theme.palette.structuralColor.white,
  borderRadius: '1rem',
  padding: '1.5rem',
})
