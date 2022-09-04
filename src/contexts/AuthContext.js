import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const [loggedIn, setLoggedIn] = useState(!!token)
    const [user, setUser] = useState({})

    useEffect(() => {
        const u = window.localStorage.getItem('user')
        if (u) {
            setUser(JSON.parse(u))
        }
    }, [])

    const signIn = (response) => {
        window.localStorage.setItem('token', response.token)
        setLoggedIn(true)
        setToken(response.token)
        setUser(response.data)
        window.localStorage.setItem('user', JSON.stringify(response.data))
    }
    const signOut = () => {
        window.localStorage.removeItem('token')
        setLoggedIn(false)
        setToken('')
        setUser({})
    }
    return (
        <AuthContext.Provider value={{
            loggedIn,
            token,
            signIn,
            signOut,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider