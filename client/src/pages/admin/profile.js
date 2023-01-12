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
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [userDetail, setUserDetail] = useState({});
  const [image, setImage] = useState();
  const [imageBase64, setBase64IMG] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleImageChange = (e) => {
    convertToBase64(e.target.files[0])
    setImage(e.target.files[0]);
  };

  const convertToBase64 = (selectedFile) => {
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onload = () => {
      setBase64IMG(reader.result)
    }
  }

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

  const handleChange = e => {
    if(e.target.name === 'name'){
      setName(e.target.value);
    }
    if(e.target.name === 'email'){
      setEmail(e.target.value);
    }
    if(e.target.name === 'phone'){
      setPhone(e.target.value);
    }
    if(e.target.name === 'password'){
      setPassword(e.target.value);
    }
  };

  const updateProfile = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    let userId = user?._id;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("image", image ? image : userDetail?.image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    axios({
      method: 'post',
      url: `${variables.BASE_URL}/updateProfile`,
      data: formData,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }).then(response => {
        if (response.data.success) {
          setToolTipTitle("Success");
          setMessage(response.data.message);
          seErrorType(response.data.success)
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/dashboard');
          }, 3000);
        }
      })
      .catch(error => {
        if(error.response.data.success===false){
          seErrorType(error.response.data.success)
          setToolTipTitle(error.response.data.error.name);
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
                  <Avatar size="xl" src={userDetail?.image ? userDetail?.image : imageBase64}>
                  </Avatar>
                </Center>
                <Center w="full">
                  <input
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                  />
                </Center>
              </Stack>
            </FormControl>
            <FormControl className='my-2' id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter Name"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userDetail?.name}
                name="name"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className='my-2' id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: 'gray.500' }}
                type="email"
                defaultValue={userDetail?.email}
                name="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl  className='my-2' id="phone" isRequired>
              <FormLabel>Phone No.</FormLabel>
              <Input
                placeholder="Enter Phone no."
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userDetail?.phone}
                name="phone"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl  className='my-2' id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: 'gray.500' }}
                type="password"
                name="password"
                onChange={handleChange}
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
                onClick={updateProfile}
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