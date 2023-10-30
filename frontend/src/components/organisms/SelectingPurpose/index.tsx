import { Box, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import ComboBox, { OptionItem } from '../../atoms/Autocomplete'
import theme from '../../../utils/themes/theme'
import Button from '../../atoms/button'
import {
  SP_HEADING,
  SP_LABEL_OPTION,
  SP_SUBHEADING,
  SP_OPTIONS,
  CONTINUE,
} from '../../../utils/constants'
import { useState } from 'react'
import { useSendMoneyData } from '../../../Context/SendMoneyContext'

interface OptionData {
  selectedPurpose: OptionItem | null
}

interface SelectingPurposeProps {
  optionDetails: OptionData
  handleClick: () => void
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  padding: '5px',
})

const DataBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '18rem',
})

const BottomBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
})

const InnerStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: '2rem',
})

const ButtonStyle = styled(Button)({
  width: '135px',
  height: '56px',
  borderRadius: '56px',
  color: theme.palette.textColor.contrastText,
  backgroundColor: theme.palette.primary.primary500,
  '&:hover': {
    backgroundColor: theme.palette.primary.primary300,
  },
})

const SelectingPurpose = (props: SelectingPurposeProps) => {
  const { updateSendMoneyData } = useSendMoneyData()
  const [optionDetails, setOptionDetails] = useState<OptionData>(
    props.optionDetails
  )
  const handlePurposeChange = (option: OptionItem | null) => {
    const payment_purpose = option?.label
    updateSendMoneyData({ payment_purpose })
    setOptionDetails((prevOptionDetails) => ({
      ...prevOptionDetails,
      selectedPurpose: option,
    }))
  }
  return (
    <StyledBox>
      <DataBox sx={{ width: '516px' }}>
        <InnerStack spacing={'0.75rem'}>
          <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
            {SP_HEADING}
          </Typography>
          <Typography
            variant="body3"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {SP_SUBHEADING}
          </Typography>
        </InnerStack>
        <Box>
          <ComboBox
            label={SP_LABEL_OPTION}
            value={optionDetails.selectedPurpose}
            onChange={handlePurposeChange}
            options={SP_OPTIONS}
          ></ComboBox>
        </Box>
      </DataBox>
      <BottomBox>
        <ButtonStyle onClick={props.handleClick}>
          <Typography
            variant="body2"
            color={theme.palette.structuralColor.white}
          >
            {CONTINUE}
          </Typography>
        </ButtonStyle>
      </BottomBox>
    </StyledBox>
  )
}

export default SelectingPurpose
