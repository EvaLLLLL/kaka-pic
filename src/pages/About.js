import React from 'react'
import {List, Avatar} from 'antd'

const Component = () => {
	const data = [
		{
			title: '项目源码',
			description: '本项目源码，欢迎提Issues',
			url: 'https://github.com/EvaLLLLL/kaka-pic',
			icon: 'http://lc-gldaowsf.cn-n1.lcfile.com/f1a6d7c3767165a3ca41.png'
		},
		{
			title: 'GitHub',
			description: '我的GitHub，欢迎交流',
			url: 'https://github.com/',
			icon: 'http://lc-gldaowsf.cn-n1.lcfile.com/85c5d0226bd9e8ef1134.png'
		},
		{
			title: '技术博客',
			description: '我的技术博客，欢迎交流',
			url:'https://www.yuque.com/lyhlyhlyh/learnweb',
			icon: 'http://lc-glDaOWsf.cn-n1.lcfile.com/8293904b0a738be606a7.png'
		},
		{
			title: '我的邮件',
			description: '17610603221@163.com',
			url: 'email:17610603221@163.com',
			icon: 'http://lc-glDaOWsf.cn-n1.lcfile.com/ca869b6fb1164e32f496.png'
		},
		{
			title: '直接微信',
			description: '_lyhlyh_',
			url:'',
			icon: 'http://lc-glDaOWsf.cn-n1.lcfile.com/f6877807441d17cc8603.png'
		}
	];
	
	return (
		<>
			<h1>关于我</h1>
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={item.icon} />}
							title={<a href={item.url}>{item.title}</a>}
							description={item.description}
						/>
					</List.Item>
				)}
			/>
		</>
	)
}

export default Component
