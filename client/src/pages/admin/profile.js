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
  Spinner
} from '@chakra-ui/react'
import BottomMenu from '../../components/BottomMenu'
import Navbar from '../../components/Navbar';
import './dashboard.css';
import { variables } from '../../config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import { Helmet } from 'react-helmet';

const Profile = () => {
  const [isLoading, setLoading] = useState(true);
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
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');

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
          setLoading(false)
        }
      })
      .catch(error => {
        if (error.response.data.success === false) {
          seErrorType(error.response.data.success);
          setToolTipTitle(error.response.data.error.name);
          setMessage(error.response.data.error.message);
          setShowAlert(true);
          setLoading(false)
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
    if(e.target.name === 'github'){
      setGithub(e.target.value);
    }
    if(e.target.name === 'linkedin'){
      setLinkedin(e.target.value);
    }
    if(e.target.name === 'facebook'){
      setFacebook(e.target.value);
    }
    if(e.target.name === 'instagram'){
      setInstagram(e.target.value);
    }
    if(e.target.name === 'twitter'){
      setTwitter(e.target.value);
    }
  };

  const updateProfile = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    let userId = user?._id;
    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("image", image ? image : userDetail?.image);
    formData.append("name", name ? name : userDetail?.name);
    formData.append("email", email ? email : userDetail?.email);
    formData.append("phone", phone ? phone : userDetail?.phone);
    formData.append("github", github ? github : userDetail?.github);
    formData.append("linkedin", linkedin ? linkedin : userDetail?.linkedin);
    formData.append("facebook", facebook ? facebook : userDetail?.facebook);
    formData.append("instagram", instagram ? instagram : userDetail?.instagram);
    formData.append("twitter", twitter ? twitter : userDetail?.twitter);
    setLoading(true)
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
          setLoading(false)
          setTimeout(() => {
            setShowAlert(false);
            window.location.reload()
          }, 3000);
        }
      })
      .catch(error => {
        if(error.response.data.success===false){
          seErrorType(error.response.data.success)
          setToolTipTitle(error.response.data.error.name);
          setMessage(error.response.data.error.message);
          setShowAlert(true);
          setLoading(false)
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
  };
  return (
    <>
      <Helmet>
        <title>Edit Profile</title>
        <meta
          name="description"
          content={`Welcome to Tryonlinefree! Edit Profile`}
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
            <AlertTitle>{tooltopTitle}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        </>
      )}

      <Navbar />
      <div className='container mt-5 mx-auto'>
      {isLoading 
      ? 
      <div className="text-center p-5">
        <Spinner/>
      </div>
      :
        <Flex color="white" className="mainContent pb-5">
          <Sidebar />
          <Box flex="1" className="userProfile">
            <FormControl className='my-2' id="userName">
              <FormLabel>User Photo</FormLabel>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar className='profileUpload relative' size="xl" src={imageBase64  ? imageBase64 : userDetail?.image}>
                  <input
                    className='selectFile'
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                  />
                  </Avatar>
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
            <FormControl  className='my-2' id="github" isRequired>
              <FormLabel>Github Link</FormLabel>
              <Input
                placeholder="Enter Github Link"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userDetail?.github}
                name="github"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl  className='my-2' id="linkedin" isRequired>
              <FormLabel>Linkedin Link</FormLabel>
              <Input
                placeholder="Enter Linkedin Link"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userDetail?.linkedin}
                name="linkedin"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl  className='my-2' id="instagram" isRequired>
              <FormLabel>Instagram Link</FormLabel>
              <Input
                placeholder="Enter Instagram Link"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userDetail?.instagram}
                name="instagram"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl  className='my-2' id="facebook" isRequired>
              <FormLabel>Facebook Link</FormLabel>
              <Input
                placeholder="Enter Facebook Link"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userDetail?.facebook}
                name="facebook"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl  className='my-2' id="twitter" isRequired>
              <FormLabel>Twitter Link</FormLabel>
              <Input
                placeholder="Enter Twitter Link"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                defaultValue={userDetail?.twitter}
                name="twitter"
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
      }
      </div>
      <BottomMenu />
    </>
  );
};

export default Profile;
