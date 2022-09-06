import './Head.css'
import { Home, Lock, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Head = ({title}) => {
    return (
        <div className="head">
            <h4 className='m-0'>{title}</h4>
            <div className='d-flex d-md-none'>
                <div className='headIcon'>
                    <Link to='/'>
                        <Home />
                    </Link>
                </div>
                <div className='headIcon'>
                    <Link to='/profile'>
                        <Person />
                    </Link>
                </div>
                <div className='headIcon'>
                    <Link to='/logout'>
                        <Lock />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Head