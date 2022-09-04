import classes from './Register.module.css'
import logo from '../../assets/images/logo.svg'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const [loading, setLoading] = useState(false)
    const register = async () => {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API}/users/register`, {
            method: 'post',
            body: JSON.stringify({
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                password_confirmation: passwordConfirmationRef.current.value,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        setLoading(false)
        window.alert(json.messages.join(', '))
        if (json.success) {
            navigate('/login')
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                    <div className={`${classes.register} my-5 p-5`}>
                        <div className={`${classes.logo} mb-4`}>
                            <img src={logo} alt='' />
                        </div>
                        <h1 className={`${classes.title} mb-4`}>Create Account</h1>
                        <div className='form-field mb-3'>
                            <label htmlFor='name' className='mb-2'>Name</label>
                            <input type='text' ref={nameRef} id="name" className='form-control' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor='email' className='mb-2'>Email Address</label>
                            <input type='email' ref={emailRef} id="email" className='form-control' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor='password' className='mb-2'>Password</label>
                            <input type='password' ref={passwordRef} id="password" className='form-control' />
                        </div>
                        <div className='form-field mb-3'>
                            <label htmlFor='password_confirmation' className='mb-2'>Password Confirmation</label>
                            <input type='password' ref={passwordConfirmationRef} id="password_confirmation" className='form-control' />
                        </div>
                        <div className='row mt-5'>
                            <div className='col-6'>
                                <Link className='btn btn-dark w-100' to='/login'>Go To Login</Link>
                            </div>
                            <div className='col-6'>
                                <button
                                    className='btn btn-primary w-100'
                                    disabled={loading}
                                    onClick={register}>
                                        {loading ? 'Please Wait' : 'Register'}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register