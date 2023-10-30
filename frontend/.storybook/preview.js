import { ThemeProvider } from "@mui/material"
import { StyledEngineProvider } from "@mui/styled-engine"
import theme from '../src/utils/themes/theme'
import {MemoryRouter} from "react-router"
import './preview.css'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export const decorators = [
  (Story) => (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  ),
]
