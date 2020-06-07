/**
 * 管理当前所有的菜单
 */
import React from "react";
import MenuItem from './MenuItem';
import Moon from '../model/global/Moon';
import User from '../model/user/User';
import {UserRole} from '../model/user/UserRole';
import {
  AppstoreOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  SettingOutlined,
  ShareAltOutlined,
  TeamOutlined
} from '@ant-design/icons';
import {LoginOutlined} from "@ant-design/icons/lib";


export default class MenuManager {

  //单例模式
  private static singleton: MenuManager;

  constructor() {

  }

  static getSingleton(): MenuManager {
    if (!MenuManager.singleton) {
      //初始化一个mainLand.
      MenuManager.singleton = new MenuManager();

    }
    return MenuManager.singleton;
  }

  /**
   * 获取到当前高亮的菜单
   */
  getSelectedKeys(): string[] {

    let keys: string[] = this.getMenuItems()
      .filter((menuItem: MenuItem, index: number) => {
        return menuItem.active;
      }).map((menuItem: MenuItem, index: number) => {
        return menuItem.url;
      });

    return keys;
  }

  /**
   * 高亮某个菜单
   */
  selectMenu(url: string) {

    this.getMenuItems().forEach((menuItem: MenuItem, index: number) => {
      menuItem.active = menuItem.url === url;
    });

  }

  getMenuItems(): MenuItem[] {
    let user: User = Moon.getSingleton().user;

    let menuItems: MenuItem[] = [];

    if (user.role === UserRole.GUEST) {
      menuItems = [
        new MenuItem('登录', '/user/login', <LoginOutlined/>),
      ];
    } else {

      menuItems.push(new MenuItem('所有文件', '/matter/list', <AppstoreOutlined/>))
      menuItems.push(new MenuItem('我的分享', '/share/index', <ShareAltOutlined/>))

      if (user.role === UserRole.ADMINISTRATOR) {
        menuItems.push(new MenuItem('网站偏好', '/preference/index', <SettingOutlined/>))
        menuItems.push(new MenuItem('监控统计', '/dashboard/index', <DashboardOutlined/>))
        menuItems.push(new MenuItem('用户列表', '/user/list', <TeamOutlined/>))
      }
      menuItems.push(new MenuItem('退出登录', '/user/logout', <PoweroffOutlined/>))


    }

    return menuItems;

  }

}