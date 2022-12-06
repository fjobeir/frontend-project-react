import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import './Profile.css'

import Wrapper from "../../components/Wrapper/Wrapper"
import Head from "../../components/Head/Head"

const Profile = () => {
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

    const updateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API}/users/me`, {
            method: 'post',
            body: new FormData(e.target),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
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
            <form onSubmit={updateProfile}>
                <div className="p-3 mb-4 bottom-border">
                    <div className="alert alert-info">My Information</div>
                    <div className='form-field mb-3 person-avatar'>
                        <label htmlFor='avatar' className='mx-auto my-2 d-block w-25'>
                        {
                            currentUser.avatar && <img src={currentUser.avatar} className='d-block mx-auto rounded-circle w-100' />
                        }
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="#FFF" d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"/></svg>
                        </div>
                        </label>
                        <input name="avatar" type='file' id="avatar" className='position-absolute' />
                    </div>
                    <div className='form-field mb-3'>
                        <label htmlFor='name' className='mb-2'><small>Name <span className="text-danger">*</span></small></label>
                        <input name="name" type='text' value={currentUser?.name} id="name" onChange={(e) => { onChangeHandler(e, { name: e.target.value }) }} className='form-control' />
                    </div>
                    <div className='form-field mb-3'>
                        <label htmlFor='email' className='mb-2'><small>Email Address <span className="text-danger">*</span></small></label>
                        <input value={currentUser?.email} name="email" onChange={(e) => { onChangeHandler(e, { email: e.target.value }) }} type='email' id="email" className='form-control' />
                    </div>
                    <div className='form-field mb-3'>
                        <label htmlFor='password' className='mb-2'><small>Password</small></label>
                        <input name="password" type='password' id="password" className='form-control' />
                    </div>
                    <div className='form-field mb-3'>
                        <label htmlFor='new_password' className='mb-2'><small>New Password</small></label>
                        <input name="new_password" type='password' id="new_password" className='form-control' />
                    </div>
                    <div className='form-field mb-3'>
                        <label htmlFor='password_confirmation' className='mb-2'><small>New Password Confirmation</small></label>
                        <input name="new_password_confirmation" type='password' id="password_confirmation" className='form-control' />
                    </div>
                    {/* <input type='hidden' name='_method' value='put' /> */}
                    <div className='form-field mb-3'>
                        <button disabled={loading} type='submit' className="btn btn-primary">Update Profile</button>
                    </div>
                </div>
            </form>
            <div className="mb-4 p-3">
                <div className="alert alert-info">My Posts</div>
                <ul className="list-group">
                    {
                        currentUser?.posts?.map((post, i) => {
                            return (
                                <li className="list-group-item d-flex align-items-center justify-content-between" key={i}>
                                    <span className="hide-extra">{post.content}</span>
                                    <span>
                                        <button onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this post')) {
                                                deletePost(post.id)
                                            }
                                        }} className="btn btn-danger btn-sm">Delete</button>
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