import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <footer>
      <p>Copyright &copy; 2022</p>
      {location.pathname === "/" && (
        <Link className="link" to="/about">
          About
        </Link>
      )}
    </footer>
  );
};

export default Footer;
