import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>Page not found. Go back to <Link to="/">Home</Link>.</p>
    </div>
  );
};

export default NotFoundPage;
