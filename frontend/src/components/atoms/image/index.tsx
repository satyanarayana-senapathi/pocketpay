import React from 'react'

interface ImageProps {
  source?: string
  alt?: string
  style?: React.CSSProperties
}

const Image = ({ source, alt, style }: ImageProps) => {
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    ...style,
  }
  return <img style={imageStyle} src={source} alt={alt}></img>
}

export default Image
