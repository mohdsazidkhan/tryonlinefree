import React from 'react';
import {
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import ForgotPassword from './pages/forgotpassword'
import Dashboard from './pages/dashboard';
import './style.css'
import AllCategories from './pages/allcategories';
import AllArticles from './pages/allarticles';
import AllTags from './pages/alltags';
import AllUsers from './pages/allusers';
import AddArticle from './pages/addarticle';
const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}
const theme = extendTheme({ breakpoints })
function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
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
          <Route path="/add-article" element={<AddArticle />} />
          {/* <Route path="*" element={ <NoPage /> } /> */}
        </Routes>
    </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
