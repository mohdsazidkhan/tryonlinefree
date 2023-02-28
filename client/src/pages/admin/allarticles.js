import { useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu'
import {
  Box,
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { EditIcon, DeleteIcon, ArrowUpIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { variables } from '../../config/config';
import moment from 'moment';
import Sidebar from './sidebar';

const AllArticles = () => {
  const [isLoading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [articles, setArticles] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [userType, setUserType] = useState('');
  const [articleId, setArticleId] = useState(null);
  const [scroll, setScroll] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = useState('md')

  const handleDelModal = (id, size) => {
    setArticleId(id)
    setSize(size)
    onOpen()
  }
  const handleDelete = () =>{
    axios
      .get(`${variables.BASE_URL}/deleteArticle/${articleId}`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          getArticles()
          onClose()
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
  }

  const getArticles = () => {
    axios
      .get(`${variables.BASE_URL}/all-articles`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setArticles(response.data.data);
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
    getArticles();
    let user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    const userType = user?.userType;
    setUserType(userType);
    axios
      .get(`${variables.BASE_URL}/user-articles/${userId}`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setUserArticles(response.data.data);
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
              <div className="text-green-500">Articles</div>
              <div className="text-yellow-500">
                {userType === 'admin' ? articles?.length : userArticles?.length}
              </div>
              <div className="addBtn">
                <Link to="/add-article">
                  <Button size="sm" rounded="md" colorScheme="gray">
                    Add Article
                  </Button>
                </Link>
              </div>
            </div>
            <hr />

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
                {isLoading 
                ? 
                <Tr>
                  <Td colSpan={5}>
                    <div className='flex justify-center items-center'><Spinner/></div>
                  </Td>
                </Tr>
                :
                userType === 'admin' ? (
                    <>
                    {articles?.length > 0 ?
                      articles?.map(item => (
                        <Tr key={item?._id}>
                          <Td>
                            <img
                              width="80"
                              src={item?.image}
                              alt={item?.title}
                            />
                          </Td>
                          <Td>{item?.title}</Td>
                          <Td>{item?.categoryName}</Td>
                          <Td>
                            {moment(item?.createdAt).format(
                              'DD MMM YYYY h:mm A'
                            )}
                          </Td>
                          <Td>
                            <Flex justifyContent='space-between' alignItems="center">
                              <Link to={`/edit-article/${item?._id}`}>
                                <EditIcon
                                  cursor={'pointer'}
                                  color={'green.500'}
                                />
                              </Link>
                              <div onClick={() => handleDelModal(item?._id, 'md')}>
                                <DeleteIcon
                                  cursor={'pointer'}
                                  color={'red.500'}
                                />
                              </div>
                            </Flex>
                          </Td>
                        </Tr>
                      ))
                      :
                      <Tr>
                        <Td colSpan={5}>
                          <div className='flex justify-center items-center'>No Data Found</div>
                        </Td>
                      </Tr>
                      }
                    </>
                  ) : (
                  <>
                      {userArticles?.map(item => (
                        <Tr key={item?._id}>
                          <Td>
                            <img
                              width="80"
                              src={item?.image}
                              alt={item?.title}
                            />
                          </Td>
                          <Td>{item?.title}</Td>
                          <Td>{item?.categoryName}</Td>
                          <Td>
                            {moment(item?.createdAt).format(
                              'DD MMM YYYY h:mm A'
                            )}
                          </Td>
                          <Td>
                            <Flex justifyContent={'center'}>
                              <Link to={`/edit-article/${item?._id}`}>
                                <EditIcon
                                  cursor={'pointer'}
                                  color={'green.500'}
                                />
                              </Link>
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </>
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
      </div>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete this article?</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} className="mr-2">Close</Button>
            <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div style={{display: scroll ? 'flex': 'none'}} className="scrollTop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <ArrowUpIcon />
      </div>
      <BottomMenu />
    </>
  );
};

export default AllArticles;
