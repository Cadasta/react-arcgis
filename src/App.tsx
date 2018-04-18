import * as React from 'react';
import { Navbar } from 'reactstrap';
import { Footer } from './components/Footer';
import { WebMapContainer } from './containers/WebMapContainer';
import './App.css';

// TODO: This should probably be a route (the home route)
class App extends React.Component<object, object> {

  render() {
    return (
      <div className="container-fluid h-100 d-flex flex-column">
        <div className="row">
          <Navbar>
            Cadasta
          </Navbar>
        </div>
        <div className="row h-100">
          <WebMapContainer
            portalId="459eb07ed2544fd4b655b87dca7abf8c"
          />
        </div>
        <div className="row">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
