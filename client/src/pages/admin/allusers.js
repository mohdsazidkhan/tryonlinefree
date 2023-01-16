import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { variables } from '../../config/config';
import Sidebar from './sidebar';
const AllUsers = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get(`${variables.BASE_URL}/all-users`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setUsers(response.data.data);
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
  };

  useEffect(() => {
    getUsers();
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
        <Flex color="white" className='mainContent pb-5'>
        <Sidebar/>
          <Box flex="1" className='content'>
          <div className='flex justify-between items-center pb-5 px-5'>
            <div className='text-green-500'>Users</div>
            <div className='text-yellow-500'>{users?.length}</div>
          </div>
          <hr/>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>UserType</Th>
                    <Th>Phone</Th>
                    <Th textAlign={'center'}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users?.map((item,index)=>
                  <Tr key={index}>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.userType}</Td>
                  <Td>{item.phone}</Td>
                  <Td>
                    <Flex justifyContent={'space-between'}>
                      <EditIcon cursor={'pointer'} color={'green.500'} />
                      <DeleteIcon cursor={'pointer'} color={'red.500'} />
                    </Flex>
                  </Td>
                </Tr>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </div>
    </>
  );
};

export default AllUsers;
