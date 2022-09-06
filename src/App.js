import { Routes, Route } from 'react-router-dom'
import Register from "./screens/Register/Register"
import Login from "./screens/Login/Login"
import Profile from './screens/Profile/Profile'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import Timeline from './screens/Timeline/Timeline'
import SignOut from './screens/SignOut/SignOut'

const App = () => {
	const { loggedIn } = useContext(AuthContext)
	return (
		<>
			<Routes>
				{loggedIn && <Route exact path="/" element={<Timeline />} />}
				{loggedIn && <Route path="/profile" element={<Profile />} />}
				{!loggedIn && <Route exact path="/" element={<Register />} />}
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/logout' element={<SignOut />} />
			</Routes>
		</>
	)
}

export default App