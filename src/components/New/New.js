import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import './NewPost.css'

const NewPost = ({setPosts}) => {
    const { user, token } = useContext(AuthContext)
    const newPost = useRef()
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
        if (json?.success) {
            setPosts((posts) => [json.data, ...posts])
            newPost.current.value = ''
        } else {
            window.alert(json?.messages?.join(', '))
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