/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-10-31 20:39:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 13:57:56
 */

import React, { useState, useEffect } from 'react';
import './index.scss';
import { Resource } from '../../service/resource';
import { Post } from '../../component';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../../component/loading';

interface PropsType {
	History: any;
	location: any;
	history: any;
}

export const Home = (props: PropsType) => {
	const [postList, setPostList] = useState<any[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const getPosts = (page = 1) => {
		console.log(page);
		if (!hasMore) return;
		Resource.issues.get({ per_page: '5', page, access_token: 'a17e7a411ecac60faf4c6b41a185fcb04a159b99' })
			.then((res: any) => {
				console.log(res);
				setPostList([...postList, ...res]);
				setHasMore(res.length >= 5);
			});
	}

	return (
		<div className="home">
			<InfiniteScroll
				pageStart={0}
				loadMore={getPosts}
				hasMore={hasMore}
				loader={<Loading key={0} />}
			>
				<Post data={postList} />
			</InfiniteScroll>
		</div>
	);
}

