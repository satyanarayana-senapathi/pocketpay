import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from '../../../utils/themes/theme'
import React from 'react'
import Icon from '../../atoms/icon'
import Button from '../../atoms/button'

const IconButton = styled(Button)({
  width: '56px',
  height: '56px',
  borderRadius: '4px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0px 50px',
  backgroundColor: theme.palette.primary.contrastText,
  borderColor: theme.palette.iconColor.stroke,
  '&:hover': {
    backgroundColor: theme.palette.primary.contrastText,
    borderColor: theme.palette.iconColor.stroke,
  },
})

interface PartySignUp {
  id: number
  partyIcon: string
  onClick: () => void
  active?: boolean
}

interface ThirdPartySignUpProps {
  thirdPartySignUpArray: PartySignUp[]
}

const IconGrid = (props: ThirdPartySignUpProps) => {
  return (
    <Stack direction="row">
      {props.thirdPartySignUpArray.map((item) => (
        <IconButton
          key={item.id}
          name={item.partyIcon}
          disabled={!item.active}
          variant="outlined"
          disableElevation
          disableRipple
          onClick={item.onClick}
        >
          <Icon src={item.partyIcon} />
        </IconButton>
      ))}
    </Stack>
  )
}

export default IconGrid
