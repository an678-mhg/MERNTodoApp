import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import AlertMessage from '../layout/AlertMessage'

function LoginForm() {
    // Context
    const { loginUser } = useContext(AuthContext)

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm

    const handleOnchangeInput = e => setLoginForm({
        ...loginForm, [e.target.name]: e.target.value
    })

    const login = async e => {
        e.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                console.log(loginData.message)
            } else {
                setAlert({ type: 'danger', message: loginData.message })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control required name="username" type="text" placeholder="Username" value={username}
                    onChange={handleOnchangeInput}
                    onInput={() => setAlert(null)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control required name="password" type="password" placeholder="Password" value={password}
                    onChange={handleOnchangeInput}
                    onInput={() => setAlert(null)} />
                </Form.Group>

                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>

            <p className="my-3">Don't have an account?
                <Link to="/register" >
                    <Button className="mx-2" size="sm" variant="info" type="submit">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm
