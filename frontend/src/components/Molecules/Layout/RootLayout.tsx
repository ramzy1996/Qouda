import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
import { Box, Flex } from '@chakra-ui/react';

import { rootLayoutAction } from '@/store/actions/rootLayoutAction';

import Footer from '../../Base/Footer/Footer';
import Navbar from '../../Base/Navbar/Navbar';

type RootLayoutProps = {
  children?: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const dispatch = useDispatch();
  const location = useLocation();

  const noMarginPaddingPages: any = [];
  const isNoMarginPaddingPages = noMarginPaddingPages.includes(
    location.pathname,
  );

  const navHeight = 80;
  const footerHeight = 120;
  const totalHeight = navHeight + footerHeight + 40;

  useEffect(() => {
    dispatch(rootLayoutAction.setFooterHeight(footerHeight));
    dispatch(rootLayoutAction.setNavHeight(navHeight));
    dispatch(rootLayoutAction.setMinPageHeight(totalHeight));
  }, [navHeight, footerHeight, dispatch, totalHeight]);

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navbar style={{ height: `${navHeight}px` }} />

      <Box
        id="home"
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        px={!isNoMarginPaddingPages ? 10 : 0}
        py={!isNoMarginPaddingPages ? 5 : 0}
        marginTop={!isNoMarginPaddingPages ? `${navHeight}px` : 0}
        minHeight={`calc(100vh - ${totalHeight}px)`}
      >
        <Box width="full" color="white">
          {children || <Outlet />}
        </Box>
      </Box>

      <Footer style={{ height: `${footerHeight}px` }} />
    </Flex>
  );
}
