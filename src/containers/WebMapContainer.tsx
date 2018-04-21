// tslint:disable:no-console
import * as React from 'react';
import { WebMapView } from '../components/WebMapView';

interface WebMapComponentProps {
  portalId: string;
}
interface WebMapComponentState {
  map?: __esri.Map;
  view?: __esri.MapView | __esri.SceneView;
  isAttrTableVisible: boolean;
  layerAttributes: Map<__esri.FeatureLayer, object>;
  selectedLayer?: __esri.FeatureLayer;
}
export class WebMapContainer extends React.Component<WebMapComponentProps, WebMapComponentState> {
  constructor(props: WebMapComponentProps) {
    super(props);
    this.state = {
      isAttrTableVisible: false,
      layerAttributes: new Map(),
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.toggleAttrTable = this.toggleAttrTable.bind(this);
    this.handleLayerSelect = this.handleLayerSelect.bind(this);
  }

  get featureLayers(): __esri.Collection<__esri.Layer> | undefined {
    if (!this.state.map) return undefined;
    return this.state.map.layers.filter(l => l.type === 'feature')
  }

  get selectedLayerAttributes(): object | undefined {
    const selectedLayer = this.state.selectedLayer;
    if (!selectedLayer) return undefined;
    return this.state.layerAttributes.get(selectedLayer);
  }

  handleMapLoad(map: __esri.Map, view: __esri.MapView | __esri.SceneView): void {
    const selectedLayer = map.layers.length ? map.layers[0] : null;
    this.setState({ map, view, selectedLayer });
  }

  toggleAttrTable() {
    this.setState(
      prevState => ({ isAttrTableVisible: !prevState.isAttrTableVisible }),
      () => {
        // Fetch attributes for selected layer if not already stored locally
        const selectedLayer = this.state.selectedLayer;
        if (selectedLayer && !this.state.layerAttributes.get(selectedLayer)) {
          this.fetchAttributes(selectedLayer)
        }
      }
    );
  }

  fetchAttributes(layer: __esri.FeatureLayer) {
    layer.fetchAttributionData().then((attrs: object) => {
      // TODO: Will this trigger rerender?
      this.state.layerAttributes.set(layer, attrs);
    })
  }

  handleLayerSelect(e: React.MouseEvent<HTMLElement>) {
    // TODO Set this.state.selectedLayer from key
    // this.setState({selectedLayer})
    console.log(e.target);
  }

  render() {
    return (
      <WebMapView
        portalId={this.props.portalId}
        isAttrTableVisible={this.state.isAttrTableVisible}
        toggleAttrTable={this.toggleAttrTable}
        handleMapLoad={this.handleMapLoad}
        layers={this.featureLayers}
        selectedLayer={this.state.selectedLayer}
        selectedLayerAttributes={this.selectedLayerAttributes}
        handleLayerSelect={this.handleLayerSelect}
      />
    );
  }
}
