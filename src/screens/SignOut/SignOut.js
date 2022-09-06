import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const SignOut = () => {
    const navigate = useNavigate()
    const { signOut } = useContext(AuthContext)
    useEffect(() => {
        signOut()
        navigate('/')
    }, [])
    return (
        <></>
    )
}

export default SignOut