import { CSSProperties } from 'react';
// import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Box, Text } from '@chakra-ui/react';

type FooterProps = {
  className?: string;
  style?: CSSProperties;
};

const Footer = ({ className, style }: FooterProps) => {
  const year = new Date().getFullYear();

  //   const socialLinks = [
  //     { href: 'https://web.facebook.com/Ramzyrox', Icon: FaFacebookF },
  //     { href: 'https://www.instagram.com/ramzy_ahamed', Icon: FaInstagram },
  //     { href: 'https://www.linkedin.com/in/ramzyahamed/', Icon: FaLinkedin },
  //     { href: 'https://github.com/ramzy1996', Icon: FaGithub },
  //   ];

  return (
    // <Box
    //   as="footer"
    //   bg="gray.800"
    //   textAlign="center"
    //   color="secondaryColor"
    //   width="full"
    //   position="relative"
    //   className={className}
    //   style={style}
    // >
    //   <VStack gap={6} px={6} pt={6} width="full">
    //     <HStack gap={4} justify="center">
    //       {socialLinks.map(({ href, Icon }, index) => (
    //         <ChakraLink href={href} target="_blank" key={index}>
    //           <IconButton
    //             variant="outline"
    //             colorScheme="whiteAlpha"
    //             borderRadius="full"
    //             size="md"
    //             borderColor="secondaryColor"
    //             color="secondaryColor"
    //             _hover={{
    //               bg: 'black',
    //               borderColor: 'white',
    //             }}
    //             aria-label={`${Icon.name} link`}
    //           >
    //             <Icon />
    //           </IconButton>
    //         </ChakraLink>
    //       ))}
    //     </HStack>
    //   </VStack>

    //   <Box p={4} textAlign="center" bg="rgba(0, 0, 0, 0.2)">
    //     <Text>© {year} Copyright: Ramzy Ahmed</Text>
    //   </Box>
    // </Box>

    <Box
      as="footer"
      bg="gray.800"
      textAlign="center"
      color="secondaryColor"
      width="full"
      position="relative"
      className={className}
      style={style}
      minHeight="100px" // Adjust as needed
    >
      {/* Main content inside the footer */}
      <Box p={4} />

      {/* Copyright section at the bottom */}
      <Box
        p={4}
        textAlign="center"
        bg="rgba(0, 0, 0, 0.2)"
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
      >
        <Text>© {year} Copyright: Qouda</Text>
      </Box>
    </Box>
  );
};

export default Footer;
