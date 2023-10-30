import React from 'react'
import AvatarImg from '../../../../public/assets/image/avatar.svg'
import Avatar from '../../atoms/Avatar'
import {
  AVATAR_ID,
  AVATAR_NAME,
  PERSON_AVATAR_ALT,
} from '../../../utils/constants'
import { Grid, IconButton, Popover, Stack, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import Icon from '../../atoms/icon'
import theme from '../../../utils/themes/theme'
import { useAuth0 } from '@auth0/auth0-react'

const StyledOptionStack = styled(Stack)`
  height: 56px;
  cursor: pointer;
`
const StyledPopoverGrid = styled(Grid)`
  width: 230px;
  border-radius: 4px;
  height: 309px;
`
const StyledOptionGrid = styled(Grid)`
  padding: 10px;
  margin-left: 15px;
`

interface AvatarDropdownProps {
  dropdownOptions: Option[]
}

interface Option {
  id: number
  children: string
  src: string
  alt: string
}

const AvatarDropdown = ({ dropdownOptions }: AvatarDropdownProps) => {
  const { logout } = useAuth0()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOptionClick = (id: number) => {
    if (id === 4) {
      logout({ logoutParams: { returnTo: window.location.origin } })
    }
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <IconButton
        onClick={handleDropdown}
        disableTouchRipple
        disableRipple
        sx={{ p: 0 }}
        data-testid="avatar-dropdown-button"
      >
        <Avatar src={AvatarImg} alt={PERSON_AVATAR_ALT} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledPopoverGrid>
          <Stack border={`1px solid ${theme.palette.iconColor.stroke}`}>
            <StyledOptionGrid>
              <Typography
                variant="body2"
                color={theme.palette.textColor.highEmphasis}
                sx={{ marginBottom: '7px' }}
              >
                {AVATAR_NAME}
              </Typography>
              <Typography
                variant="caption"
                color={theme.palette.textColor.lowEmphasis}
              >
                {AVATAR_ID}
              </Typography>
            </StyledOptionGrid>
          </Stack>
          {dropdownOptions.map((option) => {
            return (
              <StyledOptionStack
                display="flex"
                key={option.id}
                flexDirection="row"
                alignItems="center"
                onClick={() => handleOptionClick(option.id)}
                data-testid={`dropdown-option-${option.id}`}
              >
                <Icon
                  src={option.src}
                  alt={option.alt}
                  style={{ margin: '0 20px' }}
                />
                <Typography
                  variant="body2"
                  color={theme.palette.textColor.highEmphasis}
                >
                  {option.children}
                </Typography>
              </StyledOptionStack>
            )
          })}
        </StyledPopoverGrid>
      </Popover>
    </div>
  )
}

export default AvatarDropdown
