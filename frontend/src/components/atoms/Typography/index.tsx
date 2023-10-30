import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material'
import React from 'react'

export type TypographyProps = MuiTypographyProps

const Typography = (props: TypographyProps) => {
  return (
    <div>
      <MuiTypography {...props}>{props.children}</MuiTypography>
    </div>
  )
}

export default Typography
