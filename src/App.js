import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'

import Loading from './components/Loading/Loading'

const Register = React.lazy(() => import("./screens/Register/Register"))
const Login = React.lazy(() => import("./screens/Login/Login"))
const Profile = React.lazy(() => import('./screens/Profile/Profile'))
const Timeline = React.lazy(() => import('./screens/Timeline/Timeline'))
const SignOut = React.lazy(() => import('./screens/SignOut/SignOut'))



const App = () => {
	const { loggedIn } = useContext(AuthContext)
	return (
		<>
			<Routes>
				{loggedIn && <Route exact path="/" element={<Suspense fallback={<Loading />}><Timeline /></Suspense>} />}
				{loggedIn && <Route path="/profile" element={<Suspense fallback={<Loading />}><Profile /></Suspense>} />}
				{!loggedIn && <Route exact path="/" element={<Suspense fallback={<Loading />}><Register /></Suspense>} />}
				<Route path='/register' element={<Suspense fallback={<Loading />}><Register /></Suspense>} />
				<Route path='/login' element={<Suspense fallback={<Loading />}><Login /></Suspense>} />
				<Route path='/logout' element={<Suspense fallback={<Loading />}><SignOut /></Suspense>} />
				<Route path='/l' element={<Loading />} />
			</Routes>
		</>
	)
}

export default App