/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2021-01-24 18:37:50
 * @Last Modified by: qiuz
 */

import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from 'pages/dashboard';

const BasicRoute = () => (
  <BrowserRouter basename={'/'}>
    <Switch>
      <Route path="*" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default BasicRoute;
