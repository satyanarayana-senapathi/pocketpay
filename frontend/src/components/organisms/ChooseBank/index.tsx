import { Box, styled, Stack } from '@mui/material'
import {
  CB_CANCEL,
  CB_CONTENT,
  CB_HEADER,
  CB_HEADING,
  CB_LABEL_TEXT,
  CB_NO,
  CB_YES,
  ChooseBank_Values,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import Typography from '../../atoms/Typography'
import CustomTextField from '../../atoms/Textfield'
import Button from '../../atoms/button'
import { useState } from 'react'
import Modal from '../../molecules/Modal'
import AvatarTypograpy from '../../molecules/AvatarWithTypo'
import Icon from '../../atoms/icon'

const ParentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
})

const TypographyStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '1.25rem',
})

const ButtonBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2rem 0rem',
})

const ModalBox = styled(Box)({
  marginTop: '6.56rem',
})

const TransferCancelButton = styled(Button)({
  width: '218px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.primary.primary500,
  backgroundColor: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.cardHover,
  },
})

const ModalRedirectButton = styled(Button)({
  width: '135px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
  marginRight: '1.25rem',
})

const ModalCloseButton = styled(Button)({
  width: '135px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.primary.primary500,
  backgroundColor: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.cardHover,
  },
})

const IconButton = styled(Button)({
  width: '100%',
  height: '50px',
  borderRadius: '0px',
  backgroundColor: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.cardHover,
  },
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const ModalStyle = styled(Stack)({
  width: '30vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const StyledTextField = styled(CustomTextField)({
  width: '100%',
  '& label.Mui-focused': {
    color: theme.palette.textColor.lowEmphasis,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.iconColor.stroke,
    },
  },
  marginTop: '2.75rem',
  marginBottom: '1.25rem',
})

interface ChooseBankProps {
  onOptionClick?: () => void
  onModalClick?: () => void
}

const ChooseBank = (props: ChooseBankProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const filteredValues = ChooseBank_Values.filter((item) =>
    item.optionText.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <ParentBox>
      <Box>
        <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
          {CB_HEADER}
        </Typography>
      </Box>
      <Box>
        <StyledTextField
          label={CB_LABEL_TEXT}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></StyledTextField>
        {filteredValues.map((item) => (
          <Stack
            key={item.id}
            spacing={'0.25rem'}
            sx={{ marginTop: '1.25rem' }}
          >
            <IconButton
              variant="text"
              onClick={props.onOptionClick}
              disabled={item.disabled}
              disableRipple
              disableElevation
            >
              <AvatarTypograpy
                icon={item.iconSrc}
                content={item.optionText}
                color={theme.palette.textColor.highEmphasis}
                variant="caption"
              ></AvatarTypograpy>
              <Icon src={item.arrowSrc}></Icon>
            </IconButton>
          </Stack>
        ))}
      </Box>
      <ButtonBox>
        <TransferCancelButton onClick={() => setShowModal(true)}>
          <Typography variant="body2">{CB_CANCEL}</Typography>
        </TransferCancelButton>
      </ButtonBox>
      {showModal && (
        <Modal isModalOpen={showModal}>
          <ModalStyle>
            <TypographyStack spacing={'1.62rem'}>
              <Typography
                variant="h1"
                color={theme.palette.textColor.highEmphasis}
              >
                {CB_HEADING}
              </Typography>
              <Typography
                variant="body1"
                color={theme.palette.textColor.mediumEmphasis}
              >
                {CB_CONTENT}
              </Typography>
            </TypographyStack>
            <ModalBox>
              <ModalRedirectButton
                variant="contained"
                onClick={props.onModalClick}
              >
                <Typography variant="body2">{CB_YES}</Typography>
              </ModalRedirectButton>
              <ModalCloseButton
                data-testid="modal-add-btn"
                variant="contained"
                onClick={() => setShowModal(false)}
              >
                <Typography variant="body2">{CB_NO}</Typography>
              </ModalCloseButton>
            </ModalBox>
          </ModalStyle>
        </Modal>
      )}
    </ParentBox>
  )
}

export default ChooseBank
