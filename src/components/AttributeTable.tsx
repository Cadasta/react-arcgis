import * as React from 'react';

import { stringifyUnixTimestamp } from '../utils';

import './AttributeTable.css';

interface LayerTableProps {
  layer: __esri.FeatureLayer;
  featureSet?: __esri.FeatureSet;
}
export const LayerTable = ({layer, featureSet}: LayerTableProps) => {
  const headerColumns = layer.fields.map((field: __esri.Field, i) => (
    <th key={i} title={field.alias}>
      {field.name}
    </th>
  ));
  let rows: JSX.Element | JSX.Element[] = (
    <tr>
      <td colSpan={layer.fields.length}>
        <span>Fetching features...</span>
      </td>
    </tr>
  );
  if (featureSet) {
    rows = featureSet.features.map((feature: __esri.Graphic, i) => (
      <tr key={i}>
        {
          layer.fields.map((field: __esri.Field, j) => (
            <td
              key={j}
              title={feature.attributes[field.name]}
            >
              {
                field.type === 'date'
                ? stringifyUnixTimestamp(feature.attributes[field.name])
                : feature.attributes[field.name]
              }
            </td>
          ))
        }
      </tr>
    ));
  }
  return (
    <div className="attribute-table table-responsive">
      <table className="table table-sm table-bordered table-striped">
        <thead className="thead-light">
          <tr>
            {headerColumns}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

interface AttributeTableProps {
  layers: Array<__esri.FeatureLayer>;
  handleLayerSelect: (e: React.MouseEvent<HTMLElement>) => void;
  selectedLayer?: __esri.FeatureLayer;
  selectedLayerFeatureSet?: __esri.FeatureSet;
}
const LayerTabs = ({layers, handleLayerSelect, selectedLayer}: AttributeTableProps) => (
  <ul className="nav nav-tabs">
    {
      layers
        .map((l: __esri.FeatureLayer) => (
          <li key={l.id} className="nav-item">
            <span
              className={
                `nav-link ${
                  selectedLayer && (l.id === selectedLayer.id) ?
                  'active cursor-default' :
                  'cursor-pointer'}`
              }
              onClick={handleLayerSelect}
              data-layer-id={l.id}
            >
              {l.title}
            </span>
          </li>
        ))
    }
  </ul>
);
export const AttributeTable = (props: AttributeTableProps) => (
  <React.Fragment>
    <LayerTabs {...props} />
    {
      props.selectedLayer ?
      <LayerTable
        layer={props.selectedLayer}
        featureSet={props.selectedLayerFeatureSet}
      /> :
      'Fetching layers...'
    }
  </React.Fragment>
);
