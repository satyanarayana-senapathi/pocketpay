import React from 'react'
import Typography from '../../atoms/Typography'
import { RECIPEINT_TYPE } from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import { Grid, Stack } from '@mui/material'
import Icon from '../../atoms/icon'
import styled from '@emotion/styled'

interface RecipientTypeProps {
  handleClick?: () => void
  labels: RecipientProps[]
  cardId: number
  padding: string
}
interface RecipientProps {
  id: number
  src: string
  alt: string
  children: string
}

const StyledStack = styled(Stack)(() => ({
  border: `1px solid ${theme.palette.iconColor.stroke}`,
  margin: '20px 0',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}))

const RecipientType = ({
  handleClick,
  cardId,
  padding,
  labels,
}: RecipientTypeProps) => {
  return (
    <div>
      <Typography variant="h1">{RECIPEINT_TYPE}</Typography>
      <Grid>
        {labels.map((value) => {
          return (
            <StyledStack
              key={value.id}
              sx={{
                ':hover': {
                  cursor: value.id === cardId ? 'pointer' : 'default',
                  backgroundColor: theme.palette.structuralColor.cardHover,
                },
                padding: { padding },
              }}
              onClick={value.id === cardId ? handleClick : undefined}
            >
              <Icon
                src={value.src}
                alt={value.alt}
                style={{ height: '34px', marginRight: '20px' }}
              />
              <Typography
                variant="body2"
                color={theme.palette.textColor.highEmphasis}
              >
                {value.children}
              </Typography>
            </StyledStack>
          )
        })}
      </Grid>
    </div>
  )
}

export default RecipientType
