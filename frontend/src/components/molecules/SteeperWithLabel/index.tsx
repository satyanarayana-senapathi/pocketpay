import React from 'react'
import {
  Box,
  Slider,
  styled,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import theme from '../../../utils/themes/theme'

type StepObject = {
  leftlable: string
  rightlable: string
}

export interface StepperProps {
  horizontalStepperValues?: string[]
  verticalStepperValues?: StepObject[]
  presentValue: number
  width?: string
  marks?: MarkType[]
  stepperwidth?: string
}

type MarkType = {
  value: number
  label: string
}

const StyledStepperContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
})

const StyledStepLabelContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
})

interface StyledBoxProps {
  width?: string
}

const StyledBox = styled(Box)<StyledBoxProps>(({ width }) => ({
  display: 'flex',
  alignItems: 'center',
  width: width,
  '.MuiSlider-rail': {
    color: theme.palette.iconColor.stroke,
  },
  '.MuiSlider-mark': {
    width: '0px',
  },
  '& .MuiSlider-thumb': {
    color: theme.palette.primary.primary300,
    width: '10px',
    height: '10px',
    ':hover': {
      boxShadow: 'none',
    },
    '&.Mui-focusVisible': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-thumb .Mui-focusVisible': {
    boxShadow: '0px',
  },
  '.MuiSlider-track': {
    color: theme.palette.primary.primary100,
  },
  '.MuiSlider-markLabel': {
    ...theme.typography.caption,
    color: theme.palette.textColor.mediumEmphasis,
  },
  '.MuiSlider-markLabelActive': {
    ...theme.typography.caption,
    color: theme.palette.primary.primary500,
  },
}))

const Circle = () => {
  return <Box className="dot"></Box>
}

const CustomStepper = ({
  presentValue,
  horizontalStepperValues,
  verticalStepperValues,
  width,
  marks = [],
  stepperwidth,
}: StepperProps) => {
  const StepperStyled = styled(Stepper)({
    '& .MuiTypography-root': {
      lineHeight: 0,
      width: stepperwidth,
      textAlign: 'right',
      color: theme.palette.textColor.lowEmphasis,
    },
    '& .MuiStepConnector-line.MuiStepConnector-lineVertical': {
      width: '2px',
      background: theme.palette.primary.primary500,
      borderLeft: 'none',
      height: '31px',
    },
    '& .MuiStepLabel-iconContainer.Mui-disabled': {
      '& .dot': {
        background: theme.palette.iconColor.stroke,
      },
    },
    '& .MuiStepConnector-root.MuiStepConnector-vertical.Mui-disabled': {
      '& span': {
        background: theme.palette.iconColor.stroke,
      },
    },
    '& .MuiStepConnector-root.MuiStepConnector-vertical': {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '0',
      width: '100%',
      margin: '0 auto',
    },
    '& .MuiStepLabel-root.MuiStepLabel-vertical': {
      padding: '0',
    },
    '& .MuiStepLabel-iconContainer': {
      padding: '0',
    },
    '& .right-typo': {
      textAlign: 'left',
    },
    '& .dot': {
      borderRadius: '100%',
      background: theme.palette.primary.primary500,
      width: '8px',
      height: '8px',
    },
    '& .MuiStep-root.MuiStep-vertical.Mui-completed': {
      '& .MuiTypography-root': {
        color: theme.palette.textColor.highEmphasis,
      },
    },
    '& .active-step .MuiTypography-root': {
      color: theme.palette.primary.primary500,
    },
  })
  let percentage = 0
  if (horizontalStepperValues) {
    percentage = 100 / (horizontalStepperValues.length - 1)
    const calculatedMarks =
      marks.length > 0
        ? marks
        : horizontalStepperValues.map((item, index) => ({
            value: index * percentage,
            label: item,
          }))
    return (
      <StyledBox width={width}>
        <Slider
          marks={calculatedMarks}
          value={(presentValue - 1) * percentage}
          data-testid="horizontal-slider"
        />
      </StyledBox>
    )
  }
  if (verticalStepperValues) {
    return (
      <StepperStyled
        orientation="vertical"
        activeStep={presentValue - 1}
        style={{ width }}
        data-testid="vertical-stepper"
        sx={{
          marginLeft: '-2rem',
        }}
      >
        {verticalStepperValues.map((step, index) => (
          <Step
            key={step.leftlable}
            className={index === presentValue - 1 ? 'active-step' : ''}
          >
            <StyledStepperContainer>
              <StyledStepLabelContainer>
                <Typography variant="caption">{step.leftlable}</Typography>
              </StyledStepLabelContainer>
              <Box margin={'0rem 2rem'}>
                <StepLabel StepIconComponent={Circle} />
              </Box>
              <StyledStepLabelContainer>
                <Typography variant="caption" className="right-typo">
                  {step.rightlable}
                </Typography>
              </StyledStepLabelContainer>
            </StyledStepperContainer>
          </Step>
        ))}
      </StepperStyled>
    )
  }
}

export default CustomStepper
