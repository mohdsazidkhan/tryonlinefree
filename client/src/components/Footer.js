import { NavLink } from 'react-router-dom';

const Footer = () => {

  return (
    <div className="bottomFooter">
      <NavLink 
        className="footerLink" 
        to="/about" 
      >
        About
      </NavLink>
      <NavLink 
        className="footerLink" 
        to="/contact" 
      >
        Contact
      </NavLink>
      <NavLink
        className="footerLink"
        to='/disclaimer'
      >
        Disclaimer
      </NavLink>
      <NavLink
        className="footerLink"
        to="/privacy-policy"
      >
        Privacy Policy
      </NavLink>
    </div>
  );
};
export default Footer;
