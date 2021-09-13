import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

const NavbarMenu = () => {
    const {
        authState: {
            user: { username }
        },
        logoutUser
    } = useContext(AuthContext)

    const logout = () => logoutUser()

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow px-2'>
            <Navbar.Brand className='font-weight-bolder text-white mx-3'>
                <img
                    src={learnItLogo}
                    alt='learnItLogo'
                    width='32'
                    height='32'
                    style={{
                        marginRight: '10px'
                    }}
                />
                LearnIt
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />

            <Navbar.Collapse className="justify-content-end" id='basic-navbar-nav'>
                <Nav className='mx-3'>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/dashboard'
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/about'
                        as={Link}
                    >
                        About
                    </Nav.Link>
                    <Nav.Link className='font-weight-bolder text-white' disabled>
                        Welcome {username}
                    </Nav.Link>
                </Nav>

                <Nav className="mx-3">
                    <Button
                        variant='secondary'
                        className='font-weight-bolder text-white'
                        onClick={logout}
                    >
                        <img
                            src={logoutIcon}
                            alt='logoutIcon'
                            width='32'
                            height='32'
                            className='mr-2'
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu