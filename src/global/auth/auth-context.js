import { createContext } from "react";

const AuthContext = createContext({
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
  login: (user) => {},
  logout: () => {},
  setError: (err) => {},
  handleFetching: () => {},
});

export default AuthContext;
