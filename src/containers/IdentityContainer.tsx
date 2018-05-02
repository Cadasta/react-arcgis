import * as React from 'react';
import { esriPromise } from 'react-arcgis';

import { Identity } from '../components/Identity';

interface IdentityComponentProps {
  portalUrl: string;
  credential?: __esri.Credential;
  handleLogin: (credential: __esri.Credential) => void;
  handleLogout: () => void;
}
interface IdentityComponentState {
  loading: boolean;
}

export class IdentityContainer extends React.Component<IdentityComponentProps, IdentityComponentState> {
  IdentityManager: __esri.IdentityManager;

  constructor(props: IdentityComponentProps) {
    super(props);
    this.state = {loading: true};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    esriPromise([
      'esri/identity/OAuthInfo',
      'esri/identity/IdentityManager'
    ]).then(([OAuthInfo, IdentityManager]) => {
      this.IdentityManager = IdentityManager;
      IdentityManager.on(
        'credential-create', (credential: __esri.Credential) => this.props.handleLogin(credential)
      );
      IdentityManager.on(
        'credentials-destroy', () => this.props.handleLogout()
      );

      const info = new OAuthInfo({
          appId: 'y4Lx1l6456Mbf85z',
          popup: false
      });
      const loadingComplete = () => this.setState({loading: false});
      IdentityManager.registerOAuthInfos([info]);
      IdentityManager.checkSignInStatus(this.props.portalUrl)
        .then(loadingComplete)
        .catch(loadingComplete);
    });
  }

  handleLogin() {
    if (!this.IdentityManager) { return; }
    this.IdentityManager.getCredential(this.props.portalUrl);
  }

  handleLogout () {
    if (!this.IdentityManager) { return; }
    this.IdentityManager.destroyCredentials();
  }

  render() {
    return (
      <Identity
        loading={this.state.loading}
        credential={this.props.credential}
        handleLogout={this.handleLogout}
        handleLogin={this.handleLogin}
      />
    );
  }
}