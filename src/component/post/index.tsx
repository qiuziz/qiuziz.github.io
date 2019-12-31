/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-10-31 20:39:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 09:39:15
 */

import React from 'react';
import './index.scss';
import Markdown from 'react-markdown';
import { dateFormat } from '../../common/utils';

interface PropsType {
	data: any[];
}

export const Post = (props: PropsType) => {
	const { data } = props;
	return (
		<div className="post-container">
			{
				data.map((post: any) => {
					return (
						<div key={post.id} className="post__content">
							<h2 className="title">{post.title}</h2>
							<Markdown className="intro" source={post.body.slice(0, 100)} />
							<p className="publish-time">{dateFormat(new Date(post.updated_at))}</p>
						</div>
					)
				})
			}
		</div>
	);
}

