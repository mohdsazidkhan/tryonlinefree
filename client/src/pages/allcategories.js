import { Box, Container, Flex, Table, TableContainer, Tbody, Thead, Th, Tr, Td } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { EditIcon, ViewIcon, DeleteIcon} from '@chakra-ui/icons'
const AllCategories = () => {
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
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th textAlign={'center'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Education</Td>
                  <Td>
                    <Flex justifyContent={'space-evenly'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Lifestyle</Td>
                  <Td>
                    <Flex justifyContent={'space-evenly'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Technology</Td>
                  <Td>
                    <Flex justifyContent={'space-evenly'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Sports</Td>
                  <Td>
                    <Flex justifyContent={'space-evenly'}>
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

export default AllCategories;
