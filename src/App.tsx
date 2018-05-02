import * as React from 'react';
import { Navbar } from 'reactstrap';
import { esriPromise } from 'react-arcgis';

import { Footer } from './components/Footer';
import { WebMapContainer } from './containers/WebMapContainer';
import { IdentityContainer } from './containers/IdentityContainer';

import './App.css';

const portalUrl = 'https://www.arcgis.com/sharing';

interface AppProps {}
interface AppState {
  credential?: __esri.Credential;
  identityManager?: __esri.IdentityManager;
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {};

    esriPromise([
      'esri/identity/OAuthInfo',
      'esri/identity/IdentityManager'
    ]).then(([OAuthInfo, IdentityManager]) => {
      const info = new OAuthInfo({
          appId: 'y4Lx1l6456Mbf85z',
          popup: false
      });

      IdentityManager.registerOAuthInfos([info]);
      IdentityManager.checkSignInStatus(portalUrl).then(
        (c: __esri.Credential) => {
          this.setState({credential: c, identityManager: IdentityManager});
        },
        () => {
          this.setState({identityManager: IdentityManager});
        }
      );
    });
  }

  render() {
    return (
      <div className="container-fluid h-100 d-flex flex-column">
        <div className="row">
          <Navbar>
            Cadasta
            <IdentityContainer
              credential={this.state.credential}
              identityManager={this.state.identityManager}
              portalUrl={portalUrl}
            />
          </Navbar>
        </div>
        <div className="row h-100">
          {/* TODO: This should probably be a route (the home route) */}
          {this.state.credential && 
            <WebMapContainer
              portalId="459eb07ed2544fd4b655b87dca7abf8c"
            />
          }
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
