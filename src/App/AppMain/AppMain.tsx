import React, { FC } from 'react';
import { Router } from '../../router';
import styles from './AppMain.module.scss';

export const AppMain: FC = () => {
  return (
    <main className={styles.wrap}>
      <Router />
    </main>
  );
};
