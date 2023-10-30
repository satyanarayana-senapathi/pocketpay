import * as React from 'react'
import Radio, { RadioProps } from '@mui/material/Radio'
import theme from '../../../utils/themes/theme'

interface RadioPropsType extends RadioProps {
  size?: 'medium' | 'small'
}

const RadioButton: React.FC<RadioPropsType> = ({ size, ...props }) => {
  return (
    <div>
      <Radio
        value="checked"
        size={size}
        name="radio-buttons"
        sx={{
          color: theme.palette.iconColor.stroke,
          '&.Mui-checked': {
            color: `${theme.palette.primary.primary500}`,
          },
        }}
        {...props}
      />
    </div>
  )
}

export default RadioButton
