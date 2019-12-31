/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-07 15:36:30
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 17:57:10
 */

import React from 'react';
import './index.scss';

interface Props {
	className?: string;
	scale?: number
}

export const Loading = (props:Props) => {
	const { className = '', scale = 1 } = props;
	return (
		<div className={`loading__box ${className}`}>
			<div className="loading__box-lds" style={{transform: `translateZ(0) scale(${scale})`}}>
					<div /><div /><div />
			</div>
		</div>
	);
};
