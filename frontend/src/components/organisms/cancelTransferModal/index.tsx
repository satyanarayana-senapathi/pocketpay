import React, { useState } from 'react'
import Modal from '../../molecules/Modal'
import Typography from '../../atoms/Typography'
import theme from '../../../utils/themes/theme'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import {
  ACCOUNT_NUMBER_ENDING_WITH_4242,
  ACCOUNT_NUMBER_ENDING_WITH_4656,
  AN_EXISTING_ACCOUNT,
  CANCEL_THE_TRANSFER,
  CANCEL_TRANSFER,
  CANCEL_TRANSFER_BUTTON,
  CANCEL_TRANSFER_OPTIONS,
  DOWN_ARROW_ALT,
  NEW_ACCOUNT,
  ROSS_GENER,
  SELECT_ACCOUNT,
  SELECT_AN_OPTION,
  WHERE_WOULD_YOU_LIKE_TO_REFUND,
} from '../../../utils/constants'
import Icon from '../../atoms/icon'
import DownArrowImg from '../../../../public/assets/image/downArrow.svg'
import CustomTextField from '../../atoms/Textfield'
import Button from '../../atoms/button'
import styled from '@emotion/styled'

const StyledTextField = styled(CustomTextField)`
  width: 516px;
  height: 60px;
  @media (max-width: 600px) {
    width: 100%;
  }
  margin: 10px 0 0;
`
const StyledCancelButton = styled(Button)`
  width: 218px;
  height: 56px;
  @media (max-width: 600px) {
    width: 100%;
  }
  background-color: ${theme.palette.primary.primary500};
  :hover {
    background-color: ${theme.palette.primary.primary300};
  }
  box-sizing: border-box;
`
const StyledBox = styled(Box)`
  width: 516px;
  @media (max-width: 700px) {
    width: 100%;
  }
  height: 191px;
  border-radius: 8px;
  margin: 10px 0 0;
  border: 1px solid ${theme.palette.iconColor.stroke};
`
const StyledSelectedOptionStack = styled(Stack)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px 0 10px;
`
const StyledSelectableStack = styled(Stack)`
  height: 56px;
  display: grid;
  align-items: center;
  :hover {
    background-color: ${theme.palette.structuralColor.cardHover};
  }
  margin: 10px 0;
  padding: 0 20px;
`
const StyledCancelTheTransferButton = styled(Button)`
  color: ${theme.palette.primary.primary500};
  background-color: ${theme.palette.structuralColor.white};
  :hover {
    background-color: ${theme.palette.structuralColor.buttonHover};
  }
  width: 216px;
  height: 56px;
