import React from 'react'
import { TextField, styled } from '@mui/material'
import theme from '../../../utils/themes/theme'

interface TextFieldProps {
  children?: React.ReactNode | string
  variant?: 'standard' | 'outlined' | 'filled'
  placeholder?: string
  sx?: object
  label?: string
  style?: React.CSSProperties
  inputProps?: object
  InputProps?: object
  width?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  helperText?: string
  default?: string
  size?: 'medium' | 'small'
  type?: string
  error?: boolean
  value?: number | string
  name?: string
  multiline?: boolean
}
const CustomField = styled(TextField)({
  border: 1,
  borderColor: theme.palette.iconColor.stroke,
  borderRadius: '8px',
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.iconColor.stroke,
      color: theme.palette.textColor.lowEmphasis,
      borderRadius: '8px',
    },
  },
})

const CustomTextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  return <CustomField {...props} />
}

export default CustomTextField
