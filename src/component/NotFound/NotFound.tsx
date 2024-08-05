import { Link } from 'react-router-dom';

import './NotFound.css';
import { Helmet } from 'react-helmet-async';
const NotFound = () => {
    return (
        <div className="notFound">
            <Helmet>
                <title>404 Not Found</title>
                <meta
                    name="description"
                    content="404 Not Found"
                />
                <link rel="canonical" href="/404" />
            </Helmet>

            <h1>404 - Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to={`/`}>Home</Link>
        </div>
    );
};

export default NotFound;
