import * as React from 'react';

interface AttributeTableProps {
  layers: __esri.Collection<__esri.FeatureLayer>;
  handleLayerSelect: (e: React.MouseEvent<HTMLElement>) => void;
  selectedLayer?: __esri.FeatureLayer;
  selectedLayerAttributes?: object;
}
interface AttributeTableState {

}
export class AttributeTable extends React.Component<AttributeTableProps, AttributeTableState> {
  render() {
    return (
      <React.Fragment>
        {this.props.layers.length > 1 && <LayerTabs {...this.props} />}
        {
          this.props.selectedLayer ?
          <LayerTable
            layer={this.props.selectedLayer}
            attributes={this.props.selectedLayerAttributes}
          /> :
          'Fetching attributes...'
        }
      </React.Fragment>
    );
  }
}

function LayerTabs({layers, handleLayerSelect, selectedLayer}: AttributeTableProps) {
  return (
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
          .toArray()
      }
    </ul>
  );
}

interface LayerTableProps {
  layer: __esri.FeatureLayer;
  attributes?: object;
}
export const LayerTable = ({layer, attributes}: LayerTableProps) => (
  <table>
    <thead>
      <tr>
        {layer.fields.map((field: __esri.Field, i) => (
          <th
            key={i}
            title={field.alias}
          >
            {field.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {/* {
        this.features.map((feature: __esri.Graphic) => (
          <tr>
            {
              this.fields.map((field: __esri.Field, i) => (
                <td
                  key={i}
                  title={feature.attributes[field.name]}
                  data-index={i}
                  onclick={this.goTo}
                >
                  {
                    field.type === 'date'
                    ? this.stringifyUnixTimestamp(feature.attributes[field.name])
                    : feature.attributes[field.name]
                  }
                </td>
              ))
            }
          </tr>
        ))
      } */}
    </tbody>
  </table>
);
