import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import Navbar from '../../components/Navbar';
import './dashboard.css';
import { variables } from '../../config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';

const Profile = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    axios
      .get(`${variables.BASE_URL}/user-detail/${userId}`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setUserDetail(response.data.data);
        }
      })
      .catch(error => {
        if (error.response.data.success === false) {
          seErrorType(error.response.data.success);
          setToolTipTitle(error.response.data.error.name);
          setMessage(error.response.data.error.message);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
  }, []);
  return (
    <>
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
            <AlertTitle>{tooltopTitle}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </>
      )}

      <Navbar />
      <Container
        maxW="lg"
        maxWidth={{ lg: '1400px', md: '1000px', sm: '600px' }}
        marginTop={'20px'}
      >
        <Flex color="white" className="mainContent pb-5">
          <Sidebar />
          <Box flex="1" className="userProfile">
            <FormControl className='my-2' id="userName">
              <FormLabel>User Photo</FormLabel>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full">Change Photo</Button>
                </Center>
              </Stack>
            </FormControl>
            <FormControl className='my-2' id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
              />
            </FormControl>
            <FormControl className='my-2' id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: 'gray.500' }}
                type="email"
              />
            </FormControl>
            <FormControl  className='my-2' id="phone" isRequired>
              <FormLabel>Phone No.</FormLabel>
              <Input
                placeholder="Enter Phone no."
                _placeholder={{ color: 'gray.500' }}
                type="text"
              />
            </FormControl>
            <FormControl  className='my-2' id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: 'gray.500' }}
                type="password"
              />
            </FormControl>
            <Stack className='my-4' direction='row'>
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}
              >
                Cancel
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Profile;
