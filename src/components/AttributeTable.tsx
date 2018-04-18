import * as React from 'react';

interface AttributeTableProps {
  layers?: __esri.Collection<__esri.Layer>;
}
export const AttributeTable = ({layers}: AttributeTableProps) => {
  if (!layers) {
    return <p>Loading...</p>;
  }
  return (
    <ul className="nav nav-tabs">
      {
        layers.map((l: __esri.Layer, i: number) => (
          <li key={i} className="nav-item">
            <span className="nav-link active">{l.title}</span>
          </li>
        )).toArray()
      }
    </ul>
  );
};
