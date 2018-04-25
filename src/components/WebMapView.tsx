import * as React from 'react';
import { WebMap as EsriWebMap } from 'react-arcgis';

import { AttributeTable } from './AttributeTable';

import './WebMapView.css';

interface WebMapViewProps {
  portalId: string;
  isAttrTableVisible: boolean;
  toggleAttrTable: (e: React.MouseEvent<HTMLElement>) => void;
  handleMapLoad: (map: __esri.Map, view: __esri.MapView | __esri.SceneView) => void;
  handleLayerSelect: (e: React.MouseEvent<HTMLElement>) => void;
  layers: Array<__esri.FeatureLayer>;
  selectedLayer?: __esri.FeatureLayer;
  selectedLayerFeatureSet?: __esri.FeatureSet;
}
export const WebMapView = (props: WebMapViewProps) => (
  <React.Fragment>
    <div className="col-2">
      <button
        onClick={props.toggleAttrTable}
        disabled={!props.layers.length}
        className={props.layers ? 'cursor-pointer' : 'cursor-default'}
      >
          Attribute Table
      </button>
    </div>
    <div className="col scroll-overflow">
      <div
        // TODO: rm need to set h-75, row should autofill height
        className={`map row ${props.isAttrTableVisible ? 'h-75' : ''}`}
      >
        <EsriWebMap
          id={props.portalId}
          onLoad={props.handleMapLoad}
          onFail={console.error}
        />
      </div>
      {props.isAttrTableVisible && (
        <div className="row scroll-overflow h-25">
          {
            props.layers ?
            <AttributeTable
              layers={props.layers}
              selectedLayer={props.selectedLayer}
              handleLayerSelect={props.handleLayerSelect}
              selectedLayerFeatureSet={props.selectedLayerFeatureSet}
            /> :
            'Loading...'
          }
        </div>
      )}
    </div>
  </React.Fragment>
);
