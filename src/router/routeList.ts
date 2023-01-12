import { Page404 } from '../pages/Error404Page';
import { MainPage } from '../pages/MainPage';
import { FC } from 'react';
import { LoginPage } from '../pages/LoginPage';
import { UserRegPage } from '../pages/UserRegPage';

interface RouteItem {
  path: string;
  component: FC;
  isPrivate: boolean;
}

export const routeNameList = ['main', 'login', 'userReg', 'error404'] as const;

export type RouteNameList = typeof routeNameList[number];

export const routeList: Record<RouteNameList, RouteItem> = {
  main: {
    path: '/',
    component: MainPage,
    isPrivate: true,
  },

  login: { path: '/login', component: LoginPage, isPrivate: false },
  userReg: { path: '/registration', component: UserRegPage, isPrivate: false },

  error404: {
    path: '*',
    component: Page404,
    isPrivate: false,
  },
};
