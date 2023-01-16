import { Box, Container, Flex, Grid, GridItem,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription, } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './dashboard.css';
import { variables } from '../../config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';
const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [userArticles, setUserArticles] = useState([]);
  const [userType, setUserType] = useState('');

  const getUsers = () => {
    axios
      .get(`${variables.BASE_URL}/all-users`)
      .then(response => {
        if (response.data.success) {
          setUsers(response.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getCategories = () => {
    axios
      .get(`${variables.BASE_URL}/all-categories`)
      .then(response => {
        if (response.data.success) {
          setCategories(response.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getArticles = () => {
    axios
      .get(`${variables.BASE_URL}/all-articles`)
      .then(response => {
        if (response.data.success) {
          setArticles(response.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getTags = () => {
    axios
      .get(`${variables.BASE_URL}/all-tags`)
      .then(response => {
        if (response.data.success) {
          setTags(response.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const uniqueTags = [];
  {
    tags?.map(item => {
      item.tags.map(sitem => {
        if (uniqueTags.indexOf(sitem) === -1) {
          uniqueTags.push(sitem);
        }
      });
    });
  }

  useEffect(() => {
    getCategories();
    getArticles();
    getTags();
    getUsers();
    let user = JSON.parse(localStorage.getItem('user'));
    const userT = user.userType;
    setUserType(userT);
    const userId = user?._id;

    axios
      .get(`${variables.BASE_URL}/user-articles/${userId}`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setUserArticles(response.data.data);
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
      <div className='container mt-5 mx-auto'>
        <Flex color="white" className="mainContent pb-5">
          <Sidebar />
          {userType === 'admin' ? (
            <Box flex="1" className="content">
              <Grid
                className="dashboardGrids"
                templateColumns="repeat(4, 1fr)"
                gap={6}
              >
                <GridItem
                  className="dashGridItem"
                  borderRadius={4}
                  w="100%"
                  h="100"
                  bg="blue.600"
                >
                  <h4>{categories?.length}</h4>
                  <p>Categories</p>
                </GridItem>
                <GridItem
                  className="dashGridItem"
                  borderRadius={4}
                  w="100%"
                  h="100"
                  bg="orange.600"
                >
                  <h4>{articles?.length}</h4>
                  <p>Articles</p>
                </GridItem>
                <GridItem
                  className="dashGridItem"
                  borderRadius={4}
                  w="100%"
                  h="100"
                  bg="red.600"
                >
                  <h4>{uniqueTags?.length}</h4>
                  <p>Tags</p>
                </GridItem>
                <GridItem
                  className="dashGridItem"
                  borderRadius={4}
                  w="100%"
                  h="100"
                  bg="green.600"
                >
                  <h4>{users?.length}</h4>
                  <p>Users</p>
                </GridItem>
              </Grid>
              <Grid
                className="dashboardGrids"
                templateColumns="repeat(4, 1fr)"
                gap={6}
                marginTop="30px"
              >
                <GridItem textAlign={'center'}>
                  <Link to="/all-categories">Go to Categories</Link>
                </GridItem>
                <GridItem textAlign={'center'}>
                  <Link to="/all-articles">Go to Articles</Link>
                </GridItem>
                <GridItem textAlign={'center'}>
                  <Link to="/all-tags">Go to Tags</Link>
                </GridItem>
                <GridItem textAlign={'center'}>
                  <Link to="/all-users">Go to Users</Link>
                </GridItem>
              </Grid>
            </Box>
          ) : (
            <Box flex="1" className="content">
              <Grid
                className="dashboardGrids"
                templateColumns="repeat(1, 1fr)"
                gap={6}
              >
                <GridItem
                  className="dashGridItem"
                  borderRadius={4}
                  w="100%"
                  h="100"
                  bg="orange.600"
                >
                  <h4>{userArticles?.length}</h4>
                  <p>Articles</p>
                </GridItem>
                
              </Grid>
              <Grid
                className="dashboardGrids"
                templateColumns="repeat(1, 1fr)"
                gap={6}
                marginTop="30px"
              >
                <GridItem textAlign={'center'}>
                  <Link to="/all-articles">Go to Articles</Link>
                </GridItem>
              </Grid>
            </Box>
          )}
        </Flex>
      </div>
    </>
  );
};

export default Dashboard;
