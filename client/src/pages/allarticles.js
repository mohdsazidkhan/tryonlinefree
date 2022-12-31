import { Box, Container, Flex, Table, TableContainer, Tbody, Thead, Th, Tr, Td, Button } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { EditIcon, ViewIcon, DeleteIcon} from '@chakra-ui/icons'
const AllArticles = () => {
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
          <div className='addBtn'>
            <Link to="/add-article">
              <Button
                size="sm"
                rounded="md"
                colorScheme='gray'
              >
                Add Article
              </Button>
            </Link>
          </div>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Category</Th>
                  <Th textAlign={'center'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Lorem Ipsum Dolar Sit Amet</Td>
                  <Td>Technology</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Lorem Ipsum Dolar Sit Amet</Td>
                  <Td>Sports</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Lorem Ipsum Dolar Sit Amet</Td>
                  <Td>Lifestyle</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Lorem Ipsum Dolar Sit Amet</Td>
                  <Td>News</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default AllArticles;
