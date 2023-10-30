import { Grid, styled } from '@mui/material'
import React from 'react'
import theme from '../../../utils/themes/theme'

interface SignUpTemplateProps {
  frontHeader?: React.ReactNode
  buttonIcon?: React.ReactNode
  middleHeader?: React.ReactNode
  endHeader?: React.ReactNode
  mainBody?: React.ReactNode
}

const FrontGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '20%',
  height: '15vh',
})

const MiddleGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '10vh',
})

const ButtonGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginTop: '2rem',
})

const EndGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '20%',
  height: '15vh',
})

const BodyGrid = styled(Grid)({
  display: 'flex',
  alignItems: 'start',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'start',
})

const MainGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.structuralColor.white,
})

const HeadingGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '30%',
})

const SubHeadingGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  height: '15vh',
})
const StyledTemplate: React.FC<SignUpTemplateProps> = ({
  frontHeader,
  buttonIcon,
  middleHeader,
  endHeader,
  mainBody,
}: SignUpTemplateProps) => {
  return (
    <MainGrid data-testid={'main-grid'}>
      <HeadingGrid>
        <FrontGrid data-testid="front-grid">{frontHeader}</FrontGrid>
        <SubHeadingGrid>
          <MiddleGrid data-testid="middle-grid">{middleHeader}</MiddleGrid>
          <ButtonGrid>{buttonIcon}</ButtonGrid>
        </SubHeadingGrid>
        <EndGrid data-testid="end-grid">{endHeader}</EndGrid>
      </HeadingGrid>
      <BodyGrid>{mainBody}</BodyGrid>
    </MainGrid>
  )
}

export default StyledTemplate
