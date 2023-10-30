import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import theme from '../../../utils/themes/theme'
import Typography from '../Typography'

export interface OptionItem {
  imageUrl?: string
  label?: string
  subcategories?: OptionItem[]
}

export interface ComboBoxProps {
  label?: string
  placeholder?: string
  options: OptionItem[]
  width?: number | string
  height?: number | string
  backgroundColor?: string
  value?: OptionItem | null
  onChange?: (value: OptionItem | null) => void
  getOptionImage?: (option: OptionItem) => React.ReactNode
  getOptionSubcategories?: (option: OptionItem) => OptionItem[]
}

const StyledTextField = styled(TextField)({
  display: 'flex',
  alignItems: 'center',
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
})

const StyledBox = styled(Box)({
  '& .MuiAutocomplete-option.Mui-focused': {
    backgroundColor: theme.palette.structuralColor.white,
  },
  '& .MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
    backgroundColor: theme.palette.structuralColor.white,
  },
  '& .MuiAutocomplete-option[aria-selected="true"]': {
    backgroundColor: theme.palette.structuralColor.white,
  },
  display: 'flex',
  alignItems: 'stretch',
  flexDirection: 'column',
  justifyContent: 'flex-start',
})

const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  options,
  width,
  height,
  backgroundColor,
  onChange,
  getOptionImage,
  value,
}) => {
  const renderOptionImage = (option: OptionItem) => {
    if (getOptionImage) {
      return getOptionImage(option)
    }
    return null
  }

  const handleOnChange = (
    event: React.ChangeEvent<unknown>,
    newValue: OptionItem | null
  ) => {
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      style={{ width: width, height: height }}
      onChange={handleOnChange}
      value={value}
      renderOption={(props, option) => (
        <StyledBox>
          <li {...props} style={{ padding: 16, gap: 24 }}>
            {renderOptionImage(option)}
            <Typography
              variant="body2"
              color={theme.palette.textColor.highEmphasis}
            >
              {option.label}
            </Typography>
          </li>
        </StyledBox>
      )}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label={label ?? 'Select currency'}
          sx={{ backgroundColor: { backgroundColor } }}
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  )
}

export default ComboBox
