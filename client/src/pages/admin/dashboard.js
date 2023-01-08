import { Box, Container, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './dashboard.css';
import { variables } from '../../config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Dashboard = () => {

  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get(`${variables.BASE_URL}/all-users`)
      .then(response => {
        if (response.data.success) {
          setUsers(response.data.data);
        }
      })
      .catch(error => {
        console.log(error)
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
        console.log(error)
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
        console.log(error)
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
        console.log(error)
      });
  };

  const uniqueTags = [];
  {tags?.map(item => {
    item.tags.map(sitem => {
      if(uniqueTags.indexOf(sitem) === -1) {
        uniqueTags.push(sitem)
      }
    });
  })}

  useEffect(() => {
    getCategories();
    getArticles();
    getTags();
    getUsers();
  }, []);
  return (
    <>
      <Navbar />
      <Container
        maxW="lg"
        maxWidth={{ lg: '1400px', md: '1000px', sm: '600px' }}
        marginTop={'20px'}
      >
        <Flex color="white">
          <Box w="220px">
            <div className="leftMenu">
              <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
              <NavLink to="/all-categories" activeclassname="active">Categories</NavLink>
              <NavLink to="/all-articles" activeclassname="active">Articles</NavLink>
              <NavLink to="/all-tags" activeclassname="active">Tags</NavLink>
              <NavLink to="/all-users" activeclassname="active">Users</NavLink>
            </div>
          </Box>
          <Box flex="1">
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <GridItem className='dashGridItem' borderRadius={4} w="100%" h="100" bg="blue.600">
                <h4>{categories?.length}</h4>
                <p>Categories</p>
              </GridItem>
              <GridItem className='dashGridItem' borderRadius={4} w="100%" h="100" bg="orange.600">
                <h4>{articles?.length}</h4>
                <p>Articles</p>
              </GridItem>
              <GridItem className='dashGridItem' borderRadius={4} w="100%" h="100" bg="red.600">
                <h4>{uniqueTags?.length}</h4>
                <p>Tags</p>
              </GridItem>
              <GridItem className='dashGridItem' borderRadius={4} w="100%" h="100" bg="green.600">
                <h4>{users?.length}</h4>
                <p>Users</p>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} marginTop='30px'>
              <GridItem textAlign={'center'}>
                <Link to='/all-categories'>Go to Categories</Link>
              </GridItem>
              <GridItem textAlign={'center'}>
                <Link to='/all-articles'>Go to Articles</Link>
              </GridItem>
              <GridItem textAlign={'center'}>
                <Link to='/all-tags'>Go to Tags</Link>
              </GridItem>
              <GridItem textAlign={'center'}>
                <Link to='/all-users'>Go to Users</Link>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Dashboard;
