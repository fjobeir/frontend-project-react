import { Routes, Route } from 'react-router-dom'
import Register from "./screens/Register/Register"
import Login from "./screens/Login/Login"
import Profile from './screens/Profile/Profile'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import Timeline from './screens/Timeline/Timeline'

const App = () => {
	const { loggedIn } = useContext(AuthContext)
	return (
		<>
			<Routes>
				{loggedIn && <Route exact path="/" element={<Timeline />} />}
				{loggedIn && <Route path="/profile" element={<Profile />} />}
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	)
}

export default App