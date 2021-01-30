/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2021-01-24 18:37:50
 * @Last Modified by: qiuz
 */

import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import { ViewportProvider } from 'hooks';

const BasicRoute = () => (
  <ViewportProvider>
    <BrowserRouter basename={'/'}>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/q/blog/" />)} />
        <Route path="*" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </ViewportProvider>
);

export default BasicRoute;
