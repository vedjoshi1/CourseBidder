// Sidebar.js
import { Box, HStack, Link, Text, VStack } from '@chakra-ui/react';
import { SearchIcon, CopyIcon } from "@chakra-ui/icons"
import NextLink from 'next/link';

const Sidebar = () => {
  return (
    <Box
      as="nav"
      w="100px"
      h="100%"
      bg="white"
      position="fixed"
      top="0"
      left="0"
      p="4"
    >
      <VStack spacing="4" align="left">
        <NextLink href="/search" passHref>
          <HStack>
            <SearchIcon />
            <Link>
              <Text>Search</Text>
            </Link>
          </HStack>
        </NextLink>
        <HStack>
          <CopyIcon />
        <NextLink href="/listings" passHref>
          <Link>
            <Text>My Listings</Text>
          </Link>
        </NextLink>


        </HStack>
       
      </VStack>
    </Box>
  );
};

export default Sidebar;
