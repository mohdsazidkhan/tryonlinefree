import { useState } from 'react';
import Navbar from '../components/Navbar';
import BottomMenu from '../components/BottomMenu'
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Textarea,
} from '@chakra-ui/react';
import { FaUserAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { variables } from '../config/config'
import {Helmet} from "react-helmet";
import { InfoIcon } from '@chakra-ui/icons'

const CFaUserAlt = chakra(FaUserAlt);
const CFaPhone = chakra(FaPhone);
const CFaEnevelope = chakra(FaEnvelope);

const Contact = () => {

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const [data, setData] = useState({});

  const handleChange = e => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleContact = () => {
    axios({
      method: 'post',
      url: `${variables.BASE_URL}/contact`,
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
            navigate('/');
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
        <title>Contact</title>
        <meta
          name="description"
          content="Welcome to Tryonlinefree! Here you can Contact with US!"
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
          <Heading color="teal.400">Contact US</Heading>
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
                      children={<InfoIcon color="gray.300" />}
                    />
                    <Input
                      name="subject"
                      type="text"
                      placeholder="Enter Subject"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Textarea
                    name="query"
                    onChange={handleChange}
                    placeholder='Enter your query here'
                    size='lg'
                  />
                  </InputGroup>
                </FormControl>
                <Button
                  onClick={handleContact}
                  borderRadius={4}
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
      </Flex>
      <BottomMenu />
    </>
  );
};

export default Contact;
