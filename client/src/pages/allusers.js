import { Box, Container, Flex, Table, TableContainer, Tbody, Thead, Th, Tr, Td } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { EditIcon, ViewIcon, DeleteIcon} from '@chakra-ui/icons'
const AllUsers = () => {
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
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th textAlign={'center'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Mohd Sazid Khan</Td>
                  <Td>sajidpahat@gmail.com</Td>
                  <Td>7678131912</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Mohd Wazid Khan</Td>
                  <Td>wazidpahat@gmail.com</Td>
                  <Td>9983360494</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Mohd Asif Khan</Td>
                  <Td>asifkhan@gmail.com</Td>
                  <Td>9876452367</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <ViewIcon cursor={'pointer'} color={'cyan.500'}/>
                      <EditIcon cursor={'pointer'} color={'green.500'}/>
                      <DeleteIcon cursor={'pointer'} color={'red.500'}/>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Mohd Tofique Khan</Td>
                  <Td>tifiquepahat@gmail.com</Td>
                  <Td>9811372206</Td>
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

export default AllUsers;
