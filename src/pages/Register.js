import React from 'react'
import styled from 'styled-components'
import {Form, Input, Button} from 'antd'
import {useStores} from '../stores'
import {useHistory} from 'react-router-dom'

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  border: 2px solid #eee;
  border-radius: 20px;
`
const Title = styled.h1`
	padding: 10px;
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px dashed #eee;
`
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 12,
	},
}
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 12,
	},
}

const Component = () => {
	const {AuthStore} = useStores()
	const history = useHistory()
	
	const onFinish = (values) => {
		AuthStore.setUsername(values.username)
		AuthStore.setPassword(values.password)
		AuthStore.register()
			.then(() => {
				alert('注册成功')
				history.push('/')
			})
			.catch(() => {
				console.log('注册失败')
			})
	}
	
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	
	const validateUsername = (rule, value) => {
		console.log(rule, value)
		if (/\W/.test(value))
			return Promise.reject('不能出现字母数字下划线以外的字符')
		if (value.length < 3) return Promise.reject('用户名字符长度不能小于 3')
		if (value.length > 10) return Promise.reject('用户名字符长度不能大于 10')
		return Promise.resolve()
	}
	
	const validateConfirm = ({getFieldValue}) => ({
		validator(rule, value) {
			if (getFieldValue('password') === value) return Promise.resolve()
			return Promise.reject('两次密码不一致')
		},
	})
	
	return (
		<Wrapper>
			<Title>注册</Title>
			<Form
				{...layout}
				name="basic"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="用户名"
					name="username"
					rules={[
						{
							required: true,
							message: '请输入用户名',
						},
						{
							validator: validateUsername,
						},
					]}
				>
					<Input/>
				</Form.Item>
				
				<Form.Item
					label="密码"
					name="password"
					rules={[
						{
							required: true,
							message: '请输入密码',
						},
						{
							min: 4,
							message: '至少需要 4 个字符',
						},
						{
							max: 10,
							message: '最长 10 个字符',
						},
					]}
				>
					<Input.Password/>
				</Form.Item>
				
				<Form.Item
					label="确认密码"
					name="confirmPassword"
					rules={[
						{
							required: true,
							message: '请输入密码',
						},
						validateConfirm,
					]}
				>
					<Input.Password/>
				</Form.Item>
				
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						注册
					</Button>
				</Form.Item>
			</Form>
		</Wrapper>
	)
}

export default Component
