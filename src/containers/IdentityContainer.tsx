import * as React from 'react';

import { esriPromise } from 'react-arcgis';

import { Identity } from '../components/Identity';

export interface IdentityManagerEvent {
  credential: __esri.Credential;
}
interface IdentityComponentProps {
  credential?: __esri.Credential;
  portalUrl: string;
  appId: string;
  handleLoginChange: (credential?: __esri.Credential) => void;
}
interface IdentityComponentState {}

export class IdentityContainer extends React.Component<IdentityComponentProps, IdentityComponentState> {
  IdentityManager: __esri.IdentityManager;

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
      this.IdentityManager = IdentityManager;

      IdentityManager.on('credential-create', (e: IdentityManagerEvent) => this.props.handleLoginChange(e.credential));
      IdentityManager.on('credentials-destroy', () => this.props.handleLoginChange());

      const info = new OAuthInfo({
        appId: this.props.appId,
        popup: false
      });
      IdentityManager.registerOAuthInfos([info]);
      IdentityManager.checkSignInStatus(this.props.portalUrl);
    });
  }

  handleLogout() {
    if (this.IdentityManager) {
      this.IdentityManager.destroyCredentials();
    }
  }

  handleLogin() {
    if (this.IdentityManager) {
      this.IdentityManager.getCredential(this.props.portalUrl);
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