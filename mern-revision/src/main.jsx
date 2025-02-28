import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './ContextApi/FisrtContext.jsx'

import { Auth0Provider } from '@auth0/auth0-react';

import store from '../src/redux/store.jsx';
import { Provider } from 'react-redux';


createRoot(document.getElementById('root')).render(

  <Auth0Provider
    domain="dev-mamx0jwd07mabiow.us.auth0.com"
    clientId="iVUR71WZOkroC5WVFJGecIp92P4OU6u6"
    authorizationParams={{
      redirect_uri: "http://localhost:5173/user-home", // Change this to your desired redirect URL
    }}
  >
    <AppContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContextProvider>

  </Auth0Provider>
)
