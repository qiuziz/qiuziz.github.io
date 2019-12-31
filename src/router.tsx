/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-11-07 16:03:31
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-12-31 15:36:08
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import {
	Home
} from './container';
import { Article } from './container/article';

export const routes = [
  {
    path: '/',
    Component: Home,
    exact: true,
		title: '首页',
		noNav: true
  },
  {
    path: '/article',
    Component: Article,
    exact: true,
		title: '',
		noNav: true
  },
];

const App = () => {
  return (
    <Switch>
      {
        routes.map(({ path, Component, exact }: any, index) => {
					return (
						<Route
							key={index}
							path={path}
							exact={exact}
							render={
								props => <Component {...props} History={History} />
							}
            />
          )
        })
      }
      <Redirect to={''} />
    </Switch>
  )
}

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends React.Component {

  render() {
    return (
      <Router>
        <App />
      </Router>
    )
  }
}