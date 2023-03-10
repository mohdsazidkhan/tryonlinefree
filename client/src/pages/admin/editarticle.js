import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { variables } from '../../config/config';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import Sidebar from './sidebar';
import BottomMenu from '../../components/BottomMenu'
import { Helmet } from 'react-helmet';

const EditArticle = () => {
  let params = useParams()
  let articleId = params?.postID;
  
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [errorType, seErrorType] = useState(false);
  const [message, setMessage] = useState('');
  const [tooltopTitle, setToolTipTitle] = useState('');
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState('');
  const [imageBase64, setBase64IMG] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
  const handleImageChange = e => {
    convertToBase64(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const convertToBase64 = selectedFile => {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setBase64IMG(reader.result);
    };
  };

  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = e => {
    var val = e.target.value;
    var index = e.nativeEvent.target.selectedIndex;
    var label = e.nativeEvent.target[index].text;
    setCategoryId(val);
    setCategoryName(label);
  };

  const handleContent = e => {
    setContent(e);
  };

  const handleFullscreen = e => {
    setFullscreen(true);
  };

  const handleMiniscreen = e => {
    setFullscreen(false);
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
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
  };

  const getArticle = () => {
    axios
      .get(`${variables.BASE_URL}/article/${articleId}`)
      .then(response => {
        if (response.data.success) {
          setToolTipTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          let article = response.data.data;
          setImage(article?.image)
          setTitle(article?.title)
          setCategoryId(article?.categoryId)
          setCategoryName(article?.categoryName)
          setTags(article?.tags)
          setContent(article?.content)
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
    getArticle();
  }, []);

  const handleArticle = () => {
    var user = JSON.parse(localStorage.getItem('user'));
    let userId = user?._id;
    let userName = user?.name;
    let userEmail = user?.email;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('categoryId', categoryId);
    formData.append('categoryName', categoryName);
    formData.append('tags', tags);
    formData.append('content', content);
    formData.append('userId', userId);
    formData.append('userName', userName);
    formData.append('userEmail', userEmail);
    axios({
      method: 'post',
      url: `${variables.BASE_URL}/updateArticle/${articleId}`,
      data: formData,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(response => {
        if (response.data.success) {
          setTitle('Success');
          setMessage(response.data.message);
          seErrorType(response.data.success);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            navigate('/all-articles');
          }, 3000);
        }
      })
      .catch(error => {
        if (error.response.data.success === false) {
          seErrorType(error.response.data.success);
          setTitle(error.response.data.error.name);
          setMessage(error.response.data.error.message);
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      });
  };

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value.toLowerCase()]);
    e.target.value = '';
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }
  let imgUrl = ''
  imgUrl = imageBase64 ? imageBase64 : image ? image 
  : require('../../resources/images/article.png')
  return (
    <>
      <Helmet>
        <title>Edit Article</title>
        <meta
          name="description"
          content={`Welcome to Tryonlinefree! Edit Article`}
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
      <div className='container mt-5 mx-auto'>
        <Flex color="white" className="mainContent pb-5">
          <Sidebar />
          <Box flex="1" className="content">
            <Heading textAlign="center" color="teal.400">
              Update Article
            </Heading>
            <Box maxW={{ base: '100%' }}>
              <form>
                <Stack spacing={4} p="1rem" boxShadow="md">
                  <FormControl>
                    <div className="uploadedImg relative" style={{backgroundImage:'url('+imgUrl+')'}}>
                      <input
                        className='uploadArticle'
                        name="image"
                        type="file"
                        onChange={handleImageChange}
                      />
                    </div>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <Input
                        name="title"
                        type="text"
                        placeholder="Enter Title"
                        value={title}
                        onChange={handleTitleChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <Select onChange={handleCategoryChange}>
                      <option value="">
                        Select Category
                      </option>
                      {categories?.map((item, index) => (
                        <option key={index} value={item?._id} selected={categoryId === item?._id}>
                          {item?.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <div className="tags-input-container">
                      {tags.map((tag, index) => (
                        <div className="tag-item" key={index}>
                          <span className="text">{tag}</span>
                          <span
                            className="close"
                            onClick={() => removeTag(index)}
                          >
                            &times;
                          </span>
                        </div>
                      ))}
                      <Input
                        name="tag"
                        type="text"
                        placeholder="Enter tag & press enter"
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                  </FormControl>
                  <FormControl>
                    <div
                      className={`textEditor ${
                        fullscreen ? 'fullscreenEditor' : ''
                      }`}
                    >
                      {fullscreen ? (
                        <div className="miniscreen" onClick={handleMiniscreen}>
                          <img
                            src={require('../../resources/images/miniscreen.png')}
                            alt="miniscreen"
                          />
                        </div>
                      ) : (
                        <div className="fullscreen" onClick={handleFullscreen}>
                          <img
                            src={require('../../resources/images/fullscreen.png')}
                            alt="fullscreen"
                          />
                        </div>
                      )}
                      <EditorToolbar />
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleContent}
                        modules={modules}
                        formats={formats}
                      />
                    </div>
                  </FormControl>

                  {fullscreen === false && (
                    <Button
                      onClick={handleArticle}
                      borderRadius={4}
                      variant="solid"
                      colorScheme="teal"
                      width="full"
                    >
                      Submit
                    </Button>
                  )}
                </Stack>
              </form>
            </Box>
          </Box>
        </Flex>
      </div>
      <BottomMenu />
    </>
  );
};

export default EditArticle;
