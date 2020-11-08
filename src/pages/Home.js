import React from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'

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
		</>
	)
})

export default Home
