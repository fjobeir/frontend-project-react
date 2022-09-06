import Wrapper from "../../components/Wrapper/Wrapper"
import Head from "../../components/Head/Head"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"


const Profile = () => {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const newPasswordRef = useRef()
    const newPasswordConfirmationRef = useRef()
    const { token, user, setUser } = useContext(AuthContext)
    
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    useEffect(() => {
        const getMe = async () => {
            const response = await fetch(`${process.env.REACT_APP_API}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const json = await response.json()
            if (json.success) {
                setCurrentUser(json.data)
            }
        }
        getMe()
    }, [])

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    const updateProfile = async () => {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API}/users/me`, {
            method: 'put',
            body: JSON.stringify({
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                new_password: newPasswordRef.current.value,
                new_password_confirmation: newPasswordConfirmationRef.current.value,
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        setLoading(false)
        window.alert(json.messages.join(', '))
        if (json.success) {
            setUser(json.data)
            window.localStorage.setItem('user', JSON.stringify(json.data))
        }
    }

    const onChangeHandler = (e, field) => {
        setCurrentUser((prev) => {
            return {
                ...currentUser,
                ...field
            }
        })
    }

    const deletePost = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/${id}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const json = await response.json()
        if (json.success) {
            const currentPosts = [...currentUser.posts]
            const remainedPosts = currentPosts.filter((p) => p.id != id)
            setCurrentUser({
                ...currentUser,
                posts: remainedPosts
            })
        }
    }

    return (
        <Wrapper>
            <Head title={'Profile'} />
            <div className="p-3 mb-4 bottom-border">
                <div className="alert alert-info">My Information</div>
                <div className='form-field mb-3'>
                    <label htmlFor='name' className='mb-2'><small>Name <sup>*</sup></small></label>
                    <input onChange={(e) => {onChangeHandler(e, {name: e.target.value})}} type='text' ref={nameRef} value={currentUser?.name} id="name" className='form-control' />
                </div>
                <div className='form-field mb-3'>
                    <label htmlFor='email' className='mb-2'><small>Email Address <sup>*</sup></small></label>
                    <input onChange={(e) => {onChangeHandler(e, {email: e.target.value})}} type='email' ref={emailRef} value={currentUser?.email} id="email" className='form-control' />
                </div>
                <div className='form-field mb-3'>
                    <label htmlFor='password' className='mb-2'><small>Password</small></label>
                    <input type='password' ref={passwordRef} id="password" className='form-control' />
                </div>
                <div className='form-field mb-3'>
                    <label htmlFor='new_password' className='mb-2'><small>New Password</small></label>
                    <input type='password' ref={newPasswordRef} id="new_password" className='form-control' />
                </div>
                <div className='form-field mb-3'>
                    <label htmlFor='password_confirmation' className='mb-2'><small>New Password Confirmation</small></label>
                    <input type='password' ref={newPasswordConfirmationRef} id="password_confirmation" className='form-control' />
                </div>
                <div className='form-field mb-3'>
                    <button disabled={loading} onClick={updateProfile} className="btn btn-primary">Update Profile</button>
                </div>
            </div>
            <div className="mb-4 p-3">
            <div className="alert alert-info">My Posts</div>
                <ul class="list-group">

                {
                    currentUser?.posts?.map((post, i) => {
                        return (
                            <li class="list-group-item d-flex align-items-center justify-content-between" key={i}>
                                <span className="hide-extra">{post.content}</span>
                                <span>
                                    <button onClick={() => {deletePost(post.id)}} className="btn btn-danger btn-sm">Delete</button>
                                </span>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        </Wrapper>
    )
}

export default Profile