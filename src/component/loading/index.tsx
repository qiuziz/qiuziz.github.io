/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-07 15:36:30
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 13:58:03
 */

import React from 'react';
import './index.scss';
import LOADING from './loading.svg';

export const Loading = () => {
	return (
		<div className="loading__box_svg">
			<img src={LOADING} alt=""/>
		</div>
		// <div className="loading__box">
		// 	<div className="loading__box-lds">
		// 			<div /><div /><div />
		// 	</div>
		// </div>
	);
};
