/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CSSProperties, useState } from 'react';
import { FcAbout } from 'react-icons/fc';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { Link, useLocation } from 'react-router';

import { NavItem } from '@/constant/NavItem';
import { INavBar } from '@/interfaces/INavBar';

import styles from './navbar.module.scss';

type NavbarProps = {
  className?: string;
  style?: CSSProperties;
};

const Navbar = ({ className, style }: NavbarProps) => {
  //   const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <nav
      className={`backdrop-blur shadow fixed z-50 left-0 right-0 top-0 flex py-3 px-6 justify-between items-center bg-black/50 ${className}`}
      style={style}
    >
      {/* Logo */}
      {/* <button
        onClick={() => navigate('/')}
        className="cursor-pointer border-none bg-transparent p-0"
        aria-label="Navigate to Home"
      >
        <img
          src={logo}
          alt="Logo"
          width={50}
          height={40}
          className="cursor-pointer rounded-md"
        />
      </button> */}

      {/* Hamburger button for mobile */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden md:hidden sm:hidden text-white p-2 ${isSidebarOpen ? 'hidden' : 'block'}`}
        aria-label="Open Sidebar"
      >
        <GiHamburgerMenu size={30} />
      </button>

      {/* Navigation Items - Desktop and Mobile */}
      <div
        className={`gap-6 justify-end items-center space-x-4 sm:flex-row sm:space-x-6 sm:w-auto w-full absolute sm:static bg-black/50 sm:bg-transparent top-16 left-0 right-0 py-4 sm:py-0 sm:flex sm:justify-start hidden ${isSidebarOpen ? 'hidden' : 'block'} lg:flex md:flex sm:flex`}
      >
        {NavItem.map((nav: INavBar, i: number) => (
          <Link
            to={nav.url}
            key={i}
            className={`font-poppins font-normal cursor-pointer text-[16px] text-white`}
          >
            {nav.icon !== '' ? (
              <div
                className={
                  location.pathname === nav.url
                    ? styles.activeLink
                    : styles.iconClass
                }
              >
                <FcAbout style={{ fontSize: '40px' }} />
              </div>
            ) : (
              <div
                className={
                  location.pathname === nav.url
                    ? styles.activeLink
                    : styles.iconClass
                }
              >
                <span>{nav.label}</span>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Sidebar for mobile view */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden md:hidden`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            toggleSidebar(); // Close when clicking the left half of the sidebar
          }
        }}
      >
        {/* Sidebar container */}
        <div className="flex">
          <div
            className={`inset-0 bg-none min-h-screen w-1/2 ${isSidebarOpen ? 'z-30' : 'z-0'}`}
            onClick={toggleSidebar} // Close sidebar when left half is clicked
          />
          <div
            className={`w-1/2 bg-black/50 text-white flex flex-col items-end space-y-6 min-h-screen`}
          >
            <div className="flex justify-end p-4 mr-4 mt-1">
              <button
                onClick={toggleSidebar}
                className="text-white text-xl"
                aria-label="Close Sidebar"
              >
                <IoCloseSharp size={30} />
              </button>
            </div>
            {/* Nav items */}
            <div className="flex flex-col items-end space-y-6 px-6">
              {NavItem.map((nav: INavBar, i: number) => (
                <Link
                  to={nav.url}
                  key={i}
                  className={`font-poppins font-normal cursor-pointer text-[16px] text-white`}
                  onClick={toggleSidebar}
                >
                  {nav.icon !== '' ? (
                    <div
                      className={
                        location.pathname === nav.url
                          ? styles.activeLink
                          : styles.iconClass
                      }
                    >
                      <FcAbout style={{ fontSize: '40px' }} />
                    </div>
                  ) : (
                    <div
                      className={
                        location.pathname === nav.url
                          ? styles.activeLink
                          : styles.iconClass
                      }
                    >
                      <span>{nav.label}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* The left half (background), which is clickable to close the sidebar */}
        {/* <div
          className={`fixed inset-0 bg-transparent ${isSidebarOpen ? 'z-30' : 'z-0'}`}
          onClick={toggleSidebar} // Close sidebar when left half is clicked
        /> */}
      </div>

      {/* Web View or Content Section */}
      {/* Assuming you want to toggle between web view and the sidebar */}
      {/* Add your web view content or sections below */}
    </nav>
  );
};

export default Navbar;
