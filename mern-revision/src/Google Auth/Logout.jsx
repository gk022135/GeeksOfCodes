import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import { AppContext } from "../ContextApi/FisrtContext";

const LogoutButton = () => {
  const { logout, user } = useAuth0();


  
  // Storing user data in localStorage after stringifying
  if (user) {
    localStorage.setItem("userGdata", JSON.stringify(user));
  }

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;