import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Container } from '@chakra-ui/react';
import {Link} from 'react-router-dom'
import { ReactComponent as Logo } from '../logo.svg';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import '../components/Navbar.css'

const NavBar = props => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    var login = JSON.parse(localStorage.getItem('login'));
    if(login)(
      setLoggedIn(login)
    )
  },[loggedIn])


  return (
    <NavBarContainer {...props}>
      <Link to="/">
        <Logo style={{ width:'80px', height: '50px' }} />
      </Link>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} loggedIn={loggedIn}/>
      <ColorModeSwitcher justifySelf="flex-end" />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuLinks = ({ isOpen, loggedIn }) => {

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('login')
    window.location.replace('/');
  }  

  return (
    <Box
      display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        <Link to="/">Articles</Link>
        <Link to="/"> Categories </Link>
        <Link to="/"> Tags </Link>
        <Link to="/"> Users </Link>

        {!loggedIn ?
        <>
        <Link to="/login">
          <Button
            size="sm"
            rounded="md"
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            size="sm"
            rounded="md"
          >
            Sign Up
          </Button>
        </Link>
        </>
        :
        <>
        <Link to="/dashboard">
          <Button
            size="sm"
            rounded="sm"
          >
            Dashboard
          </Button>
        </Link>
        <Button
          onClick={handleLogout}
          size="sm"
          rounded="sm"
        >
          Logout
        </Button>
        </>
        }
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Container
      as="nav"
      maxW='lg'
      display={'flex'} 
      justifyContent={'space-between'} 
      alignItems={'center'} 
      maxWidth={{ lg: '1400px', md: '1000px', sm: '600px' }}
      paddingY={2}
      {...props}
      borderBottom={"1px solid #ccc"}
    >
      {children}
    </Container>
  );
};

export default NavBar;
