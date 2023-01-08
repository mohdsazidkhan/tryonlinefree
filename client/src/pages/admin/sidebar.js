import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
return(<Box className='sideBar'>
            <div className="leftMenu">
              <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
              <NavLink to="/all-categories" activeclassname="active">Categories</NavLink>
              <NavLink to="/all-articles" activeclassname="active">Articles</NavLink>
              <NavLink to="/all-tags" activeclassname="active">Tags</NavLink>
              <NavLink to="/all-users" activeclassname="active">Users</NavLink>
            </div>
          </Box>
)
}
export default Sidebar;