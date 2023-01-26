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

const Categories = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios
      .get(`${variables.BASE_URL}/all-categories`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setCategories(response.data.data);
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
    getCategories();
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
      <div className="container mx-auto py-5 m-5">
        {categories?.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories?.map((item, index) => (
              <Link
                to={`/category/${item?.name.toLowerCase()}`}
                state={{ id: item._id }}
                key={index}
                className="rounded-xl border p-5 text-center category cursor-pointer"
              >
                {item?.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">No Data Found</div>
        )}
      </div>
    </>
  );
};

export default Categories;
