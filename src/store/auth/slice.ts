import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SLICE_NAME } from './types';
import { RequestSliceStateProperty } from '../types';
import {
  makeRequestCaseToBuilder,
  makeRequestSliceStateProperty,
} from '../helpers';
import { UserData } from '../../entitiesTypes/userData';
import * as thunks from './thunks';

interface InitialState {
  isAuth: boolean;
  userData: UserData | null;
  loginRequest: RequestSliceStateProperty<unknown>;
  registrationRequest: RequestSliceStateProperty<unknown>;
}

export const initialState: InitialState = {
  isAuth: false,
  userData: null,
  loginRequest: makeRequestSliceStateProperty<unknown>(),
  registrationRequest: makeRequestSliceStateProperty<unknown>(),
};

export const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.userData = null;
    },
    UnmountLoginPage: (state) => {
      state.loginRequest.error = null;
      state.loginRequest.data = null;
    },
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.loginThunk,
      'loginRequest',
    );

    makeRequestCaseToBuilder<InitialState>(
      builder,
      thunks.registrationThunk,
      'registrationRequest',
    );
  },
});
