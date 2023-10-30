import { Grid, styled } from '@mui/material'
import React from 'react'
import theme from '../../../utils/themes/theme'

export interface HomeTemplateProps {
  sidebarNode: React.ReactNode
  headerNode: React.ReactNode
  contentNode: React.ReactNode
}

const SidebarGrid = styled(Grid)({
  display: 'flex',
  width: '20%',
  overflowX: 'hidden',
})

const ContentGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
})

const MainGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.structuralColor.white,
})

const DataGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  height: '100%',
  position: 'relative',
  backgroundColor: '#f8f9fa',
})

const HeaderGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '10vh',
  position: 'relative',
  overflowY: 'hidden',
})

const InnerGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
})
const HomeTemplate: React.FC<HomeTemplateProps> = ({
  sidebarNode,
  headerNode,
  contentNode,
}: HomeTemplateProps) => {
  return (
    <MainGrid data-testid={'main-grid'}>
      <SidebarGrid>{sidebarNode}</SidebarGrid>
      <ContentGrid>
        <InnerGrid>
          <HeaderGrid>{headerNode}</HeaderGrid>
          <DataGrid>{contentNode}</DataGrid>
        </InnerGrid>
      </ContentGrid>
    </MainGrid>
  )
}

export default HomeTemplate
