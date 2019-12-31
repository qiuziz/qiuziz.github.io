/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-10-31 20:39:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 17:57:05
 */

import React, { useState } from 'react';
import './index.scss';
import { Resource } from '../../service/resource';
import { Post } from '../../component';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../../component/loading';

export const Home = () => {
	const [postList, setPostList] = useState<any[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const getPosts = (page = 1) => {
		console.log(page);
		if (!hasMore) return;
		Resource.issues.get({ per_page: '5', page })
			.then((res: any) => {
				console.log(res);
				setPostList([...postList, ...res]);
				setHasMore(res.length >= 5);
			});
	}
	const style = postList.length <= 0
	? {
			className: 'fixed'
		}
	: {
			scale: 0.2
		};
	return (
		<div className="home">
			<InfiniteScroll
				pageStart={0}
				loadMore={getPosts}
				hasMore={hasMore}
				loader={<Loading key={0} {...style} />}
			>
				<Post data={postList} />
			</InfiniteScroll>
		</div>
	);
}

