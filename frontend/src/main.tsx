import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { Provider as ChackrProvider } from '@/components/ui/provider';

import { AppRouter } from './routes/AppRouter.tsx';
import store from './store/configureStore.ts';
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <ChackrProvider>
        <AppRouter />
      </ChackrProvider>
    </StrictMode>
  </Provider>,
);
