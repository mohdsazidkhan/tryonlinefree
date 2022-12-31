import { Box, Container, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../pages/dashboard.css';
const Dashboard = () => {
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
              <GridItem className='dashGridItem' borderRadius={4} w="100%" h="100" bg="blue.500">
                <h4>10</h4>
                <p>Categories</p>
              </GridItem>
              <GridItem className='dashGridItem' borderRadius={4} w="100%" h="100" bg="teal.500">
                <h4>56</h4>
                <p>Articles</p>
              </GridItem>
              <GridItem className='dashGridItem' borderRadius={4} w="100%" h="100" bg="red.500">
                <h4>98</h4>
                <p>Tags</p>
              </GridItem>
              <GridItem className='dashGridItem' borderRadius={4} w="100%" h="100" bg="gray.500">
                <h4>16</h4>
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
