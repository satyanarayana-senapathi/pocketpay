import AvatarDropdown from '../avatarDropdown'
import { Box, styled } from '@mui/material'
import bell from '../../../../public/assets/image/bell.svg'
import theme from '../../../utils/themes/theme'
import Typography from '../../atoms/Typography'
import { ROSS_GENER, dropdownValues } from '../../../utils/constants'
import Icon from '../../atoms/icon'

export interface HeaderProps {
  height?: string
  width?: string
  left?: string
  top?: string
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  alignItems: 'center',
  border: '1px',
  boxShadow: '0px 1px 8px 0px',
  backgroundColor: theme.palette.structuralColor.white,
})

const StyledBellIcon = styled(Icon)({
  width: '1.5rem',
  height: '1.5rem',
})

export const Header: React.FC<HeaderProps> = ({ width, height, top, left }) => {
  return (
    <StyledBox
      width={width}
      height={height}
      marginTop={top}
      marginLeft={left}
      data-testid="styled-box"
    >
      <Box display={'flex'} margin={'10px'} alignItems={'center'}>
        <Box marginRight={'20px'} width={'1.5rem'} height={'1.5rem'}>
          <StyledBellIcon src={bell} alt="icon-bell" />
        </Box>

        <Box
          display={'flex'}
          flexDirection={'row'}
          marginLeft={'1.5rem'}
          marginRight={'1.5rem'}
          alignItems={'center'}
          gap={'15px'}
        >
          <AvatarDropdown dropdownOptions={dropdownValues} />
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {ROSS_GENER}
          </Typography>
        </Box>
      </Box>
    </StyledBox>
  )
}
