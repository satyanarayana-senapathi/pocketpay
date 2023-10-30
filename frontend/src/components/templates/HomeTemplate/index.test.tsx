import { render } from '@testing-library/react'
import HomeTemplate from '.'
import '@testing-library/jest-dom/extend-expect'
import Sidebar from '../../organisms/Sidebar'
import { CollapsablePaymentCard } from '../../organisms/CollapsablePaymentCard'
import { Header } from '../../organisms/Header'

test('renders main grid', () => {
  const { getByTestId } = render(
    <HomeTemplate
      sidebarNode={<Sidebar></Sidebar>}
      headerNode={<Header></Header>}
      contentNode={<CollapsablePaymentCard></CollapsablePaymentCard>}
    />
  )
  const mainGrid = getByTestId('main-grid')
  expect(mainGrid).toBeInTheDocument()
})

test('renders sidebar, header, and content nodes', () => {
  const sidebarNode = <div>Sidebar Content</div>
  const headerNode = <div>Header Content</div>
  const contentNode = <div>Content Data</div>

  const { getByText } = render(
    <HomeTemplate
      sidebarNode={sidebarNode}
      headerNode={headerNode}
      contentNode={contentNode}
    />
  )

  const sidebar = getByText('Sidebar Content')
  const header = getByText('Header Content')
  const content = getByText('Content Data')

  expect(sidebar).toBeInTheDocument()
  expect(header).toBeInTheDocument()
  expect(content).toBeInTheDocument()
})
