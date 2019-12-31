/*
 * @Author: qiuz
 * @Date: 2018-05-24 19:24:46
 * */

import { fetchResource } from './fetchapi';
const API_HOST = 'https://api.github.com';
const SERVICE_NAME = '/repos/qiuziz/qiuziz.github.io';

export const Resource = {
	/**
	 * 获取token
	 */
	issues: fetchResource(`${API_HOST}${SERVICE_NAME}/issues/:number`),
};
