import React from 'react'
import Icon from '../../atoms/icon'
import Typography from '../../atoms/Typography'
import { Box, styled } from '@mui/material'
import theme from '../../../utils/themes/theme'
import Image from '../../atoms/image'
import arrow from '../../../../public/assets/image/chevronright.svg'

export type IconTypograpyProps = {
  backgroundColor?: string
  icon?: string
  content?: string
  color?: string
  variant?: 'h1' | 'body1' | 'body2' | 'body3' | 'caption' | 'underlineText'
  width?: string
  height?: string
  sx?: React.CSSProperties
}

const StyledContent = ({ children }: { children: React.ReactNode }) => (
  <Box display="flex" alignItems="center" width="100%">
    {children}
  </Box>
)

const StyledImage = styled(Image)({
  marginLeft: 'auto',
  marginRight: '10px',
})

const IconTypograpy: React.FC<IconTypograpyProps> = ({
  backgroundColor,
  icon,
  content,
  color,
  variant,
  width,
  height,
  sx,
}) => {
  return (
    <div data-testid="icon-typography">
      <Box
        bgcolor={backgroundColor}
        display="flex"
        alignItems="center"
        paddingLeft={theme.spacing(2)}
        paddingRight={theme.spacing(2)}
        width={width}
        height={height}
        sx={{
          ...sx,
          height: height ?? '3.125rem',
          ':hover': {
            backgroundColor: theme.palette.structuralColor.cardHover,
          },
        }}
        data-testid="box-id"
      >
        <StyledContent>
          {icon && (
            <Icon
              data-testid="icon"
              src={icon}
              alt="icon"
              style={{ width: '1.75rem', height: '1.75rem' }}
            />
          )}
          <Typography
            data-testid="icon-typography-content"
            style={{ marginLeft: theme.spacing(5) }}
            variant={variant}
            color={color}
          >
            {content}
          </Typography>
        </StyledContent>
        <StyledImage
          data-testid="icon-typography-chevron"
          source={arrow}
          style={{ width: '1.5rem', height: '1.5rem' }}
        />
      </Box>
    </div>
  )
}

export default IconTypograpy
