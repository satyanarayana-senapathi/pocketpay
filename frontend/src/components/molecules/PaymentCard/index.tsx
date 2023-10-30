import { Box, styled, Stack } from '@mui/material'
import Icon from '../../atoms/icon'
import Typography from '../../atoms/Typography'
import RadioButton from '../../atoms/radioButton'

export interface PaymentCardProps {
  backgroundColor?: string
  icon?: string
  cardContent?: string
  primaryContent?: string
  secondaryContent?: string
  color?: string
  cardVariant?: 'h1' | 'body1' | 'body2' | 'body3' | 'caption' | 'underlineText'
  detailVariant?:
    | 'h1'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'caption'
    | 'underlineText'
  width?: string
  height?: string
  iconColor?: string
  flexDirection: string
  isSelected?: boolean
  cardVariantStyle?: React.CSSProperties
  detailVariantStyle?: React.CSSProperties
  onClick?: () => void
}

const StyledContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 0px',
})

const PaymentCard: React.FC<PaymentCardProps> = ({
  backgroundColor,
  icon,
  cardContent,
  primaryContent,
  secondaryContent,
  cardVariantStyle,
  color,
  detailVariantStyle,
  cardVariant,
  detailVariant,
  width,
  height,
  iconColor,
  flexDirection,
  isSelected,
  onClick,
}) => {
  return (
    <div data-testid="payment-card">
      <Box
        bgcolor={backgroundColor}
        display="flex"
        alignItems="center"
        width={width}
        height={height}
        data-testid="box-id"
        justifyContent={'space-between'}
        sx={{ flexDirection: flexDirection }}
      >
        <StyledContent>
          {icon && (
            <Box sx={{ margin: '0px 30px' }}>
              <Icon
                data-testid="icon"
                src={icon}
                alt="icon"
                style={{
                  width: '1.4rem',
                  height: '1.4rem',
                  backgroundColor: `${iconColor}`,
                  borderRadius: '50%',
                  padding: '8px',
                }}
              />
            </Box>
          )}
          <Stack direction="column">
            <Typography
              data-testid="card-content"
              variant={cardVariant}
              style={cardVariantStyle}
            >
              {cardContent}
            </Typography>
            <Typography
              data-testid="detail-content1"
              variant={detailVariant}
              style={detailVariantStyle}
              color={color}
            >
              {primaryContent}
            </Typography>
            <Typography
              data-testid="detail-content2"
              variant={detailVariant}
              color={color}
            >
              {secondaryContent}
            </Typography>
          </Stack>
        </StyledContent>
        <Box>
          <RadioButton
            sx={{ margin: '0px 15px' }}
            checked={isSelected}
            size="small"
            data-testid="radio-button"
            onClick={onClick}
          />
        </Box>
      </Box>
    </div>
  )
}

export default PaymentCard
