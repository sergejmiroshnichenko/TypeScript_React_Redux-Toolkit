import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { authSlice } from '../store/auth';
import { routeList, routeNameList } from './routeList';
import { getRoutePath } from './helpers';
import { RedirectExecutor } from './RedirectExecutor';

export const Router: FC = () => {
  const isAuth = useAppSelector(authSlice.selectors.getIsAuth);

  return (
    <>
      <Routes>
        {routeNameList.map((routeName) => {
          const route = routeList[routeName];
          let currentComponent = <route.component />;
          //если для роута установлено значение приватный и мы не в системе,
          // то переходим на страницу логина
          if (!isAuth && route.isPrivate) {
            currentComponent = <Navigate to={getRoutePath('login')} />;
          }

          // если мы в системе и зачем-то перешли на страницу логина,
          // то переходим на главную страницу проекта

          if (isAuth && route.path === getRoutePath('login')) {
            currentComponent = <Navigate to={getRoutePath('main')} />;
          }

          return (
            <Route
              path={route.path}
              key={routeName}
              element={currentComponent}
            />
          );
        })}
      </Routes>
      <RedirectExecutor />
    </>
  );
};
