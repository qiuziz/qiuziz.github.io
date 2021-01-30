/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date:  2021-01-24 18:40:37
 * @Last Modified by: qiuz
 */

import { Button, Dropdown, Menu } from 'antd';
import { useViewport } from 'hooks';
import { MENU_LIST } from 'pages/dashboard/mock';
import React, { Component } from 'react';
import './index.less';
import { MenuOutlined } from '@ant-design/icons';

const HeaderBar = () => {
  const { width } = useViewport();

  return (
    <div className="header-bar">
      {width <= 600 ? (
        <Dropdown
          overlay={() => (
            <Menu>
              {MENU_LIST.map((menu: any) => {
                return (
                  <Menu.Item key={menu.key}>
                    <a href={menu.url}>{menu.title}</a>
                  </Menu.Item>
                );
              })}
            </Menu>
          )}
          placement="bottomRight"
        >
          <MenuOutlined className="menu-icon" />
        </Dropdown>
      ) : (
        <ul className="header-ul">
          {MENU_LIST.map((menu: any) => {
            return (
              <li key={menu.key}>
                <a href={menu.url}>{menu.title}</a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HeaderBar;
