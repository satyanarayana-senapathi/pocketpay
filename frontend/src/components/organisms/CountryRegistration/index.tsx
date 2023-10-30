import ComboBox, { OptionItem } from '../../atoms/Autocomplete'
import Typography from '../../atoms/Typography'
import Button from '../../atoms/button'
import { Box, styled } from '@mui/material'
import {
  ANDORA,
  AUSTRIA,
  IND,
  UK,
  COUNTRY_REGISTRATION,
  CONTINUE,
  SELECT_YOUR_COUNTRY,
} from '../../../utils/constants'
import theme from '../../../utils/themes/theme'
import React from 'react'

export interface CountryRegistrationProps {
  width?: string
  height?: string
  top?: string
  left?: string
  comboWidth?: string
  comboHeight?: string
  onClick?: () => void
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px 20px',
})

const ContentBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginBottom: '46vh',
})

const Heading = styled(Typography)({
  marginBottom: '2rem',
})

const ButtonBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
})

const ContinueButton = styled(Button)({
  width: '135px',
  height: '56px',
  '&:hover': {
    backgroundColor: theme.palette.structuralColor.lightPurple,
  },
})

export const CountryRegistration: React.FC<CountryRegistrationProps> = ({
  width,
  height,
  top,
  left,
  comboWidth,
  comboHeight,
  onClick,
}) => {
  const getOptionImage = (option: OptionItem) => {
    return (
      <img
        src={option.imageUrl}
        alt={option.label}
        data-testid={`option-image-${option.label}`}
      />
    )
  }

  const options: OptionItem[] = [
    { label: 'ANDORA', imageUrl: `${ANDORA}` },
    { label: 'UNITED KINGDOM', imageUrl: `${UK}` },
    { label: 'AUSTRIA', imageUrl: `${AUSTRIA}` },
    { label: 'INDIA', imageUrl: `${IND}` },
  ]

  const [selectedOption, setSelectedOption] = React.useState<OptionItem | null>(
    null
  )

  const handleOptionChange = (option: OptionItem | null) => {
    setSelectedOption(option)
  }
  return (
    <StyledBox
      height={height}
      width={width}
      marginLeft={left}
      marginTop={top}
      data-testid="box-id"
    >
      <ContentBox>
        <Heading variant="h1" data-testid="country-registration-heading">
          {COUNTRY_REGISTRATION}
        </Heading>
        <ComboBox
          width={comboWidth}
          height={comboHeight}
          label={SELECT_YOUR_COUNTRY}
          options={options}
          getOptionImage={getOptionImage}
          data-testid="country-combo-box"
          onChange={handleOptionChange}
        />
      </ContentBox>
      <ButtonBox data-testid="continue-button-box">
        <ContinueButton disabled={!selectedOption} onClick={onClick}>
          <Typography
            variant="body2"
            color={theme.palette.structuralColor.white}
          >
            {CONTINUE}
          </Typography>
        </ContinueButton>
      </ButtonBox>
    </StyledBox>
  )
}
