import { Box, Input, Button, VStack } from "@chakra-ui/react";

const Login = () => {
    return (
        <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
    >
    <VStack>
      <Input placeholder="Username" mb={3} />
      <Input type="password" placeholder="Password" mb={3} />
      <Box tp={100} bp={10}>
        Sign up.
      </Box>
      <Button colorScheme="blue" size="md" width="full">
        Login
      </Button>


    </VStack>
      
    </Box>
    );

};

export default Login; 