import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router';

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
  const footerHeight = 150;
  const totalHeight = navHeight + footerHeight + 40;

  useEffect(() => {
    dispatch(rootLayoutAction.setFooterHeight(footerHeight));
    dispatch(rootLayoutAction.setNavHeight(navHeight));
    dispatch(rootLayoutAction.setMinPageHeight(totalHeight));
  }, [navHeight, footerHeight, dispatch, totalHeight]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar style={{ height: `${navHeight}px` }} />
      <div
        id="home"
        className={`flex flex-grow justify-center items-start ${!isNoMarginPaddingPages && 'px-10 py-5'}`}
        style={{
          marginTop: `${isNoMarginPaddingPages ? 0 : navHeight}px`,
          minHeight: `calc(100vh - ${totalHeight}px)`,
        }}
      >
        <div className="w-full text-white">{children || <Outlet />}</div>
      </div>

      <Footer style={{ height: `${footerHeight}px` }} />
    </div>
  );
}
