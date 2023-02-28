import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BottomMenu = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem('login'));
    setLoggedIn(login);
  }, []);

  return (
    <div className="bottomMobileMenu">
      <NavLink 
        className="menuItem" 
        to="/" 
        activeClassName="active"
      >
        <HomeIcon />
      </NavLink>
      <NavLink 
        className="menuItem" 
        to="/search" 
        activeClassName="active"
      >
        <SearchIcon />
      </NavLink>
      <NavLink
        className="menuItem"
        to={isLoggedIn ? '/add-article' : '/login'}
        activeClassName="active"
      >
        <AddCircleIcon />
      </NavLink>
      <NavLink
        className="menuItem"
        to="/notifications"
        activeClassName="active"
      >
        <NotificationsIcon />
      </NavLink>
      <NavLink
        className="menuItem"
        to={isLoggedIn ? '/profile' : '/login'}
        activeClassName="active"
      >
        <AccountCircleIcon />
      </NavLink>
    </div>
  );
};
export default BottomMenu;
