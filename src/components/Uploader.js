import React, {useRef} from 'react'
import {useStores} from '../stores'
import {observer, useLocalStore} from 'mobx-react'
import {Upload, message, Spin} from 'antd'
import {InboxOutlined} from '@ant-design/icons'
import styled from 'styled-components'

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`

const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`

const Img = styled.img`
  max-width: 300px;
`

const Component = observer(() => {
	const {ImageStore, UserStore} = useStores()
	const {Dragger} = Upload
	const refWidth = useRef()
	const refHeight = useRef()
	
	const store = useLocalStore(() => ({
		width: null,
		setWidth(width) {
			store.width = width
		},
		get widthStr() {
			return store.width ? `/w/${store.width}` : ''
		},
		height: null,
		setHeight(height) {
			store.height = height
		},
		get heightStr() {
			return store.height ? `/h/${store.height}` : ''
		},
		get fullStr() {
			return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
		}
	}))
	
	const bindWidthChange = () => {
		store.setWidth(refWidth.current.value)
	}
	
	const bindHeightChange = () => {
		store.setHeight(refHeight.current.value)
	}
	
	const props = {
		showUploadList: false,
		beforeUpload: (file) => {
			ImageStore.setFile(file)
			ImageStore.setFilename(file.name)
			if (UserStore.currentUser === null) {
				message.warning('请先登录再上传！')
				return false
			}
			if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
				message.error('只能上传 png/svg/jpg/jpeg/gif格式的图片！')
				return false
			}
			if (file.size > 1024 * 1024) {
				message.error('只能上传小于1M的文件！')
				return false
			}
			ImageStore.upLoad()
				.then((serverFile) => {
					console.dir(serverFile)
					console.log('上传成功')
				})
				.catch(() => {
					console.error('上传失败')
				})
			return false
		},
	}
	
	return (
		<Spin tip="上传中" spinning={ImageStore.isUploading}>
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined/>
				</p>
				<p className="ant-upload-text">点击选择/拖拽文件至此处进行上传</p>
				<p className="ant-upload-hint">
					仅支持png/svg/jpg/jpeg/gif格式，文件大小≤1M
				</p>
			</Dragger>
			{ImageStore.serverFile ? (
				<Result>
					<H1>上传结果</H1>
					<dl>
						<dt>线上地址</dt>
						<dd><a href={ImageStore.serverFile.attributes.url.attributes.url}
						       rel="noreferrer"
						       target="_blank">{ImageStore.serverFile.attributes.url.attributes.url}</a></dd>
						<dt>文件名</dt>
						<dd>{ImageStore.filename}</dd>
						<dt>图片预览</dt>
						<dd><Img src={ImageStore.serverFile.attributes.url.attributes.url}/></dd>
						<dt>尺寸定制</dt>
						<dd>更多尺寸</dd>
						<dt>
							<input placeholder="最大宽度（可选）" ref={refWidth} onChange={bindWidthChange}/>
							<input placeholder="最大高度（可选）" ref={refHeight} onChange={bindHeightChange}/>
						</dt>
						<dd>
							<a href={store.fullStr}>{store.fullStr}</a>
						</dd>
					</dl>
				</Result>
			) : null}
		</Spin>
	)
})

export default Component
