/**
 * @summary user store mutations constants
 * @author Dominik Haas-Artho
 *
 * Created at     : 2020-07-14 16:38:28
 * Last modified  : 2020-08-20 10:57:24
 *
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 */

const useTestdata = process.env.VUE_APP_USE_TESTDATA === 'true';

export const GET_USER_CONTEXT = 'GET_USER_CONTEXT';
export const GET_USER_CONTEXT_ERROR = 'GET_USER_CONTEXT_ERROR';
export const GET_USER_CONTEXT_SUCCESS = 'GET_USER_CONTEXT_SUCCESS';
export const ACTION_GET_USER_CONTEXT = () => {
  if (process.env.NODE_ENV === 'development' && useTestdata) {
    return './testdata/envidat_context_user_show.json';
  }

  return 'envidat_context_user_show';
};

export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNIN_ERROR = 'USER_SIGNIN_ERROR';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const ACTION_USER_SIGNIN = () => {
  if (process.env.NODE_ENV === 'development' && useTestdata) {
    return './testdata/passwordless_user_login.json';
  }

  return 'passwordless_user_login';
};

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const ACTION_REQUEST_TOKEN = () => {
  if (process.env.NODE_ENV === 'development' && useTestdata) {
    return './testdata/passwordless_perform_reset.json';
  }

  return 'passwordless_perform_reset';
};

export const USER_SIGNOUT = 'USER_SIGNOUT';
export const USER_SIGNOUT_ERROR = 'USER_SIGNOUT_ERROR';
export const USER_SIGNOUT_SUCCESS = 'USER_SIGNOUT_SUCCESS';
export const ACTION_USER_SIGNOUT = () => {
  if (process.env.NODE_ENV === 'development' && useTestdata) {
    return './testdata/passwordless_user_logout.json';
  }

  return 'passwordless_user_logout';
};


export const VALIDATION_ERROR = 'Validation Error';
export const NOT_AUTHORIZED_ERROR = 'NotAuthorized';

export const FETCH_USER_DATA = 'FETCH_USER_DATA';
  
export const ACTION_USER_SHOW = () => {
  if (process.env.NODE_ENV === 'development' && useTestdata) {
    return './testdata/user_show.json';
  }

  return 'user_show';
};

export const USER_GET_DATASETS = 'USER_GET_DATASETS';
export const USER_GET_DATASETS_ERROR = 'USER_GET_DATASETS_ERROR';
export const USER_GET_DATASETS_SUCCESS = 'USER_GET_DATASETS_SUCCESS';


export const USER_NAMESPACE = 'user';
