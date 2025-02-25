import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect } from "react";
import { AppContext } from "../ContextApi/FisrtContext";

const LoginButton = () => {
  const { loading, setLoading, SendDataSignLogin } = useContext(AppContext);
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In with Google</button>;
};

export default LoginButton;
