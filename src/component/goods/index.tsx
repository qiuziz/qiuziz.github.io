/*
 * @Author: qiuz
 * @Date: 2019-11-01 14:38:25
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-25 21:00:37
 */

import React from 'react';
import './index.scss';

interface PropsType {
	className?: string;
	img: string;
	map?: any[];
	onClick?: () => void;
	name: string;
	price: string
}

export const Goods = (props: PropsType) => {
	const { className = '', img = '', name = '', price= '', onClick = () => { } } = props;
	return (
		<div className={`goods__content ${className}`} onClick={onClick}>
			<div className="good-img-wrap">
				<img src={img} alt="" />
			</div>
			<p className="good-name">{name}</p>
			<p className="good-price rmb">{price}</p>
		</div>
	);
}
