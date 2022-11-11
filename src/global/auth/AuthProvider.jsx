import { useReducer } from "react";
import AuthContext from "./auth-context";

import * as AuthActions from "./auth-actions";

const AUTH_STATE = {
  user: {
    id: null,
    name: "",
    username: "",
    email: "",
    phone: "",
  },
  isUserFetching: false,
  isLoggedIn: false,
  error: "",
};

const authReducer = (state, action) => {
  if (action.type === AuthActions.LOGIN) {
    return {
      ...state,
      user: {
        ...action.payload,
      },
      isLoggedIn: true,
      isUserFetching: false,
      error: "",
    };
  }

  if (action.type === AuthActions.LOGOUT) {
    return {
      ...state,
      user: null,
      isLoggedIn: false,
      isUserFetching: false,
    };
  }

  if (action.type === AuthActions.FETCHING) {
    return {
      ...state,
      isUserFetching: true,
    };
  }

  if (action.type === AuthActions.ERROR) {
    return {
      ...state,
      error: action.payload,
      isUserFetching: false,
    };
  }

  return AUTH_STATE;
};

const AuthProvider = ({ children }) => {
  const [authState, dispatchAuthState] = useReducer(authReducer, AUTH_STATE);

  const handleLogin = (user) => {
    dispatchAuthState({ type: AuthActions.LOGIN, payload: user });
  };

  const handleLogout = () => {
    dispatchAuthState({ type: AuthActions.LOGOUT });
  };

  const handleSetError = (err) => {
    dispatchAuthState({ type: AuthActions.ERROR, payload: err });
  };

  const handleUserFetching = () => {
    dispatchAuthState({ type: AuthActions.FETCHING });
  };

  const authContext = {
    user: authState.user,
    isLoggedIn: authState.isLoggedIn,
    isUserFetching: authState.isUserFetching,
    error: authState.error,
    login: handleLogin,
    logout: handleLogout,
    setError: handleSetError,
    handleFetching: handleUserFetching,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
