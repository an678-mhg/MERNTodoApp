import React from 'react'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

function Auth({ authRoute }) {
    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    let body
    
    if (authLoading) 
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )

    else if (isAuthenticated) return <Redirect to="/dashboard" />

    else 
        body = (
            <>
                {
                    authRoute === 'login' && <LoginForm />
                }
                {
                    authRoute === 'register' && <RegisterForm />
                }
            </>
        )
    
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <div className="landing-form">
                        <h1>LearnIt</h1>
                        <h4>Keep track of what you are learning</h4>
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth