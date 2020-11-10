import React from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const Tips = styled.div`
  background: orange;
  padding: 10px;
  margin: 30px 0;
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledNavLink = styled(NavLink)`
	margin-left: 15px;
	color: #1790ff;
	border-bottom: 1px solid #1790ff;
`

const Component = observer((props) => {
	const {UserStore} = useStores()
	
	return (
		<>
			{
				UserStore.currentUser ? null :
					<Tips>
						{props.children}
						<StyledNavLink to="/login">去登录</StyledNavLink>
					</Tips>
			}
		</>
	)
})

export default Component
