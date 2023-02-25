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
  Spinner
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { variables } from '../../config/config';
import axios from 'axios';
import Sidebar from './sidebar';
const AllTags = () => {
  const [isLoading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [tags, setTags] = useState([]);

  const getTags = () => {
    axios
      .get(`${variables.BASE_URL}/all-tags`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setTags(response.data.data);
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
    getTags();
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
      <div className="container mt-5 mx-auto">
        <Flex color="white" className="mainContent pb-5">
          <Sidebar />
          <Box flex="1" className="content">
            <div className="flex justify-between items-center pb-5 px-5">
              <div className="text-green-500">Tags</div>
              <div className="text-yellow-500">{uniqueTags?.length}</div>
            </div>
            <hr />
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th textAlign={'center'}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {isLoading 
                ? 
                <Tr>
                  <Td colSpan={2}>
                    <div className='flex justify-center items-center'><Spinner/></div>
                  </Td>
                </Tr>
                :
                  uniqueTags?.length > 0 ? (
                    uniqueTags?.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item}</Td>
                        <Td>
                          <Flex justifyContent={'space-evenly'}>
                            <EditIcon cursor={'pointer'} color={'green.500'} />
                            <DeleteIcon cursor={'pointer'} color={'red.500'} />
                          </Flex>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={5}>
                        <div className="flex justify-center items-center">
                          No Data Found
                        </div>
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

export default AllTags;
