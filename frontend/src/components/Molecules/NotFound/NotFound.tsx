import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import { back, notfound } from '@/constant/Icons';
import { selectMinPageHeight } from '@/store/selectors/rootLayoutSelector';

import RootLayout from '../Layout/RootLayout';

const NotFound = () => {
  const navigate = useNavigate();
  const minPageHeight = useSelector(selectMinPageHeight);

  return (
    <RootLayout>
      <Flex
        justifyContent="center"
        alignItems="center"
        px={5}
        my="auto"
        minHeight={`calc(100vh - ${minPageHeight}px)`}
      >
        <Container maxW="container.xl">
          <Flex
            flexDirection={['column', 'column', 'row']}
            alignItems="center"
            gap={12}
          >
            <VStack
              width={['full', 'full', '50%']}
              textAlign={['center', 'center', 'left']}
              gap={4}
            >
              <Text color="blue.400" fontSize="sm">
                404 error
              </Text>

              <Heading color="white" size={['lg', 'xl']} mt={3}>
                Page not found
              </Heading>

              <Text color="gray.400">
                Sorry, the page you are looking for doesn't exist. Here are some
                helpful links:
              </Text>

              <Flex
                justifyContent={['center', 'center', 'flex-start']}
                width="full"
              >
                <Button
                  bgColor="gray.500"
                  variant="solid"
                  onClick={() => navigate('/')}
                >
                  <Image src={back} alt="Back Icon" boxSize={6} />
                  Go home
                </Button>
              </Flex>
            </VStack>

            <Flex
              width={['full', 'full', '50%']}
              justifyContent="center"
              mt={[12, 12, 0]}
            >
              <Image
                src={notfound}
                alt="Not Found Illustration"
                maxWidth="full"
                height="auto"
              />
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </RootLayout>
  );
};

export default NotFound;
