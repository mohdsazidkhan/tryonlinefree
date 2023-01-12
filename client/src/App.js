import React from 'react';
import {
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ForgotPassword from './pages/auth/forgotpassword'
import Dashboard from './pages/admin/dashboard';
import Profile from './pages/admin/profile';
import './style.css'
import AllCategories from './pages/admin/allcategories';
import AllArticles from './pages/admin/allarticles';
import AllTags from './pages/admin/alltags';
import AllUsers from './pages/admin/allusers';
import Users from './pages/users/users';
import UserProfile from './pages/users/profile';
import AddArticle from './pages/admin/addarticle';
import ArticleDetail from './pages/posts/articleDetail';
import CategoryArticles from './pages/categories/categoryArticles';
import Categories from './pages/categories/categories';
import Articles from './pages/posts/articles';
import Tags from './pages/tags/tags';
import TagPosts from './pages/tags/tagPosts';

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}
const theme = extendTheme({ config, breakpoints })
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/all-articles" element={<AllArticles />} />
          <Route path="/all-tags" element={<AllTags />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-article" element={<AddArticle />} />
          <Route path="/:category/:slug" element={<ArticleDetail />} />
          <Route path="/category/:categoryName" element={<CategoryArticles />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/tag/:tag" element={<TagPosts />} />
          <Route path="/user/profile/:userId" element={<UserProfile />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="*" element={ <NoPage /> } /> */}
        </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
