import { Box, Divider, Stack, Typography, styled } from '@mui/material'
import AvatarTypograpy from '../../molecules/AvatarWithTypo'
import Icon from '../../atoms/icon'
import LOGO from '../../../../public/assets/image/logo.svg'
import Button from '../../atoms/button'
import theme from '../../../utils/themes/theme'
import {
  SIDEBAR_BALANCE_VALUES,
  SIDEBAR_VALUES,
} from '../../../utils/constants'
import CustomChip from '../../atoms/Chip'

interface SidebarProps {
  showDetail?: boolean
  handleClick?: () => void
}

const LogoBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '1.5rem',
  marginBottom: '2.31rem',
})

const ButtonStyle = styled(Button)({
  height: '34px',
  backgroundColor: theme.palette.structuralColor.contrastText,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '7px',
  '&:hover': {
    backgroundColor: theme.palette.iconColor.stroke,
  },
})

const HeadingStyle = styled(Box)({
  backgroundColor: theme.palette.structuralColor.contrastText,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginLeft: '15px',
})

const Sidebar = ({ showDetail, handleClick }: SidebarProps) => {
  return (
    <Box>
      <Box>
        <LogoBox>
          <Icon src={LOGO}></Icon>
        </LogoBox>
        <Stack spacing={'1rem'}>
          {SIDEBAR_VALUES.map((value) =>
            value.id === 4 ? (
              <ButtonStyle
                key={value.id}
                onClick={handleClick}
                disabled={value.disabled}
                variant="text"
                disableRipple
                disableElevation
              >
                <AvatarTypograpy
                  color={theme.palette.textColor.mediumEmphasis}
                  icon={value.iconSrc}
                  content={value.optionText}
                  variant="caption"
                ></AvatarTypograpy>
                <CustomChip
                  label="New"
                  style={{ marginLeft: '1.5rem', height: '30px' }}
                ></CustomChip>
              </ButtonStyle>
            ) : (
              <ButtonStyle
                key={value.id}
                onClick={handleClick}
                disabled={value.disabled}
                variant="text"
                disableRipple
                disableElevation
              >
                <AvatarTypograpy
                  color={
                    value.optionText === 'Home'
                      ? theme.palette.primary.primary500
                      : theme.palette.textColor.mediumEmphasis
                  }
                  icon={value.iconSrc}
                  content={value.optionText}
                  variant="caption"
                ></AvatarTypograpy>
              </ButtonStyle>
            )
          )}
        </Stack>
        {showDetail && (
          <Stack spacing={'1rem'}>
            {SIDEBAR_BALANCE_VALUES.map((value) =>
              value.id === 1 || value.id === 5 ? (
                <Box key={value.id}>
                  <Divider sx={{ margin: '1rem 0rem' }} />
                  <HeadingStyle>
                    <Typography
                      variant="caption"
                      color={theme.palette.textColor.mediumEmphasis}
                      marginBottom={'8px'}
                    >
                      {value.heading}
                    </Typography>
                  </HeadingStyle>
                  <ButtonStyle
                    onClick={handleClick}
                    disabled={value.disabled}
                    variant="text"
                    disableRipple
                    disableElevation
                  >
                    <AvatarTypograpy
                      color={theme.palette.textColor.mediumEmphasis}
                      icon={value.iconSrc}
                      content={value.optionText}
                      variant="caption"
                    ></AvatarTypograpy>
                  </ButtonStyle>
                </Box>
              ) : (
                <Box key={value.id}>
                  <ButtonStyle
                    onClick={handleClick}
                    disabled={value.disabled}
                    variant="text"
                    disableRipple
                    disableElevation
                  >
                    <AvatarTypograpy
                      color={theme.palette.textColor.mediumEmphasis}
                      icon={value.iconSrc}
                      content={value.optionText}
                      variant="caption"
                    ></AvatarTypograpy>
                  </ButtonStyle>
                </Box>
              )
            )}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar
