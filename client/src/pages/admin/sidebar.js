import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const [userType, setUserType] = useState('')

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    const userT = user.userType;
    setUserType(userT)
  }, [])

return(
  <Box className='sideBar'>
    {userType === 'admin' 
    ?
    <div className="leftMenu">
      <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
      <NavLink to="/all-categories" activeclassname="active">Categories</NavLink>
      <NavLink to="/all-articles" activeclassname="active">Articles</NavLink>
      <NavLink to="/all-tags" activeclassname="active">Tags</NavLink>
      <NavLink to="/all-users" activeclassname="active">Users</NavLink>
      <NavLink to="/profile" activeclassname="active">Profile</NavLink>
    </div>
    :
    <div className="leftMenu">
      <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
      <NavLink to="/all-articles" activeclassname="active">Articles</NavLink>
      <NavLink to="/profile" activeclassname="active">Profile</NavLink>
    </div>
    }
  </Box>
)
}
export default Sidebar;