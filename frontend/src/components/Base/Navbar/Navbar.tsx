import { CSSProperties } from 'react';
import { FcAbout } from 'react-icons/fc';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router';
import {
  Box,
  Button,
  DrawerContent,
  DrawerRoot,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react';

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { NavItem } from '@/constant/NavItem';
import { INavBar } from '@/interfaces/INavBar';

import styles from './navbar.module.scss';

type NavbarProps = {
  className?: string;
  style?: CSSProperties;
};

const Navbar = ({ className, style }: NavbarProps) => {
  //   const location = useLocation();

  return (
    <Box
      as="nav"
      position="fixed"
      zIndex={50}
      left={0}
      right={0}
      top={0}
      display="flex"
      py={3}
      px={6}
      justifyContent="space-between"
      alignItems="center"
      backdropFilter="blur(10px)"
      boxShadow="md"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      className={className}
      style={style}
    >
      {/* Hamburger button for mobile */}
      <DrawerRoot>
        <DrawerTrigger asChild>
          <Button
            display={{ base: 'block', lg: 'none', md: 'none' }}
            variant="ghost"
            color="white"
            p={2}
          >
            <Icon as={GiHamburgerMenu} boxSize={30} />
          </Button>
        </DrawerTrigger>

        <DrawerBackdrop />
        <DrawerContent backgroundColor="rgba(0, 0, 0, 0.5)" color="white">
          <DrawerHeader>
            <DrawerTitle color="white">Menu</DrawerTitle>
          </DrawerHeader>

          <DrawerBody>
            <VStack gap={6} align="flex-end">
              {NavItem.map((nav: INavBar, i: number) => (
                <Link to={nav.url} key={i} className={styles.routerLink}>
                  {nav.icon !== '' ? (
                    <Box
                      className={
                        location.pathname === nav.url
                          ? styles.activeLink
                          : styles.iconClass
                      }
                    >
                      <Icon as={FcAbout} boxSize={10} />
                    </Box>
                  ) : (
                    <Box
                      className={
                        location.pathname === nav.url
                          ? styles.activeLink
                          : styles.iconClass
                      }
                    >
                      <Box as="span">{nav.label}</Box>
                    </Box>
                  )}
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>

      {/* Navigation Items - Desktop */}
      <HStack
        gap={6}
        display={{ base: 'none', lg: 'flex', md: 'flex' }}
        justifyContent="flex-end"
        alignItems="center"
      >
        {NavItem.map((nav: INavBar, i: number) => (
          <Link to={nav.url} key={i} className={styles.routerLink}>
            {nav.icon !== '' ? (
              <Box
                className={
                  location.pathname === nav.url
                    ? styles.activeLink
                    : styles.iconClass
                }
              >
                <Icon as={FcAbout} boxSize={10} />
              </Box>
            ) : (
              <Box
                className={
                  location.pathname === nav.url
                    ? styles.activeLink
                    : styles.iconClass
                }
              >
                <Box as="span">{nav.label}</Box>
              </Box>
            )}
          </Link>
        ))}
      </HStack>
    </Box>
  );
};

export default Navbar;
