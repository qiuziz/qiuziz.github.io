/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-10-31 20:39:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-30 23:33:04
 */

import React, { useState, useEffect } from 'react';
import './index.scss';
import { Resource } from '../../service/resource';
import Markdown from 'react-markdown';

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
			{
				postList.map((post: any) => {
					return (
						<div key={post.id} className="post__content">
							<p className="title">{post.title}</p>
							<Markdown className="intro" source={post.body.slice(0, 100)} />
						</div>
					)
				})
			}
		</div>
	);
}

