import { Link } from 'react-router-dom';

const BackButtonLink = ({ to, text }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'blue' }}>
      &lt; {text}
    </Link>
  );
};

export default BackButtonLink;