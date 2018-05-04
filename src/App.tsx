import * as React from 'react';
import { Navbar } from 'reactstrap';

import { Footer } from './components/Footer';
import { WebMapContainer } from './containers/WebMapContainer';
import { IdentityContainer, IdentityManagerEvent } from './containers/IdentityContainer';

import './App.css';

const portalUrl = 'https://www.arcgis.com/sharing';
const appId = 'y4Lx1l6456Mbf85z';

interface AppProps {}
interface AppState {
  credential?: __esri.Credential;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
    this.handleLoginChange = this.handleLoginChange.bind(this);
  }

  handleLoginChange(event: IdentityManagerEvent) {
    this.setState({credential: event.credential});
  }

  render() {
    return (
      <div className="container-fluid h-100 d-flex flex-column">
        <div className="row">
          <Navbar>
            Cadasta
            <IdentityContainer
              credential={this.state.credential}
              portalUrl={portalUrl}
              appId={appId}
              handleLoginChange={this.handleLoginChange}
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
