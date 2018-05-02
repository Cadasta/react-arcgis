import * as React from 'react';
import { Navbar } from 'reactstrap';

import { Footer } from './components/Footer';
import { WebMapContainer } from './containers/WebMapContainer';
import { IdentityContainer } from './containers/IdentityContainer';

import './App.css';

const portalUrl = 'https://www.arcgis.com/sharing';

interface AppProps {}
interface AppState {
  credential?: __esri.Credential;
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = {};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(credential: __esri.Credential | undefined): void {
    this.setState({credential});
  }

  handleLogout(): void {
    this.setState({credential: undefined});
  }

  render() {
    return (
      <div className="container-fluid h-100 d-flex flex-column">
        <div className="row">
          <Navbar>
            Cadasta
            <IdentityContainer
              portalUrl={portalUrl}
              credential={this.state.credential}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
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
