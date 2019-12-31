/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-10-31 20:39:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 09:39:06
 */

import React, { useState, useEffect } from 'react';
import './index.scss';
import { Resource } from '../../service/resource';
import { Post } from '../../component';

interface PropsType {
	History: any;
	location: any;
	history: any;
}

export const Home = (props: PropsType) => {
	const [postList, setPostList] = useState([]);
	useEffect(() => {
		Resource.issues.get({per_page: '5', page: '1'})
		.then((res: any) => {
			console.log(res);
			setPostList(res);
		});
	}, [])
	
	return (
		<div className="home">
			<Post data={postList} />
		</div>
	);
}

