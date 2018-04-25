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
        <span>Fetching FeatureSet...</span>
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
              // data-index={i}
              // onclick={this.goTo}
            >
              {
                field.type === 'date'
                ? stringifyUnixTimestamp(feature.attributes[field.name])
                : feature.attributes[field.name]
              }
              {feature.attributes[field.name]}
            </td>
          ))
        }
      </tr>
    ));
  }
  return (
    <table className="attribute-table">
      <thead>
        <tr>
          {headerColumns}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
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
    {
      props.layers.length > 1 &&
      <LayerTabs {...props} />
    }
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
