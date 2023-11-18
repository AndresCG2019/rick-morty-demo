import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

export interface IHomePageProps { }

const Home: React.FunctionComponent<IHomePageProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div className='container-fluid mt-3'>
            <p>This is the home page.</p>
            <Button
                color="primary"
                outline
            >
                primary
            </Button>
            <p>
                <Link to="/about">Go to the About Page!</Link>
            </p>
            {/* <p>
                <Link to="/test">Go to the Test Page!</Link>
            </p>
            <button onClick={() => navigate('/layout/55')}>Go to layout, with a number</button> */}
        </div>
    );
};

export default Home;
