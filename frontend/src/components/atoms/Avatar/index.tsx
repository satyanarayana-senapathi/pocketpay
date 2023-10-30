import React from 'react'
import { styled } from '@mui/material/styles'
import { Avatar } from '@mui/material'

export interface AvatarProps {
  src?: string
  alt?: string
  width?: string
  height?: string
}

const StyledAvatar = styled(Avatar)<AvatarProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
`

const CustomAvatar = ({ src, alt, width, height }: AvatarProps) => {
  return <StyledAvatar src={src} alt={alt} width={width} height={height} />
}

export default CustomAvatar
