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
import BottomMenu from '../../components/BottomMenu'
import Navbar from '../../components/Navbar';
import { EditIcon, DeleteIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { variables } from '../../config/config';
import Sidebar from './sidebar';
import { Helmet } from 'react-helmet';

const AllCategories = () => {
  const [isLoading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [scroll, setScroll] = useState(false);

  const getCategories = () => {
    axios
      .get(`${variables.BASE_URL}/all-categories`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setCategories(response.data.data);
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

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100);
    });
    getCategories();
  }, []);
  return (
    <>
      <Helmet>
        <title>All Categories</title>
        <meta
          name="description"
          content={`Welcome to Tryonlinefree! All Categories`}
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
      <div className="container mt-5 mx-auto">
        <Flex color="white" className="mainContent pb-5">
          <Sidebar />
          <Box flex="1" className="content">
            <div className="flex justify-between items-center pb-5 px-5">
              <div className="text-green-500">Categories</div>
              <div className="text-yellow-500">{categories?.length}</div>
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
                  categories?.length > 0 ? (
                    categories?.map((item, index) => (
                      <Tr key={index}>
                        <Td>{item.name}</Td>
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
      <div style={{display: scroll ? 'flex': 'none'}} className="scrollTop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <ArrowUpIcon />
      </div>
      <BottomMenu />
    </>
  );
};

export default AllCategories;
