import Typography from '../../atoms/Typography'
import helpCircle from '../../../../public/assets/image/helpcircle.svg'
import { Box, styled, Stack } from '@mui/material'
import { DETAILS, GENERAL, UPDATES } from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import dropDownArrow from '../../../../public/assets/image/dropdown.svg'
import Icon from '../../atoms/icon'
import ShareTrackingModal from '../shareTrackingModal'

export interface TabSwitchingHeaderProps {
  width?: string
  height?: string
  top?: string
  left?: string
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderColor: theme.palette.iconColor.stroke,
})

const SelectorStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'flex-start',
  alignItems: 'flex-end',
})

const IconStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  alignItems: 'center',
  margin: '1rem 2.25rem 1rem 0rem',
})

const StyledUpdatesBox = styled(Box)({
  marginLeft: '2.31rem',
  marginRight: '1.41rem',
  paddingBottom: '0.75rem',
  borderBottom: `2px solid ${theme.palette.primary.primary500}`,
})

const DropdownStyle = styled(Box)({
  borderRadius: '4px',
  border: '1px solid',
  color: theme.palette.iconColor.stroke,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '11px 4px',
  backgroundColor: theme.palette.structuralColor.blue,
})

export const TabSwitchingHeader: React.FC<TabSwitchingHeaderProps> = ({
  width,
  height,
  top,
  left,
}) => {
  return (
    <StyledBox
      width={width}
      height={height}
      marginTop={top}
      marginLeft={left}
      borderBottom={'1px solid'}
      data-testid="outer_box"
    >
      <SelectorStyle>
        <StyledUpdatesBox>
          <Typography
            variant="caption"
            color={theme.palette.primary.primary500}
          >
            {UPDATES}
          </Typography>
        </StyledUpdatesBox>
        <Box sx={{ paddingBottom: '0.8rem' }}>
          <Typography variant="caption">{DETAILS}</Typography>
        </Box>
      </SelectorStyle>

      <IconStack direction="row" spacing="1.25rem">
        <DropdownStyle>
          <Typography
            sx={{
              marginLeft: '20px',
            }}
            variant="body2"
            color={theme.palette.textColor.highEmphasis}
          >
            {GENERAL}
          </Typography>
          <Icon
            src={dropDownArrow}
            style={{
              width: '1.5rem',
              height: '1.5rem',
            }}
          />
        </DropdownStyle>
        <ShareTrackingModal />
        <Icon
          src={helpCircle}
          style={{
            width: '1.5rem',
            height: '1.5rem',
          }}
          alt="help-circle"
        />
      </IconStack>
    </StyledBox>
  )
}
