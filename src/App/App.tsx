import React from 'react';
import styles from './App.module.scss';
import { Spinner } from './Spinner';
import { AppHeader } from './AppHeader';
import { AppMain } from './AppMain';

export const App: React.FC = () => {
  return (
    <>
      <Spinner />
      <div className={styles.wrap}>
        <AppHeader />
        <AppMain />
      </div>
    </>
  );
};
