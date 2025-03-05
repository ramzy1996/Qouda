import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootLayout from '@/components/Molecules/Layout/RootLayout';
import Loading from '@/components/Molecules/Loading/Loading';
import NotFound from '@/components/Molecules/NotFound/NotFound';
import { Toaster } from '@/components/ui/toaster';

import { routes } from './routes';

import '@/index.scss';
const createAppRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <NotFound />,
      children: [...routes],
    },
    {
      path: '*', // Catch-all for undefined routes
      element: <NotFound />,
    },
  ]);
};

export const AppRouter = () => {
  const router = createAppRouter();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </QueryClientProvider>
  );
};
