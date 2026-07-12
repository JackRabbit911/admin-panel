import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import './index.css'
import App from './App.tsx'
import store from './shared/store/index.ts'

const prefix = '/abrakadabra'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter basename={prefix}>
      <App />
    </BrowserRouter>
  </Provider>
)
