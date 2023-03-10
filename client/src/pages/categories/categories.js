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
import {Helmet} from "react-helmet";

const Categories = () => {
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
        <title>Categories</title>
        <meta
          name="description"
          content="Welcome to Tryonlinefree! Here you can find all blog categories!"
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
      <div className="container mx-auto py-5 m-5">
      {isLoading 
      ? 
      <div className="text-center p-5">
        <Spinner/>
      </div>
      :
      categories?.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories?.map((item, index) => (
              <Link
                to={`/category/${item?.name.toLowerCase()}`}
                state={{ id: item._id, name: item?.name }}
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
      <div style={{display: scroll ? 'flex': 'none'}} className="scrollTop" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <ArrowUpIcon />
      </div>
      <BottomMenu />
    </>
  );
};

export default Categories;
