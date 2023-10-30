// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-empty-interface */

import { createTheme, Theme } from '@mui/material/styles'
import React from 'react'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h1: React.CSSProperties
    body1: React.CSSProperties
    body2: React.CSSProperties
    body3: React.CSSProperties
    caption: React.CSSProperties
    underlineText: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    h1?: React.CSSProperties
    body1?: React.CSSProperties
    body2?: React.CSSProperties
    body3?: React.CSSProperties
    caption?: React.CSSProperties
    underlineText?: React.CSSProperties
  }

  interface Palette {
    textColor: Palette['primary']
    iconColor: Palette['primary']
    structuralColor: Palette['primary']
  }

  interface PaletteOptions {
    textColor?: PaletteOptions['primary']
    iconColor?: PaletteOptions['primary']
    structuralColor?: PaletteOptions['primary']
  }

  interface Color {
    main?: string
    primary100?: string
    primary300?: string
    primary500?: string
    contrastText?: string
    lowEmphasis?: string
    mediumEmphasis?: string
    highEmphasis?: string
    stroke?: string
    stroke2?: string
    icon1?: string
    icon2?: string
    blue?: string
    white?: string
    cardHover?: string
    buttonHover?: string
    dark?: string
    light?: string
    lightPurple?: string
  }

  interface PaletteColor extends Color {}
  interface SimplePaletteColorOptions extends Color {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true
    body1: true
    body2: true
    caption: true
    underlineText: true
    body3: true
  }
}

const theme: Theme = createTheme({
  spacing: [0, 4, 8, 12, 16, 20, 24, 32],
  typography: {
    h1: {
      fontFamily: 'Gerbera',
      fontSize: '24px',
      lineHeight: '40px',
    },
    body1: {
      fontFamily: 'Gerbera',
      fontSize: '20px',
      lineHeight: '32px',
    },
    body2: {
      fontFamily: 'Gerbera',
      fontSize: '17px',
      lineHeight: '24px',
    },
    body3: {
      fontFamily: 'Gerbera',
      fontSize: '16px',
      lineHeight: '24px',
    },
    caption: {
      fontFamily: 'Gerbera',
      fontSize: '14px',
      lineHeight: '21px',
    },
    underlineText: {
      fontFamily: 'Gerbera',
      fontSize: '14px',
      lineHeight: '13.3px',
    },
  },
  palette: {
    primary: {
      main: '#7633FF',
      primary100: '#E4D6FF',
      primary300: '#9764FF',
      primary500: '#7633FF',
      contrastText: '#FFFFFF',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    textColor: {
      main: '#0052FF',
      lowEmphasis: '#9F9DA3',
      mediumEmphasis: '#77767A',
      highEmphasis: '#141414',
      contrastText: '#FFFFFF',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    iconColor: {
      main: '#0052FF',
      stroke: '#E4E4E5',
      stroke2: '#E5E4E5',
      icon1: '#141414',
      icon2: '#A5A8AC',
      contrastText: '#FFFFFF',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    structuralColor: {
      main: '#0052FF',
      blue: '#F8F9FA',
      white: '#FFFFFF',
      cardHover: '#F3F2F5',
      buttonHover: '#F4EFFF',
      contrastText: '#FFFFFF',
      light: '#42a5f5',
      dark: '#1565c0',
      lightPurple: '#a981fc',
    },
  },
})

export default theme
