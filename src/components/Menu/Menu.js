import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import classes from './Menu.module.css'
import { Home, Person, Mail, Explore, Bookmarks, ViewList, Lock } from '@mui/icons-material';

const Menu = () => {
    const links = [
        {
            to: '/',
            icon: <Home />,
            text: 'Home'
        },
        {
            to: '/somewhere',
            icon: <Mail />,
            text: 'Messages'
        },
        {
            to: '/somewhere',
            icon: <Bookmarks />,
            text: 'Bookmarks'
        },
        {
            to: '/somewhere',
            icon: <Explore />,
            text: 'Explore'
        },
        {
            to: '/somewhere',
            icon: <ViewList />,
            text: 'Lists'
        },
        {
            to: '/profile',
            icon: <Person />,
            text: 'Profile'
        },
        {
            to: '/logout',
            icon: <Lock />,
            text: 'Sign Out'
        }
    ]
    return (
        <header>
            <nav>
                <img className={classes.logo} src={logo} alt='' />
                <div className={classes.menu}>
                {
                    links.map((link, i) => {
                        return (
                            <NavLink className={({isActive}) => {
                                let c = classes.menuItem + ' '
                                c += isActive ? classes.isActive : ''
                                return c
                            }} key={i} to={link.to}>
                                <div className={classes.icon}>
                                    {link.icon}
                                </div>
                                <div>{link.text}</div>
                            </NavLink>
                        )
                    })
                }
                </div>
            </nav>
        </header>
    )
}

export default Menu