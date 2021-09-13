import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Spinner } from 'react-bootstrap'
import NavbarMenu from '../layout/NavbarMenu'

function ProtectRoute({ component: Component, ...rest}) {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    
    if (authLoading)
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        )
    return (
        <Route {...rest} render={props => isAuthenticated ? (<>
            <NavbarMenu />
            <Component {...rest} {...props} />
        </>): (<Redirect to='/login' />)} />
    )
}

export default ProtectRoute
