import React from 'react'
import Logo from './logo.svg'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.header`
	padding: 10px 100px;
	display: flex;
	align-items: center;
	background-color: #001528;
`
const LogoUrl = styled.img`
	height: 30px;
`
const StyledLink = styled(NavLink)`
	color: #fff;
	margin-left: 30px;
	&.active {
		border-bottom: 1px solid #ccc;
	}
`
const Login = styled.div`
	display: inline-block;
	margin-left: 200px;
`
const Button = styled.button`
	margin-left: 10px;
`

function Component() {
	return (
		<Header>
			<LogoUrl src={Logo} alt="logo"/>
			<nav>
				<StyledLink to="/" activeClassName="active" exact>首页</StyledLink>
				<StyledLink to="/history" activeClassName="active">历史</StyledLink>
				<StyledLink to="/about" activeClassName="active">关于我</StyledLink>
				<Login>
					<Button>
						<StyledLink to="/login">登录</StyledLink>
					</Button>
					<Button>
						<StyledLink to="/register">注册</StyledLink>
					</Button>
				</Login>
			</nav>
		</Header>
	)
}

export default Component
