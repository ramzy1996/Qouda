export const routes = [
  {
    // path:'/about',
    // lazy: async () => {
    //     const { default: NotFound } = await import('@/components/NotFound/NotFound');
    //     return { Component: NotFound };
    // },
  },
  {
    path: '/',
    lazy: async () => {
      const { default: Home } = await import('@/pages/Home/Home');
      return { Component: Home };
    },
  },
  {
    path: '/counter',
    lazy: async () => {
      const { default: Counter } = await import('@/pages/Example/Counter');
      return { Component: Counter };
    },
  },
  {
    path: '/display',
    lazy: async () => {
      const { default: DisplayCounter } = await import(
        '@/pages/Example/DisplayCounter'
      );
      return { Component: DisplayCounter };
    },
  },
];
