import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../global/auth/auth-context";

const Login = () => {
  const [formData, setFormdata] = useState({
    id: "",
    username: "",
  });

  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setFormdata((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onFormSubmit = async () => {
    try {
      authCtx.handleFetching();
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${formData.id}`
      );

      if (!res.ok) {
        throw new Error("User with ID not found.");
      }

      const data = await res.json();

      if (data.username === formData.username) {
        authCtx.login(data);
        navigate("/", { replace: true });
      } else {
        throw new Error("Username and ID mismatch.");
      }
    } catch (err) {
      authCtx.setError(err.message);
    }
  };

  if (authCtx.isUserFetching) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <h1>Login Page</h1>
      <label htmlFor="id">ID</label>
      <br />
      <input type="text" id="id" value={formData.id} onChange={onInputChange} />
      <br />
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        id="username"
        value={formData.username}
        onChange={onInputChange}
      />
      <br />
      <button onClick={onFormSubmit}>Login</button>
    </section>
  );
};

export default Login;
