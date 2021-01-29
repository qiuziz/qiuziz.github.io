/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2021-01-24 18:40:37
 * @Last Modified by: qiuz
 */

import { MENU_LIST } from 'pages/dashboard/mock';
import React, { Component } from 'react';
import './index.less';

export default class HeaderBar extends Component<any, any> {

  render() {
    return (
      <div className="header-bar">
        <ul className="header-ul">
          {MENU_LIST.map((menu: any) => {
            return <li key={menu.key}><a href={menu.url}>{menu.title}</a></li>;
          })}
        </ul>
      </div>
    );
  }
}
