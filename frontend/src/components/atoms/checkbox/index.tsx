import { Checkbox, styled } from '@mui/material'
import React from 'react'

export interface CustomCheckboxProps {
  checked?: boolean
  height?: string | number
  width?: string | number
  top?: string | number
  left?: string | number
  bgcolor?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
}
const StyledCheckbox = styled(Checkbox)<CustomCheckboxProps>(
  ({ height, width, top, left, bgcolor }) => ({
    height: height ?? 'auto',
    width: width ?? 'auto',
    top: top ?? 'auto',
    left: left ?? 'auto',
    color: bgcolor,
  })
)

const CustomCheckbox = (props: CustomCheckboxProps) => {
  return (
    <StyledCheckbox
      data-testid="myCheck"
      checked={props.checked}
      bgcolor={props.bgcolor}
      onClick={props.onClick}
      disabled={props.disabled}
      height={props.height}
      width={props.width}
      top={props.top}
      left={props.left}
    />
  )
}

export default CustomCheckbox
