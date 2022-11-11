import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../global/auth/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);
  return (
    <section>
      <h1>Home Page</h1>
      {!authCtx.user?.id && <Link to="/login">Login</Link>}
    </section>
  );
};

export default Home;
