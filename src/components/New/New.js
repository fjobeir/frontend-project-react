import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import './NewPost.css'

const NewPost = () => {
    const { user, token } = useContext(AuthContext)
    const newPost = useRef()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const createPost = async () => {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API}/posts`, {
            method: 'post',
            body: JSON.stringify({
                content: newPost.current.value,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const json = await response.json()
        setLoading(false)
        window.alert(json.messages.join(', '))
        if (json.success) {
            navigate('/')
        }
    }
    return (
        <div className='new'>
            <img src={user?.avatar} alt='' />
            <div className='textarea'>
                <textarea ref={newPost} placeholder='What is happening?'></textarea>
            <button disabled={loading} className='btn btn-primary' onClick={createPost}>Create Post</button>
            </div>
        </div>
    )
}

export default NewPost