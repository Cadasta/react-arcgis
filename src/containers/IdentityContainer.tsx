import * as React from 'react';

import { esriPromise } from 'react-arcgis';

import { Identity } from '../components/Identity';

interface IdentityComponentProps {
  credential?: __esri.Credential;
  portalUrl: string;
  handleLoginChange: (credential?: __esri.Credential) => void;
}
interface IdentityComponentState {}

export class IdentityContainer extends React.Component<IdentityComponentProps, IdentityComponentState> {
  identityManager: __esri.IdentityManager;

  constructor(props: IdentityComponentProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    esriPromise([
      'esri/identity/OAuthInfo',
      'esri/identity/IdentityManager'
    ]).then(([OAuthInfo, IdentityManager]) => {
      this.identityManager = IdentityManager;

      const info = new OAuthInfo({
          appId: 'y4Lx1l6456Mbf85z',
          popup: false
      });

      this.identityManager.registerOAuthInfos([info]);
      this.identityManager.checkSignInStatus(this.props.portalUrl).then(
        (credential: __esri.Credential) => {
          this.props.handleLoginChange(credential);
        }
      );
    });
  }

  handleLogout() {
    if (this.identityManager) {
      this.identityManager.destroyCredentials();
      this.props.handleLoginChange();
    }
  }

  handleLogin() {
    if (this.identityManager) {
      this.identityManager.getCredential(this.props.portalUrl);
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