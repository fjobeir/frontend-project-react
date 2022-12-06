import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const SignOut = () => {
    const navigate = useNavigate()
    const { signOut, token } = useContext(AuthContext)
    useEffect(() => {
        signOut()
        const removeTokens = async function() {
            const response = await fetch(`${process.env.REACT_APP_API}/users/logout`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/login')
        }
        removeTokens()
    }, [])
    return (
        <></>
    )
}

export default SignOut