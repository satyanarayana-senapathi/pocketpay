import React, { FC } from 'react'
import { Button as MuiButton, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledButton = styled(MuiButton)`
  text-transform: none;
  border-radius: 56px;
`
const Button: FC<ButtonProps> = ({
  children,
  color,
  variant = 'contained',
  disabled,
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      color={color}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}

export default Button