`

interface CancelTransferModalProps {
  handleCancelTransfer: () => void
}

const CancelTransferModal = (props: CancelTransferModalProps) => {
  const [state, setState] = useState({
    modal: false,
    selectAccount: false,
    hasButton: false,
    selectedOption: '',
  })

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setState((prevState) => ({
      ...prevState,
      selectedOption: event.target.value,
      hasButton: true,
    }))
  }

  const handleSelectAccount = () => {
    setState((prevState) => ({
      ...prevState,
      modal: false,
      selectAccount: true,
    }))
  }

  const handleModal = () => {
    setState((prevState) => ({
      ...prevState,
      modal: true,
    }))
  }

  const renderSelectedOptionStack = (accountNumber: string) => {
    return (
      <StyledSelectedOptionStack>
        <Typography
          variant="body2"
          color={theme.palette.textColor.highEmphasis}
        >
          {ROSS_GENER}
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.textColor.highEmphasis}
        >
          {accountNumber}
        </Typography>
      </StyledSelectedOptionStack>
    )
  }

  const renderButtonGrid = () => {
    return (
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="40px"
      >
        <StyledCancelButton onClick={props.handleCancelTransfer}>
          <Typography variant="body2">{CANCEL_TRANSFER_BUTTON}</Typography>
        </StyledCancelButton>
      </Grid>
    )
  }

  const SelectableOption = ({
    option,
  }: {
    option: { id: number; name: string; acctNo: string; value: string }
  }) => {
    return (
      <Stack spacing={1}>
        <Typography
          variant="body2"
          color={theme.palette.textColor.highEmphasis}
        >
          {option.name}
        </Typography>
        <Typography
          variant="caption"
          color={theme.palette.textColor.lowEmphasis}
        >
          {option.acctNo}
        </Typography>
      </Stack>
    )
  }

  const renderSelectedOption = (optionValue: string) => {
    if (optionValue === 'option1') {
      return renderSelectedOptionStack(ACCOUNT_NUMBER_ENDING_WITH_4656)
    }
    return renderSelectedOptionStack(ACCOUNT_NUMBER_ENDING_WITH_4242)
  }

  const renderSelectAccountModal = () => {
    return (
      <Modal isModalOpen={state.selectAccount}>
        <Grid
          display="flex"
          flexDirection="column"
          sx={{ height: state.hasButton ? '357px' : '287px' }}
        >
          <Typography
            variant="body1"
            color={theme.palette.textColor.highEmphasis}
            sx={{ marginBottom: '30px' }}
          >
            {CANCEL_TRANSFER}
          </Typography>
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {WHERE_WOULD_YOU_LIKE_TO_REFUND}
          </Typography>
          <StyledTextField
            label={AN_EXISTING_ACCOUNT}
            disabled
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <Icon src={DownArrowImg} alt={DOWN_ARROW_ALT} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth variant="outlined" sx={{ marginTop: '40px' }}>
            <InputLabel id="demo-simple-select-label">
              {SELECT_AN_OPTION}
            </InputLabel>
            <Select
              value={state.selectedOption}
              labelId="demo-simple-select-label"
              onChange={handleSelectChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    marginTop: '-90px',
                  },
                },
              }}
              renderValue={(option) => renderSelectedOption(option)}
            >
              {CANCEL_TRANSFER_OPTIONS.map((option) => {
                return (
                  <MenuItem value={option.value} key={option.id}>
                    <SelectableOption option={option} />
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          {state.hasButton && renderButtonGrid()}
        </Grid>
      </Modal>
    )
  }

  return (
    <div>
      <StyledCancelTheTransferButton onClick={handleModal}>
        <Typography variant="body2">{CANCEL_THE_TRANSFER}</Typography>
      </StyledCancelTheTransferButton>
      <Modal isModalOpen={state.modal}>
        <Grid display="flex" flexDirection="column" sx={{ height: '287px' }}>
          <Typography
            variant="body1"
            color={theme.palette.textColor.highEmphasis}
            sx={{ marginBottom: '40px' }}
          >
            {CANCEL_TRANSFER}
          </Typography>
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {WHERE_WOULD_YOU_LIKE_TO_REFUND}
          </Typography>
          <StyledBox>
            <StyledSelectableStack>
              <Typography
                variant="body2"
                color={theme.palette.textColor.mediumEmphasis}
              >
                {SELECT_ACCOUNT}
              </Typography>
            </StyledSelectableStack>
            <StyledSelectableStack
              onClick={handleSelectAccount}
              sx={{ ':hover': { cursor: 'pointer' } }}
            >
              <Typography
                variant="body2"
                color={theme.palette.textColor.highEmphasis}
              >
                {AN_EXISTING_ACCOUNT}
              </Typography>
            </StyledSelectableStack>
            <StyledSelectableStack>
              <Typography
                variant="body2"
                color={theme.palette.textColor.highEmphasis}
              >
                {NEW_ACCOUNT}
              </Typography>
            </StyledSelectableStack>
          </StyledBox>
        </Grid>
      </Modal>

      {state.selectAccount && renderSelectAccountModal()}
    </div>
  )
}

export default CancelTransferModal
