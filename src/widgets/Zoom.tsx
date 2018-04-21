// import * as React from 'react';
//
// interface WebMapComponentProps {
//   view: __esri.MapView | __esri.SceneView;
// }
// export class Zoom extends React.Component<WebMapComponentProps, {}> {
//   constructor(props: WebMapComponentProps) {
//     super(props);
//     this.state = {
//       maxZoomed: false,
//       minZoomed: false
//     };
//   }
//
//   componentDidMount() {
//     this.props.view.when(hitch(this, "onViewLoaded"));
//   }
//
//   onViewLoaded(view) {
//     this.state.vm.view = view;
//     watchUtils.init(view, 'zoom', hitch(this, "onZoomChange"));
//   }
//
//   onZoomChange(value) {
//     this.setState({
//       maxZoomed: value === view.constraints.maxZoom,
//       minZoomed: value === view.constraints.minZoom
//     });
//   }
//
//   zoomIn() {
//     if (!this.state.maxZoomed) {
//       this.state.vm.zoomIn();
//     }
//   }
//
//   zoomOut() {
//     if (!this.state.minZoomed) {
//       this.state.vm.zoomOut();
//     }
//   }
//
//   render() {
//     var maxstate = this.state.maxZoomed ? 'button circle raised disable' : 'button circle raised';
//     var minstate = this.state.minZoomed ? 'button circle raised disable' : 'button circle raised';
//     return (
//       <div className="zoom-btns">
//         <div className={maxstate} onClick={this.zoomIn}>
//         <div className="center"><i className="material-icons">add</i></div>
//       </div>
//       <div className={minstate} onClick={this.zoomOut}>
//         <div className="center"><i className="material-icons">remove</i></div>
//       </div>
//       </div>
//     );
//   }
// });
