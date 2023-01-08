import Navbar from '../../components/Navbar'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const CFaUserAlt = chakra(FaUserAlt);

const ForgotPassword = () => {

  return (
    <>
    <Navbar />
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Forgot Password</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="Enter Email" />
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
          <Link style={{ color: '#007eff' }} to="/login">
          Back to login
          </Link>
        </Box>
    </Flex>
    </>
  );
};

export default ForgotPassword;
