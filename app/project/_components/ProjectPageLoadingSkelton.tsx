import { Container,Skeleton, Flex, Box, Text } from '@radix-ui/themes';
import React from 'react';

const ProjectPageLoadingSkeleton = () => {
  return (
    <Container>
      
      <Flex className="mb-4" gap="4">
        {/* Engineers Section */}
        <Box className="w-[30rem]">
          <Text as="div" size="4" weight="bold" className="mb-4">
            <Skeleton width="100px" height="20px" />
          </Text>
          <Skeleton width="100%" height="100px" />
        </Box>

        {/* Clients Section */}
        <Box className="w-[30rem]">
          <Text as="div" size="4" weight="bold" className="mb-4">
            <Skeleton width="100px" height="20px" />
          </Text>
          <Skeleton width="100%" height="100px" />
        </Box>

        {/* Controllers Section */}
        <Box className="w-[15rem]">
          <Text as="div" size="4" weight="bold" className="mb-4">
            <Skeleton width="100px" height="20px" />
          </Text>
          <Flex direction="column" gap="2">
            <Skeleton width="100%" height="60px" />
            <Skeleton width="100%" height="60px" />
            <Skeleton width="100%" height="60px" />
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default ProjectPageLoadingSkeleton;
