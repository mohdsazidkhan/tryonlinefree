import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { variables } from '../config/config';
import { ArrowUpIcon } from '@chakra-ui/icons';
import BottomMenu from '../components/BottomMenu'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet';

const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [categoryID, setCategoryID] = useState(null);
  const [scroll, setScroll] = useState(false);

  const handleTabClick = catId => {
    if (catId === null) {
      getArticles();
      setCategoryID(null);
    } else {
      getArticlesByCategoryID(catId);
      setCategoryID(catId);
    }
  };

  const getArticlesByCategoryID = categoryId => {
    setLoading(true);
    axios
      .get(`${variables.BASE_URL}/category-articles/${categoryId}`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setArticles(response.data.data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.response.data.success === false) {
          seErrorType(error.response.data.success);
          setToolTipTitle(error.response.data.error.name);
          setMessage(error.response.data.error.message);
          setShowAlert(true);
          setLoading(false);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
  };

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
          setLoading(false);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
  };

  const getArticles = () => {
    axios
      .get(`${variables.BASE_URL}/all-articles`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setArticles(response.data.data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.response.data.success === false) {
          seErrorType(error.response.data.success);
          setToolTipTitle(error.response.data.error.name);
          setMessage(error.response.data.error.message);
          setShowAlert(true);
          setLoading(false);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
  };

  useEffect(() => {
    getCategories();
    getArticles();
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 100);
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>Tryonlinefree - Share your knowledge world wide</title>
        <meta
          name="description"
          content={`Tryonlinefree is an open platform where readers can get best information and where expert can share their knowledge on our website on any topic`}
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
      <div className="container mx-auto mb-10 py-5">
        {isLoading ? (
          <div className="text-center p-5">
            <Spinner />
          </div>
        ) : (
          <>
            <div className={`allCategories ${scroll ? 'fixedTabs' : ''}`}>
              <Button
                style={{ minWidth: 100 }}
                className={`rounded-xl border py-2 mr-2 flex text-center category cursor-pointer ${
                  categoryID === null ? 'activeClass' : ''
                }`}
                onClick={() => handleTabClick(null)}
              >
                For You
              </Button>
              {categories?.map((item, index) => (
                <Button
                  key={index}
                  style={{ minWidth: 100 }}
                  onClick={() => handleTabClick(item?._id)}
                  className={`rounded-xl border py-2 mr-2 flex text-center category cursor-pointer ${
                    categoryID === item?._id ? 'activeClass' : ''
                  }`}
                >
                  {item.name}
                </Button>
              ))}
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {articles?.map((item, index) => {
                let imgArt = item?.image;
                let newImg = imgArt.split('.');
                let newImageURl =
                  newImg[0] + '.' + newImg[1] + '.' + newImg[2] + '.' + 'webp';
                var imgUrl = item?.image
                  ? newImageURl
                  : 'resources/images/article.png';
                return (
                  <div
                    className="articleItem shadow border rounded-md"
                    key={index}
                  >
                    <Link
                      title={item?.title}
                      to={`/${item?.categoryName.toLowerCase()}/${item?.slug}/${
                        item?._id
                      }`}
                      state={{ id: item._id }}
                      className="rounded-md articleBg cursor-pointer h-40 flex"
                      style={{ backgroundImage: 'url(' + imgUrl + ')' }}
                    ></Link>
                    <div className="rounded-md px-5 py-2 cursor-pointer flex flex-col">
                      <Link
                        className="text-green-500 font-semibold cursor-pointer mt-2"
                        to={`/category/${item?.categoryName.toLowerCase()}`}
                        state={{ id: item.categoryId, name: item?.categoryName }}
                      >
                        {item?.categoryName}
                      </Link>
                      <Link
                        to={`/${item?.categoryName.toLowerCase()}/${
                          item?.slug
                        }/${item?._id}`}
                        state={{ id: item._id }}
                        className="cursor-pointer text-xl font-bold mt-3"
                      >
                        {item?.title}
                      </Link>
                      <div className="articleTags">
                        {item?.tags.map((tag, index) => {
                          return (
                            <Link
                              to={`/tag/${tag.toLowerCase()}`}
                              state={{ tag: tag }}
                              className="text-cyan-400 cursor-pointer"
                              key={index}
                            >
                              #{tag}{' '}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div
        style={{ display: scroll ? 'flex' : 'none' }}
        className="scrollTop"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpIcon />
      </div>
      <Footer />
      <BottomMenu />
    </>
  );
};

export default Home;
