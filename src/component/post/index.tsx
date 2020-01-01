/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-10-31 20:39:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2020-01-01 13:12:39
 */

import React from 'react';
import './index.scss';
import { dateFormat } from '../../common/utils';

interface PropsType {
	data: any[];
	onClick?: (...args: any) => void;
}

export const Post = (props: PropsType) => {
	const { data, onClick = () => {} } = props;

	const onPostClick = (data: any) => () => {
		onClick(data);
	};

	return (
		<div className="post-container">
			{
				data.map((post: any) => {
					return (
						<div key={post.id} className="post__content" onClick={onPostClick(post)}>
							<h2 className="title"><a href={`/article?number=${post.number}`}>{post.title}</a></h2>
							<p className="publish-time">{dateFormat(new Date(post.updated_at))} by <a href="https://github.com/qiuziz">qiuz</a></p>
							<p className="intro"><a href={`/article?number=${post.number}`}>{post.body.slice(0, 200)}...</a></p>
						</div>
					)
				})
			}
		</div>
	);
}

