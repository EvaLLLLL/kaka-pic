import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import InfiniteScroll from 'react-infinite-scroller'
import {List, Spin} from 'antd'
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
	
	const loadMore = () => {
		HistoryStore.find()
	}
	
	useEffect(() => {
		return () => {
			HistoryStore.reset()
		}
	}, [HistoryStore])
	
	return (
		<div>
			{UserStore.currentUser ?
				<InfiniteScroll initialLoad={true}
				                pageStart={0}
				                hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
				                loadMore={loadMore}
				                useWindow={true}>
					<List dataSource={HistoryStore.list}
					      renderItem={item => <List.Item key={item.objectId}>
						      <div>
							      <Img src={item.attributes.url.attributes.url}/>
						      </div>
						      <div>
							      <h5>{item.attributes.filename}</h5>
						      </div>
						      <div>
							      <a href={item.attributes.url.attributes.url}
							         rel="noreferrer"
							         target="_blank">{item.attributes.url.attributes.url}</a>
						      </div>
					      </List.Item>}>
						{HistoryStore.isLoading && HistoryStore.hasMore && (
							<div>
								<Spin tip="加载中"/>
							</div>
						)}
					</List>
				</InfiniteScroll> : <Tips>登录后可查看上传历史!!!</Tips>}
		</div>
	)
})

export default Component
