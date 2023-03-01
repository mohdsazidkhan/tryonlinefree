import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu'
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
  FormControl,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { variables } from '../../config/config'
import {Helmet} from "react-helmet";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaPhone = chakra(FaPhone);
const CFaEnevelope = chakra(FaEnvelope);

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const handleShowClick = () => setShowPassword(!showPassword);

  const [data, setData] = useState({});

  const handleChange = e => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleRegister = () => {
    axios({
      method: 'post',
      url: `${variables.BASE_URL}/register`,
      data: data,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }).then(response => {
        
        if (response.data.success) {
          setTitle("Success");
          setMessage(response.data.message);
          seErrorType(response.data.success)
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/login');
          }, 3000);
        }
      })
      .catch(error => {
        if(error.response.data.success===false){
          seErrorType(error.response.data.success)
          setTitle(error.response.data.error.name);
          setMessage(error.response.data.error.message);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta
          name="description"
          content="Welcome to Tryonlinefree! Here you can create a new account!"
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {showAlert && 
       <>
        <Alert
          status={errorType === true ? "success" : "error"}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 9,
            width: 'auto',
            boxShadow: '-1px 1px 5px 0px rgb(0 0 0 / 25%)',
          }}
        >
          <AlertIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
        </>
      }
      <Navbar />

      <Flex
        flexDirection="column"
        width="100wh"
        height="auto"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Register</Heading>
          <Box minW={{ base: '90%', md: '468px' }}>
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
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaPhone color="gray.300" />}
                    />
                    <Input
                      name="phone"
                      type="text"
                      placeholder="Enter Phone Number"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaEnevelope color="gray.300" />}
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Password"
                      onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  onClick={handleRegister}
                  borderRadius={4}
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Register
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <div style={{marginBottom: 80}}>
          Already Registered ?{' '}
          <Link style={{ color: '#007eff' }} to="/login">
            Login
          </Link>
        </div>
      </Flex>
      <BottomMenu />
    </>
  );
};

export default Register;
