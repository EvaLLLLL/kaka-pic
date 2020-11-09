import React, {useRef} from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'


const Component = observer(() => {
	const {ImageStore} = useStores()
	const ref = useRef(null)
	
	const bindChange = () => {
		console.log(ref.current)
		if (ref.current.files.length > 0) {
			ImageStore.setFile(ref.current.files[0])
			ImageStore.setFilename(ref.current.files[0].name)
			ImageStore.upLoad()
				.then(() => {
					console.dir(ref.current.files[0])
					console.log('上传成功')
				})
				.catch(() => {
					console.error('上传失败')
				})
		}
	}
	
	return (
		<div>
			<h1>文件上传</h1>
			<input type="file"
			       onChange={bindChange}
			       ref={ref}/>
		</div>
	)
})

export default Component
