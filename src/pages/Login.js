import React, {useRef} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores/index'

const Component = observer(() => {
	const {AuthStore} = useStores()
	const inputRef = useRef(null)
	
	const bindChange = () => {
		AuthStore.setUsername(inputRef.current.value)
	}
	
	return (
		<>
			<h1>Login: {AuthStore.values.username}</h1>
			<input onChange={bindChange} ref={inputRef}/>
		</>
	)
})

export default Component
