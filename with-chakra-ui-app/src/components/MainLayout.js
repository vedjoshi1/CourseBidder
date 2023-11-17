// Layout.js
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box ml="250px" p="4">
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
