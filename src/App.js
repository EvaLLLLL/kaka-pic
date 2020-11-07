import './App.css'
import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import History from './pages/History'
import About from './pages/About'


function App() {
	return (
		<div className="app">
			<Header/>
			<Switch>
				<Route path="/" exact>
					<Home/>
				</Route>
				<Route path="/history">
					<History/>
				</Route>
				<Route path="/about">
					<About/>
				</Route>
			</Switch>
			<Footer/>
		</div>
	)
}

export default App
