import './App.css'
import React, {Suspense, lazy} from 'react'
import {useStores} from './stores'
import {Switch, Route, useHistory} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'))
const History = lazy(() => import('./pages/History'))
const About = lazy(() => import('./pages/About'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

function App() {
	const {AuthStore} = useStores()
	const history = useHistory()
	if (window.localStorage.getItem('username')) {
		AuthStore.setUsername(window.localStorage.getItem('username'))
		AuthStore.setPassword(window.localStorage.getItem('password'))
		AuthStore.login()
			.then(() => {
				history.push('/')
			})
			.catch(error => alert(error))
	}
	
	return (
		<>
			<Header/>
			<main>
				<Suspense fallback={<Loading/>}>
					<Switch>
						<Route path="/" exact component={Home}/>
						<Route path="/history" component={History}/>
						<Route path="/about" component={About}/>
						<Route path="/login" component={Login}/>
						<Route path="/register" component={Register}/>
					</Switch>
				</Suspense>
			</main>
			<Footer/>
		</>
	)
}

export default App
