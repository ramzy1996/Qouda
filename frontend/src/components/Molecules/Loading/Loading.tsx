import { Flex, Image } from '@chakra-ui/react';

import { spinner } from '@/constant/Icons';

const Loading = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="full"
      height="full"
    >
      <Image src={spinner} alt="Loading" />
    </Flex>
  );
};

export default Loading;
