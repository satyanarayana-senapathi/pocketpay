import { Box, styled } from '@mui/material'
import Typography from '../../atoms/Typography'
import { AC_header } from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import Icon from '../../atoms/icon'
import Button from '../../atoms/button'

interface AccountCardProps {
  item: AccountCardPropsArray[]
}

interface AccountCardPropsArray {
  id: string
  iconSrc: string
  iconAlt: string
  optionMain: string
  optionBody: string
  active: boolean
  onClick: () => void
}

const OuterBox = styled(Box)({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
})

const InnerBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyItems: 'center',
  position: 'relative',
  padding: '13px 0px 16px 14px',
})

const OptionButton = styled(Button)({
  width: '100%',
  border: `1px solid ${theme.palette.iconColor.stroke}`,
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyItems: 'flex-start',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.cardHover,
    borderColor: theme.palette.iconColor.stroke,
  },
})

const IconStyle = styled(Box)({
  width: '34px',
  height: '34px',
  marginTop: '12px',
})

const AccountCard = ({ item }: AccountCardProps) => {
  return (
    <OuterBox>
      <Typography variant="h1" color={theme.palette.textColor.highEmphasis}>
        {AC_header}
      </Typography>
      {item.map((value) => (
        <OptionButton
          key={value.id}
          variant="outlined"
          onClick={value.onClick}
          disabled={!value.active}
          disableElevation
          disableRipple
        >
          <IconStyle>
            <Icon src={value.iconSrc} alt={value.iconAlt}></Icon>
          </IconStyle>
          <InnerBox>
            <Typography
              variant="body2"
              color={theme.palette.textColor.highEmphasis}
            >
              {value.optionMain}
            </Typography>
            <Typography
              variant="caption"
              color={theme.palette.textColor.lowEmphasis}
            >
              {value.optionBody}
            </Typography>
          </InnerBox>
        </OptionButton>
      ))}
    </OuterBox>
  )
}

export default AccountCard
