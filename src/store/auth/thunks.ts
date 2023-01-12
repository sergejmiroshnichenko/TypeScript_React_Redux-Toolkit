import { createAsyncThunk } from '@reduxjs/toolkit';
import { SLICE_NAME } from './types';
import { api } from '../../api';
import { getRoutePath } from '../../router';
import { appSlice } from '../app';
import { AxiosError } from 'axios';
import { actions } from './slice';

interface LoginThunkPayload {
  username: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async ({ password, username }: LoginThunkPayload, { dispatch }) => {
    const userData = await api.emails.fetchUserData(username, password);
    dispatch(actions.setIsAuth(true));
    dispatch(actions.setUserData(userData));
    const mainPagePath = getRoutePath('main');
    dispatch(appSlice.actions.redirect(mainPagePath));

    return null;
  },
);

interface RegistrationThunkPayload {
  username: string;
  email: string;
  password: string;
  successCb: () => void;
}

export const registrationThunk = createAsyncThunk(
  `${SLICE_NAME}/registrationThunk`,
  async (
    { password, username, email, successCb }: RegistrationThunkPayload,
    { rejectWithValue },
  ) => {
    try {
      const response = await api.emails.createUser(username, email, password);
      successCb();
      console.log(response);
      return null;
    } catch (e) {
      const errorResponse = (e as AxiosError)?.response?.data;

      const error = errorResponse ? JSON.stringify(errorResponse) : e;

      return rejectWithValue(error);
    }
  },
);
