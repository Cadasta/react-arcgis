import * as React from 'react';

interface IdentityProps {
  credential?: __esri.Credential;
  handleLogin: () => void;
  handleLogout: () => void;
  loading: boolean;
}

export const Identity = (props: IdentityProps) => {
  if (props.credential) {
    return <span>Logged in as {props.credential.userId} <button onClick={props.handleLogout}>Logout</button></span>;
  } else {
    return <button onClick={props.handleLogin} disabled={props.loading}>Login</button>;
  }
};