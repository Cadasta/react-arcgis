import * as React from 'react';

import { Identity } from '../components/Identity';

interface IdentityComponentProps {
  identityManager?: __esri.IdentityManager;
  credential?: __esri.Credential;
  portalUrl: string;
}
interface IdentityComponentState {}

export class IdentityContainer extends React.Component<IdentityComponentProps, IdentityComponentState> {
  constructor(props: IdentityComponentProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout () {
    if (this.props.identityManager) {
      this.props.identityManager.destroyCredentials();
      window.location.reload();
    }
  }

  handleLogin() {
    if (this.props.identityManager) {
      this.props.identityManager.getCredential(this.props.portalUrl);
    }
  }

  render() {
    return (
      <Identity
        credential={this.props.credential}
        handleLogout={this.handleLogout}
        handleLogin={this.handleLogin}
      />
    );
  }
}