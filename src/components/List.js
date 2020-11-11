import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import {List, Spin, Card} from 'antd'
import styled from 'styled-components'
import Tips from '../components/Tips'

const Img = styled.img`
	width: 100px;
	height: 100px;
	object-fit: contain;
	border: 1px solid #eee;
`

const Component = observer(() => {
	const {HistoryStore, UserStore} = useStores()
	
	useEffect(() => {
		HistoryStore.find()
		return () => {
			HistoryStore.reset()
		}
	}, [])
	
	return (
		<div>
			{UserStore.currentUser ?
				<List
					grid={{
						gutter: 16,
						xs: 1,
						sm: 2,
						md: 4,
						lg: 4,
						xl: 6,
						xxl: 3,
					}}
					pagination={{
						pageSize: 12,
					}}
					dataSource={HistoryStore.list}
					renderItem={
						item => <List.Item key={item.objectId}>
							<Card title={item.attributes.filename}>
								<div>
									<Img src={item.attributes.url.attributes.url}/>
								</div>
								<div>
									<a target="_blank"
									   href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
								</div>
							</Card>
						</List.Item>
					}
				>
					{HistoryStore.isLoading && HistoryStore.hasMore && (
						<div>
							<Spin tip="加载中"/>
						</div>
					)}
				</List> : <Tips>登录后可查看上传历史!!!</Tips>}
		</div>
	)
})

export default Component
