import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { variables } from '../../config/config';

const Users = () => {
  const navigate = useNavigate();
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
      <div className="container mx-auto p-5 m-5">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users?.map((item, index) => (
            <Link 
              to={`/user/profile/${item?._id}`}
              state= {{ id: item._id }}
              key={index}
              className="rounded-xl border p-5 text-center category cursor-pointer"
            >
              <div className='text-green-600'>{item?.name}</div>
              <div className='text-indigo-600'>{item?.email}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;