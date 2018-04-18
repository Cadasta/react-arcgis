import * as React from 'react';
import { WebMap as EsriWebMap } from 'react-arcgis';
import { AttributeTable } from './AttributeTable';
import './WebMapView.css';

interface WebMapViewProps {
  portalId: string;
  showAttrTable: boolean;
  toggleAttrTable: (e: React.MouseEvent<HTMLElement>) => void;
  handleMapLoad: (map: __esri.Map, view: __esri.MapView | __esri.SceneView) => void;
  layers?: __esri.Collection<__esri.Layer>;
}
export const WebMapView = (props: WebMapViewProps) => (
  <React.Fragment>
    <div className="col-2">
      <button onClick={props.toggleAttrTable}>
        {/* TODO: Can we put this IN the map as a standard plugin? */}
          Attribute Table
        </button>
    </div>
    <div className="col">
      <div
        // TODO: rm need to set h-75, row should autofill height
        className={`map row ${props.showAttrTable ? 'h-75' : ''}`}
      >
        <EsriWebMap
          id={props.portalId}
          mapProperties={{ basemap: 'satellite' }}
          onLoad={props.handleMapLoad}
          onFail={console.error}
          style={{
            height: '100vh'
          }}
        />
      </div>
      {props.showAttrTable && (
        <div className="row h-25">
          <AttributeTable layers={props.layers} />
        </div>
      )}
    </div>
  </React.Fragment>
);
