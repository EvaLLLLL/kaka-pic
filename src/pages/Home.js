import React from "react";
import { observer } from "mobx-react";
import Uploader from "../components/Uploader";
import Tips from "../components/Tips";

const Home = observer(() => {
	return (
		<>
			<h1>上传图片</h1>
			<Tips>请先登录再上传!!!</Tips>
			<Uploader />
		</>
	);
});

export default Home;
