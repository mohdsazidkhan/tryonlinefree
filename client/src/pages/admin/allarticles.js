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
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { variables } from '../../config/config';
import moment from 'moment';

const AllArticles = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    axios
      .get(`${variables.BASE_URL}/all-articles`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setArticles(response.data.data);
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
    getArticles();
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
      <Container
        maxW="lg"
        maxWidth={{ lg: '1400px', md: '1000px', sm: '600px' }}
        marginTop={'20px'}
      >
        <Flex color="white">
          <Box w="220px">
            <div className="leftMenu">
              <NavLink to="/dashboard" activeclassname="active">
                Dashboard
              </NavLink>
              <NavLink to="/all-categories" activeclassname="active">
                Categories
              </NavLink>
              <NavLink to="/all-articles" activeclassname="active">
                Articles
              </NavLink>
              <NavLink to="/all-tags" activeclassname="active">
                Tags
              </NavLink>
              <NavLink to="/all-users" activeclassname="active">
                Users
              </NavLink>
            </div>
          </Box>
          <Box flex="1">
          <div className='flex justify-between items-center pb-5 px-5'>
            <div className='text-green-500'>Articles</div>
            <div className='text-yellow-500'>{articles?.length}</div>
            <div className="addBtn">
              <Link to="/add-article">
                <Button size="sm" rounded="md" colorScheme="gray">
                  Add Article
                </Button>
              </Link>
            </div>
          </div>
          <hr/>
            
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Title</Th>
                    <Th>Category</Th>
                    <Th>Published At</Th>
                    <Th textAlign={'center'}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {articles?.map(item=>
                  <Tr key={item?._id}>
                    <Td><img width='80' src={item?.image} alt={item?.title}/></Td>
                    <Td>{item?.title}</Td>
                    <Td>{item?.categoryName}</Td>
                    <Td>{moment(item?.createdAt).format("DD MMM YYYY h:mm A")}</Td>
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
      </Container>
    </>
  );
};

export default AllArticles;
