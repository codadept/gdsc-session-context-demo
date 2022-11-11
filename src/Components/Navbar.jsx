import { useContext } from "react";
import AuthContext from "../global/auth/auth-context";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const onLogout = () => {
    authCtx.logout();
  };
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "0 5vh",
      }}
    >
      <h1>Kickstart to ReactJS</h1>
      {authCtx.user?.id && <h3>{authCtx.user.username}</h3>}
      {authCtx.user?.id && <button onClick={onLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
