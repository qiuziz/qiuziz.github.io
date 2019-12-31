/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-10-31 20:39:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 14:39:38
 */

import React, { useState, useEffect } from 'react';
import './index.scss';
import { Resource } from '../../service/resource';
import { Post } from '../../component';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../../component/loading';
import { getUrlParams, dateFormat } from '../../common/utils';
import Markdown from 'react-markdown';

interface PropsType {
	History: any;
	location: any;
	history: any;
}

export const Article = (props: PropsType) => {
	const { number } = getUrlParams();
	const [ data, setData] = useState({} as any);
	const getArticle = () => {
		Resource.issues.get({ number })
			.then((res: any) => {
				console.log(res);
				document.title = res.title;
				setData(res);
			});
	}
	useEffect(() => {
		getArticle();
	}, [])
	return (
		<div className="article">
			<h2>{data.title}</h2>
			<p className="publish-time">{data.updated_at && dateFormat(new Date(data.updated_at))} by <a href="https://github.com/qiuziz" target="_blank">qiuz</a></p>
			<Markdown source={data.body} />
		</div>
	);
}

