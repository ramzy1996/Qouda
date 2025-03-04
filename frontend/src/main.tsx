import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { AppRouter } from './routes/AppRouter.tsx';
import store from './store/configureStore.ts';

import './index.scss';
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <AppRouter />
    </StrictMode>
  </Provider>,
);
