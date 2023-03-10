import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { variables } from '../../config/config';
import { ArrowUpIcon } from '@chakra-ui/icons';
import BottomMenu from '../../components/BottomMenu'
import { Helmet } from 'react-helmet';

const Users = () => {
  const [isLoading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [users, setUsers] = useState([]);
  const [scroll, setScroll] = useState(false);

  const getUsers = () => {
    axios
      .get(`${variables.BASE_URL}/all-users`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setUsers(response.data.data);
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
    getUsers();
  }, []);
  return (
    <>
      <Helmet>
        <title>Users</title>
        <meta
          name="description"
          content={`Welcome to Tryonlinefree! Here you can find all users!`}
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
      <div className="container mx-auto py-5 mb-10">
      {isLoading 
      ? 
      <div className="text-center p-5">
        <Spinner/>
      </div>
      :
        users?.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {users?.map((item, index) => (
              <Link
                to={`/user/profile/${item?._id}`}
                state={{ id: item._id }}
                key={index}
                className="rounded-xl border p-5 text-center category cursor-pointer"
              >
                <div className="text-green-600">{item?.name}</div>
                <div className="text-indigo-600">{item?.email}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">No Data Found</div>
        )}
      </div>
      <div style={{display: scroll ? 'flex': 'none'}} className="scrollTop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <ArrowUpIcon />
      </div>
      <BottomMenu />
    </>
  );
};

export default Users;
