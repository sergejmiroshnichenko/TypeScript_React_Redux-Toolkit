import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { authSlice } from '../../store/auth';
import { Button } from '../../components/Button';
import styles from './AppHeader.module.scss';

export const AppHeader: FC = () => {
  const userData = useAppSelector(authSlice.selectors.getUserData);
  const isAuth = useAppSelector(authSlice.selectors.getIsAuth);

  const dispatch = useAppDispatch();

  const handleLogoutBtnClk = () => {
    if (confirm('Выйти?')) {
      dispatch(authSlice.actions.logout());
    }
  };

  return (
    <header className={styles.wrap}>
      {isAuth && userData && (
        <div>
          <div className={styles.text}>имя: {userData.username} </div>
          <div className={styles.text}>почта: {userData.email} </div>
        </div>
      )}

      {isAuth && (
        <div>
          <Button className={styles.logoutBtn} onClick={handleLogoutBtnClk}>
            Выйти
          </Button>
        </div>
      )}
    </header>
  );
};
