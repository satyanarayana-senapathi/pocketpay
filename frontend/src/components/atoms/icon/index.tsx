import React from 'react'

interface IconProps {
  src?: string
  alt?: string
  style?: React.CSSProperties
}

const Icon: React.FC<IconProps> = ({ src, alt, style }) => (
  <img src={src} alt={alt} style={style} />
)
export default Icon
