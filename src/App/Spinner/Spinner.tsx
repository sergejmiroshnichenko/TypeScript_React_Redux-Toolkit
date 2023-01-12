import React, { FC } from 'react';
import { useAppSelector } from '../../store/hooks';
import { authSlice } from '../../store/auth';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  const authIsLoading = useAppSelector(authSlice.selectors.getIsLoading);

  const isLoading = authIsLoading;

  return isLoading ? (
      <div className={styles.Spinner} />
  ) : null;
};
