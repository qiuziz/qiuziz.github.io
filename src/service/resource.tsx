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
	// dailyWallpaper: fetchResource(`https://www.bing.com/HPImageArchive.aspx`),
	dailyWallpaper: fetchResource(`https://jsonp.afeld.me/?url=http%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1`),
	randomWallpaper: fetchResource(`https://jsonp.afeld.me/?url=http://pic.tsmp4.net/api/yingshi/img.php`),
};
