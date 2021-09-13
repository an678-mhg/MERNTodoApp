import React, {useState, useContext} from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import AlertMessage from '../layout/AlertMessage'

function RegisterForm() {
    // Context
    const { registerUser } = useContext(AuthContext)

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        comfirmPassword: ''
    })

    const [alert, setAlert] = useState(null)

    const { username, password, comfirmPassword } = registerForm

    const handleOnchangeInput = e => setRegisterForm(
        {
        ...registerForm, [e.target.name]: e.target.value
        })

    const register = async e => {
        e.preventDefault()

        console.log(password, comfirmPassword)

        if (password !== comfirmPassword) {
            setAlert({ type: 'danger', message: 'Password not match' })
            return
        } else {
            try {
                const registerData = await registerUser(registerForm)
                if (registerData.success) {
                    console.log(registerData.message)
                } else {
                    setAlert({ type: 'danger', message: registerData.message })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Form onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-3">
                    <Form.Control required onInput={() => setAlert(null)} onChange={handleOnchangeInput}
                    value={username} name="username" type="text" placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control required onInput={() => setAlert(null)} onChange={handleOnchangeInput}
                        value={password} name="password" type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control required onInput={() => setAlert(null)} onChange={handleOnchangeInput}
                        value={comfirmPassword} name="comfirmPassword" type="password" placeholder="Comfirm Password" />
                </Form.Group>

                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
            <p className="my-3">Already have an account?
                <Link to="/login" >
                    <Button className="mx-2" size="sm" variant="info" type="submit">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm
