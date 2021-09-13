import { createContext, useReducer, useEffect } from "react"
import axios from 'axios'
import { AuthReducer } from "../Reducer/AuthReducer"
import { apiUrl, LOCALSTRORAGE_TOKEN } from "./const"
import setAuthToken from "../utils/SetAuthToken"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //check login
    const loadUser = async () => {
        if (localStorage[LOCALSTRORAGE_TOKEN]) {
            setAuthToken(localStorage[LOCALSTRORAGE_TOKEN])
        }

        try {
            const response = await axios.get(`${apiUrl}/auth`)
            if ( response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCALSTRORAGE_TOKEN)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }

    useEffect(() => loadUser(), [])

    //login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm)
            if (response.data.success)
                localStorage.setItem(LOCALSTRORAGE_TOKEN, response.data.accessToken)
            
            await loadUser()

            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            return {success: false, message: 'Server not found'}
        }
    }

    //register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if (response.data.success)
                localStorage.setItem(LOCALSTRORAGE_TOKEN, response.data.accessToken)

            await loadUser()

            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            return { success: false, message: 'Server not found' }
        }
    }

    // Logout 
    const logoutUser = () => {
        localStorage.removeItem(LOCALSTRORAGE_TOKEN)
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }

    //context data
    const authContextData = { loginUser, registerUser, authState, logoutUser }
    
    //return provider
    return (
        <AuthContext.Provider value={authContextData} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider