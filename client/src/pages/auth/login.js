import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
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
  FormHelperText,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { variables } from '../../config/config';
import './login.css';
import {Helmet} from "react-helmet";
import BottomMenu from '../../components/BottomMenu'

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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

  const handleLogin = () => {
    axios({
      method: 'post',
      url: `${variables.BASE_URL}/login`,
      data: data,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('login', JSON.stringify(response.data.success));
          localStorage.setItem('user', JSON.stringify(response.data.data));
          setTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/dashboard');
          }, 1000);
        }
      })
      .catch(error => {
        if (error.response.data.success === false) {
          seErrorType(error.response.data.success);
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
        <title>Login</title>
        <meta
          name="description"
          content="Welcome to Tryonlinefree! Here you can login to your account!"
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      {showAlert && (
        <>
          <Alert
            status={errorType === true ? 'success' : 'error'}
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
      )}
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
          <Heading color="teal.400">Login</Heading>
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
                  <FormHelperText textAlign="right">
                    <Link style={{ color: '#007eff' }} to="/forgotpassword">
                      forgot password?
                    </Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={4}
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <div
        className='mb-5'>
          Create an account ?{' '}
          <Link style={{ color: '#007eff' }} to="/register">
            Sign Up
          </Link>
        </div>
      </Flex>
      <BottomMenu />
    </>
  );
};

export default Login;
