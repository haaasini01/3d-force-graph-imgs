import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";
import { GRAPH_PATH, IMAGE_PATH } from "./config.js";

fetch(GRAPH_PATH)
  .then(res => res.json())
  .then(data => {

    const Graph = ForceGraph3D()
      (document.getElementById("graph"))
      .graphData(data)

      .nodeThreeObject(node => {

        const texture = new THREE.TextureLoader().load(
          `${IMAGE_PATH}/${node.id}`
        );

        texture.colorSpace = THREE.SRGBColorSpace;

        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        });

        const geometry = new THREE.PlaneGeometry(20, 20);
        return new THREE.Mesh(geometry, material);
      })

      .onNodeClick(node => {
        window.open(`${IMAGE_PATH}/${node.id}`, "_blank");
      });

  });