import {observable, action} from 'mobx'
import {Auth} from '../models'
import UserStore from './user'
import {message} from 'antd'
import HistoryStore from './history'
import ImageStore from './image'

class AuthStore {
	@observable values = {
		username: '',
		password: '',
	}
	
	@action setUsername(username) {
		this.values.username = username
	}
	
	@action setPassword(password) {
		this.values.password = password
	}
	
	@action login() {
		return new Promise((resolve, reject) => {
			Auth.login(this.values.username, this.values.password)
				.then((user) => {
					this.setLocalUser(this.values.username, this.values.password)
					UserStore.pullUser()
					resolve(user)
				})
				.catch((error) => {
					message.error('登录失败，请稍后再试')
					reject(error)
				})
		})
	}
	
	@action register() {
		return new Promise((resolve, reject) => {
			Auth.register(this.values.username, this.values.password)
				.then((user) => {
					UserStore.pullUser()
					resolve(user)
				})
				.catch((error) => {
					UserStore.resetUser()
					message.error('注册失败')
					reject(error)
				})
		})
	}
	
	@action logout() {
		Auth.logout()
		UserStore.resetUser()
		HistoryStore.reset()
		ImageStore.reset()
	}
	
	@action setLocalUser(username, password) {
		window.localStorage.setItem('username', username)
		window.localStorage.setItem('password', password)
	}
	
	@action getLocalUser() {
		this.values.username = window.localStorage.getItem('username')
		this.values.password = window.localStorage.getItem('password')
	}
}

export default new AuthStore()
