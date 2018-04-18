import * as React from 'react';
import { WebMapView } from '../components/WebMapView';

interface WebMapComponentProps {
  portalId: string;
}
interface WebMapComponentState {
  map?: __esri.Map;
  view?: __esri.MapView | __esri.SceneView;
  showAttr: boolean;
}

// TODO: This should probably be a route (the home route)
export class WebMapContainer extends React.Component<WebMapComponentProps, WebMapComponentState> {
  constructor(props: WebMapComponentProps) {
    super(props);
    this.state = { showAttr: false };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.toggleAttrTable = this.toggleAttrTable.bind(this);
  }

  handleMapLoad(map: __esri.Map, view: __esri.MapView | __esri.SceneView): void {
    this.setState({ map, view});
  }

  toggleAttrTable() {
    this.setState(prevState => ({ showAttr: !prevState.showAttr }));
  }

  render() {
    return (
      <WebMapView
        portalId={this.props.portalId}
        showAttrTable={this.state.showAttr}
        toggleAttrTable={this.toggleAttrTable}
        handleMapLoad={this.handleMapLoad}
        layers={this.state.map && this.state.map.layers}
      />
    );
  }
}
