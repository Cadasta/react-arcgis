import * as React from 'react';

import { WebMapView } from '../components/WebMapView';

interface WebMapComponentProps {
  portalId: string;
}
interface WebMapComponentState {
  map?: __esri.Map;
  view?: __esri.MapView | __esri.SceneView;
  isAttrTableVisible: boolean;
  layerFeatureSet: Map<__esri.FeatureLayer, __esri.FeatureSet | undefined>;
  selectedLayer?: __esri.FeatureLayer;
}
export class WebMapContainer extends React.Component<WebMapComponentProps, WebMapComponentState> {
  constructor(props: WebMapComponentProps) {
    super(props);
    this.state = {
      isAttrTableVisible: false,
      layerFeatureSet: new Map(),
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.toggleAttrTable = this.toggleAttrTable.bind(this);
    this.handleLayerSelect = this.handleLayerSelect.bind(this);
  }

  /**
   * Retrieve array of FeatureLayer objects from State
   */
  get featureLayers(): Array<__esri.FeatureLayer> {
    return Array.from(this.state.layerFeatureSet.keys());
  }

  /**
   * Get attributes object for selected layer
   */
  get selectedLayerFeatureSet(): __esri.FeatureSet | undefined {
    const selectedLayer = this.state.selectedLayer;
    if (!selectedLayer) { return undefined; }
    return this.state.layerFeatureSet.get(selectedLayer);
  }

  /**
   * Handle output of map load from Esri map
   */
  handleMapLoad(map: __esri.Map, view: __esri.MapView | __esri.SceneView): void {
    this.setState({ map, view });

    // Filter layers for FeatureLayers
    const layers: __esri.Collection<__esri.FeatureLayer> = map.layers
      .filter(l => l.type === 'feature')
      .map((l: __esri.Layer) => l as __esri.FeatureLayer)
    ;

    // Populate layerFeatureSet
    layers.forEach(
      (l: __esri.FeatureLayer) => this.state.layerFeatureSet.set(l, undefined)
    );

    // Set selected layer, fetch layer's featureset if necessary
    const selectedLayer = layers.length ? layers.getItemAt(0) : undefined;
    if (selectedLayer) {
      this.setState({ selectedLayer });
      if (this.state.isAttrTableVisible) {
        this.fetchFeatureSet(selectedLayer);
      }
    }
  }

  /**
   * Show/hide attribute table, possibly triggering a fetch of
   * featureset if necessary.
   */
  toggleAttrTable() {
    const isAttrTableVisible = !this.state.isAttrTableVisible;
    this.setState({ isAttrTableVisible });

    // Fetch attributes for selected layer if not already stored locally
    const selectedLayer = this.state.selectedLayer;
    if (isAttrTableVisible && selectedLayer && !this.state.layerFeatureSet.get(selectedLayer)) {
      this.fetchFeatureSet(selectedLayer);
    }
  }

  fetchFeatureSet(layer: __esri.FeatureLayer) {
    layer.queryFeatures(layer.createQuery())
      .then((attrs: __esri.FeatureSet) => {
        this.state.layerFeatureSet.set(layer, attrs);
        this.forceUpdate();
      });
  }

  handleLayerSelect(e: React.MouseEvent<HTMLElement>) {
    // TODO Set this.state.selectedLayer from key
    // this.setState({selectedLayer})
    console.log(e.target); // tslint:disable-line:no-console
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
        selectedLayerFeatureSet={this.selectedLayerFeatureSet}
        handleLayerSelect={this.handleLayerSelect}
      />
    );
  }
}
