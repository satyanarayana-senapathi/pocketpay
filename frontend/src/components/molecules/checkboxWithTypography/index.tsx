import React from 'react'
import Typography from '../../atoms/Typography'
import CustomCheckbox from '../../atoms/checkbox'
import { Grid } from '@mui/material'

interface CheckboxWithTypographyProps {
  children: string
  onClick?: () => void
  color: string | undefined
}

const CheckboxWithTypography = ({
  children,
  onClick,
  color,
}: CheckboxWithTypographyProps) => {
  return (
    <div>
      <Grid display="flex" flexDirection="row" alignItems="center">
        <CustomCheckbox onClick={onClick} />
        <Typography variant="body3" color={color}>
          {children}
        </Typography>
      </Grid>
    </div>
  )
}

export default CheckboxWithTypography
