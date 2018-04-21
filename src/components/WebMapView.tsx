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
  layers?: __esri.Collection<__esri.FeatureLayer>;
  selectedLayer?: __esri.FeatureLayer;
  selectedLayerAttributes?: object;
}
export const WebMapView = (props: WebMapViewProps) => (
  <React.Fragment>
    <div className="col-2">
      <button
        onClick={props.toggleAttrTable}
        disabled={!props.layers}
        className={props.layers ? 'cursor-pointer' : 'cursor-default'}
      >
        {/* TODO: Can we put this IN the map as a standard plugin? */}
          Attribute Table
      </button>
    </div>
    <div className="col">
      <div
        // TODO: rm need to set h-75, row should autofill height
        className={`map row ${props.isAttrTableVisible ? 'h-75' : ''}`}
      >
        <EsriWebMap
          id={props.portalId}
          mapProperties={{ basemap: 'satellite' }}
          onLoad={props.handleMapLoad}
          onFail={console.error}
        />
      </div>
      {props.isAttrTableVisible && (
        <div className="row h-25">
          {
            props.layers ?
            <AttributeTable
              layers={props.layers}
              selectedLayer={props.selectedLayer}
              handleLayerSelect={props.handleLayerSelect}
              selectedLayerAttributes={props.selectedLayerAttributes}
            /> :
            'Loading...'
          }
        </div>
      )}
    </div>
  </React.Fragment>
);
