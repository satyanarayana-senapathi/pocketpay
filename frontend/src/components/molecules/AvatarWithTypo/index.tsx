import React from 'react'
import Icon from '../../atoms/icon'
import Typography from '../../atoms/Typography'
import { Box } from '@mui/material'
import theme from '../../../utils/themes/theme'

export type AvatarTypograpyProps = {
  icon?: string
  content?: string
  variant?: 'h1' | 'body1' | 'body2' | 'body3' | 'caption' | 'underlineText'
  width?: string
  height?: string
  color?: string
}

const StyledContent = ({ children }: { children: React.ReactNode }) => (
  <Box display="flex" alignItems="center">
    {children}
  </Box>
)

const AvatarTypograpy: React.FC<AvatarTypograpyProps> = ({
  icon,
  content,
  variant,
  width,
  height,
  color,
}) => {
  return (
    <div data-testid="avatar-typography">
      <Box
        display="flex"
        alignItems="center"
        paddingLeft={theme.spacing(2)}
        width={width}
        height={height}
        data-testid="box-id"
      >
        <StyledContent>
          <Icon
            data-testid="icon"
            src={icon}
            alt="icon"
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
          <Typography
            data-testid="avatar-typography-content"
            style={{ marginLeft: theme.spacing(5) }}
            variant={variant}
            color={color}
          >
            {content}
          </Typography>
        </StyledContent>
      </Box>
    </div>
  )
}

export default AvatarTypograpy
