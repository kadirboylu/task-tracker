import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4 style={{ color: "white" }}>Version 1.0.0</h4>
      <Link className="link" to="/">
        Go Back
      </Link>
    </div>
  );
};

export default About;
