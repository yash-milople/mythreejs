import * as THREE from "three";import React from "react";
import React3 from "react-three-renderer";
import ObjectModel from 'react-three-renderer-objects';
import carModel from "./WaltHead.obj";
// import carMaterial from "../../assets/TechnicLEGO_CAR_1.mtl";
class demoScene extends React.Component {constructor(props) {
    super(props);
    this.state = {
      scene: {}
    };
  }componentDidMount() {
    const { scene } = this.refs;
    this.setState({ scene });
  }render() {    let width = window.innerWidth;
    let height = window.innerHeight;    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        alpha={true}
      >
        <scene ref="scene">
          <perspectiveCamera
            key={`perspectiveCamera`}
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={new THREE.Vector3(0, 0, 25)}
            lookAt={new THREE.Vector3(0, 0, 0)}
          />          <group name="carGroup">
            <ObjectModel
              name="boat"
              model={carModel}
              
              scene={this.state.scene}
              group="carGroup"
            />
          </group>
        </scene>
      </React3>
    );
  }
}export default demoScene;