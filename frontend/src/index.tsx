import React from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { App } from './App'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)

  root.render(
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: process.env.CALLBACK_URL as string,
      }}
    >
      <App />
    </Auth0Provider>
  )
} else {
  console.error("Root element with ID 'root' not found.")
}
