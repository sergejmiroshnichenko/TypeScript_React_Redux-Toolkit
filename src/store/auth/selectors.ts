import { RootState } from '../types';

export const getIsAuth = (state: RootState): boolean => state.auth.isAuth;

export const getIsLoginRequest = (state: RootState) => state.auth.loginRequest;

export const getIsLoading = (state: RootState) =>
  state.auth.loginRequest.isLoading || state.auth.registrationRequest.isLoading;

export const getUserData = (state: RootState) => state.auth.userData;

export const getRegistrationRequest = (state: RootState) =>
  state.auth.registrationRequest;
