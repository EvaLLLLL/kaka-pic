import React from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import Uploader from '../components/Uploader'

const Home = observer(() => {
	const {UserStore} = useStores()
	
	return (
		<>
			<h1>Home</h1>
			{
				UserStore.currentUser ?
					<>
						Hello, {UserStore.currentUser.attributes.username}
					</> : '未登录'
				
			}
			<Uploader/>
		</>
	)
})

export default Home
