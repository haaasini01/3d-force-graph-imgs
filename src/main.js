import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";

fetch("/graph.json")
  .then(res => res.json())
  .then(data => {

    const Graph = ForceGraph3D()
      (document.getElementById("graph"))
      .graphData(data)

      .nodeThreeObject(node => {

        const texture = new THREE.TextureLoader().load(
          `/images/ip/${node.id}`
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

      .nodeThreeObjectExtend(false)
      .onNodeClick(node => {
        window.open(`/images/ip/${node.id}`, "_blank");
      })
      .linkWidth(1)
      .linkOpacity(0.15)
      .backgroundColor("#000011")
      .nodePositionUpdate((obj, coords) => {
        Object.assign(obj.position, coords);
        obj.lookAt(Graph.camera().position);
      });

    Graph.d3Force("charge").strength(-120);
    Graph.d3Force("link").distance(80);

  });