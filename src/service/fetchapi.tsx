/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-11-02 14:38:52
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 11:34:28
 */

import 'whatwg-fetch';

interface ConfigType {
	loadingDelay?: number;
	des?: boolean;
	[propName: string]: any;
}

const fetchMethod = async (_url: string, _config: any) => {
	try {
		const response = await fetch(_url, _config);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		let result: any = {};
		try {
			result = await response.json();
		} catch (error) {
			result = {};
		}
		return result;
	}
	catch (err) {
		throw err;
	}
};

const matchUrlSearchParams = (url: string, urlSearchParams: any) => {
	if (!urlSearchParams) {
		return url.replace(/\/:[^?]+/g, '');
	}
	const u = new URLSearchParams();
	// tslint:disable-next-line:variable-name
	let _url = Object.keys(urlSearchParams).reduce((pre, next) => {
		if (pre.includes(':' + next)) {
			return pre.replace(':' + next, urlSearchParams[next]);
		} else {
			if (urlSearchParams[next] && urlSearchParams[next].constructor === Array) {
				urlSearchParams[next].forEach((value: any) => {
					u.append(next, value);
				});
			} else {
				u.append(next, urlSearchParams[next]);
			}
			return pre;
		}
	}, url);
	_url = _url.replace(/\/:[^?]+/g, '');
	return _url + (u.toString() === '' ? '' : '?' + u);
};

class FetchApi {

	headers: any = {};
	url = '';
	// tslint:disable-next-line:variable-name
	constructor(_url: string) {
		this.url = _url;
		this.headers['Content-Type'] = 'application/json;charset=UTF-8';
	}

	get = (urlSearchParams: object, config?: ConfigType) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams), config);
	}

	post = (urlSearchParams?: object, bodyParams?: any, config?: ConfigType) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{ ...config,
				 method: 'POST',
				 body: JSON.stringify(bodyParams)}
		);
	}

	upload = (urlSearchParams: object, bodyParams: FormData) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{
				method: 'POST',
				body: bodyParams
			}
		);
	}

	delete = (urlSearchParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{...config,
				method: 'DELETE'}
		);
	}

	put = (urlSearchParams: object, bodyParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{ ...config, headers: this.headers,
				 method: 'PUT',
				 body: JSON.stringify(bodyParams)}
		);
	}

	patch = (urlSearchParams: object, bodyParams: object, config = { headers: this.headers }) => {
		return fetchMethod(matchUrlSearchParams(this.url, urlSearchParams),
			{...config,
				method: 'PATCH',
				body: JSON.stringify(bodyParams)}
		);
	}
}

const fetchResource = (url: string) => {
	return new FetchApi(url);
};

export { fetchResource };
