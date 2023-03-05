import BottomMenu from '../components/BottomMenu';
import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { variables } from '../config/config';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import NavBar from '../components/Navbar';

const SearchPage = () => {

  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [scroll, setScroll] = useState(false);

  const getSearchArticles = e => {
    const query = e.target.value;
    console.log(query.length, ' query.length');

    const filteredArticles = articles.filter(item => {
      return item.title.toLowerCase().includes(query.toLowerCase());
    });
    setArticles(filteredArticles);
    if (e.target.value === '') getArticles();
  };
  const handleSearchBlur = () => {
    getArticles();
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
    getArticles();
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 100);
    });
  }, []);
  return (
    <>
      <NavBar />
      {isLoading ? (
        <div className="text-center p-5">
          <Spinner />
        </div>
      ) : (
        <>
        <div className="container mx-auto mb-10 py-5">
          <div className="searchInput">
            <input
              type="text"
              placeholder="Enter search term..."
              onChange={e => getSearchArticles(e)}
              onBlur={() => handleSearchBlur()}
            />
          </div>
          <div className="searchArticles mobile mb-10">
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
                  className="searchArticleItem shadow border rounded-md"
                  key={index}
                >
                  <div className="searchArticleBg cursor-pointer">
                    <div
                      className="articleImg"
                      style={{ backgroundImage: 'url(' + imgUrl + ')' }}
                      title={item?.title}
                    ></div>
                  </div>
                  <div className="rounded-md p-2 cursor-pointer flex flex-col">
                    <Link
                      to={`/${item?.categoryName.toLowerCase()}/${item?.slug}/${
                        item?._id
                      }`}
                      state={{ id: item._id }}
                      className="cursor-pointer text-base font-bold"
                    >
                      {item?.title.substring(0, 60) + '...'}
                    </Link>
                    <Link
                      className="text-green-500 font-semibold cursor-pointer mt-2"
                      to={`/category/${item?.categoryName.toLowerCase()}`}
                      state={{ id: item.categoryId, name: item?.categoryName }}
                    >
                      {item?.categoryName}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='searchPosts desktop mb-10'>
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
          </div>
          
          </div>
          <div
            style={{ display: scroll ? 'flex' : 'none' }}
            className="scrollTop"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUpIcon />
          </div>
          <BottomMenu />
        </>
      )}
    </>
  );
};

export default SearchPage;
