import Typography from '../../atoms/Typography'
import { Box, styled } from '@mui/material'
import Icon from '../../atoms/icon'
import arrowUpRight from '../../../../public/assets/image/arrow-up-right.svg'
import theme from '../../../utils/themes/theme'
import dropDown from '../../../../public/assets/image/dropdown.svg'
import { useEffect, useState } from 'react'
import { API } from '../../../services/api/api'

export interface TransferStatusHeaderProps {
  height?: string
  width?: string
  top?: string
  left?: string
  radius?: string
  borderColor?: string
  iconBackgroundColor?: string
  dropdownContent?: React.ReactNode
  dropdownBoxTop?: string
  dropdownBoxLeft?: string
  name?: string
  amountSend?: string
  amountReceived?: string
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom: '1rem',
})

const IconBox = styled(Box)({
  height: '2.5rem',
  width: '2.5rem',
  borderRadius: '50%',
  marginTop: '1.37rem',
  marginLeft: '2.25rem',
})

const DropdownIcon = styled(Box)({
  cursor: 'pointer',
  marginRight: '32px',
  marginTop: '2.7rem',
  height: '2px',
  display: 'flex',
  alignItems: 'center',
})

const DropdownBox = styled(Box)({
  position: 'absolute',
})

export const TransferStatusHeader: React.FC<TransferStatusHeaderProps> = ({
  height,
  width,
  top,
  left,
  radius,
  borderColor,
  iconBackgroundColor,
  dropdownContent,
  dropdownBoxTop,
  dropdownBoxLeft,
  name,
  amountSend,
  amountReceived,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [arrowRotation, setArrowRotation] = useState(0)

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
    setArrowRotation((arrowRotation) => arrowRotation + 180)
  }

  const [statusvalue, setStatusValue] = useState('')
  useEffect(() => {
    let status = null
    try {
      API.get('/transfer').then((response) => {
        if (response) {
          const data = response.data
          if (data && data.length > 0) {
            status = data[data.length - 1].status
            setStatusValue(status)
          }
        }
      })
    } catch (error) {
      console.log('Get Error')
    }
  }, [statusvalue])

  return (
    <StyledBox
      width={width}
      height={height}
      marginTop={top}
      marginLeft={left}
      borderRadius={radius}
      color={borderColor}
      data-testid="outer-box"
    >
      <Box display={'flex'} flexDirection={'row'} justifyContent={'start'}>
        <IconBox bgcolor={iconBackgroundColor}>
          <Icon
            src={arrowUpRight}
            style={{
              width: '40px',
              height: '40px',
            }}
          />
        </IconBox>
        <Box marginTop={'1.37rem'} marginLeft={'0.75rem'}>
          <Typography
            variant="body2"
            color={theme.palette.textColor.highEmphasis}
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {statusvalue}
          </Typography>
        </Box>
      </Box>

      <Box display={'flex'} flexDirection={'row'} justifyContent={'end'}>
        <Box marginTop={'1.37rem'} marginLeft={'0.75rem'} marginRight={'1rem'}>
          <Typography
            variant="caption"
            color={theme.palette.textColor.highEmphasis}
          >
            {amountSend}
          </Typography>
          <Typography
            variant="caption"
            color={theme.palette.textColor.mediumEmphasis}
          >
            {amountReceived}
          </Typography>
        </Box>
        <DropdownIcon
          onClick={handleDropdownClick}
          data-testid="dropdown-icon"
          style={{
            transform: `rotate(${arrowRotation}deg)`,
          }}
        >
          <Icon src={dropDown} style={{ width: '20px', height: '20px' }} />
        </DropdownIcon>

        {isDropdownOpen && (
          <DropdownBox marginTop={dropdownBoxTop} marginLeft={dropdownBoxLeft}>
            {dropdownContent}
          </DropdownBox>
        )}
      </Box>
    </StyledBox>
  )
}
