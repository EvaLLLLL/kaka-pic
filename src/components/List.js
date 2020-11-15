import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import {List, Spin, Card} from 'antd'
import styled from 'styled-components'
import Tips from '../components/Tips'
import ClipboardJS from 'clipboard'

const {Meta} = Card
new ClipboardJS('.btn')
const Button = styled.button`
	background: none;
	margin: 5px;
	padding: 0;
	font-size: 14px;
	border: none;
	cursor: pointer;
`
const Link = styled.a`
	font-size: 14px;
	margin: 5px;
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
							<Card style={{ width: 150 }}
								cover={
								<img src={item.attributes.url.attributes.url}
								     alt={item.attributes.filename}/>}
							            actions={[
								            <Button className="btn"
								                    data-clipboard-text={item.attributes.url.attributes.url}>复制链接</Button>,
								            <Link href={item.attributes.url.attributes.url} target="_blank">点击查看</Link>
							            ]}>
								<Meta title={item.attributes.filename}/>
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
