import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import GUI from 'lil-gui'; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement );

const geometry = new THREE.BoxGeometry(15,15,15,64,64,64)
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe:true
});

const material2 = new THREE.MeshStandardMaterial({color: 0xff0033, roughness: 0.1  , metalness: 0.3});

const sphere = new THREE.Mesh( geometry, material2 );
scene.add( sphere );


const lightambi = new THREE.AmbientLight(0xffffff);
lightambi.intensity = 0.25;

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
light.intensity = 25;
scene.add(light);
scene.add(lightambi);

camera.position.z = 50;

function animate() {
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  let radius = 15;
	renderer.render( scene, camera );
}


function updateGeometry(mesh,radius,noisePara){
  toUnitSphere(mesh);
  if (mesh != null) {
    let g = mesh.geometry;
    let p = g.getAttribute('position');
    let noise3D = createNoise3D();
    for (let i = 0; i<p.count; i++) { 
        let x = p.getX(i);
        let y = p.getY(i);
        let z = p.getZ(i) 
        let scale =  (noise3D(x*noisePara.rough,y*noisePara.rough,z*noisePara.rough) + 1) * 0.5 * noisePara.strength;      //change output from -1 to 1 -> 0 to 1
       // console.log(scale);
        p.setXYZ(i, x*radius* (1 + scale), y*radius* (1 + scale), z*radius* (1 + scale));     //1+scale to only increase scale
    }
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
    p.needsUpdate = true;
}
}


function toUnitSphere(mesh) {
  if (mesh != null) {
      let g = mesh.geometry;
      let p = g.getAttribute('position');

      for (let i = 0; i<p.count; i++) { 
          let x = p.getX(i);
          let y = p.getY(i);
          let z = p.getZ(i);
          let norm = Math.sqrt(x*x + y*y + z*z);
          x = (x/norm);
          y = (y/norm);
          z = (z/norm);
          p.setXYZ(i, x, y, z);
      }
      mesh.geometry.computeVertexNormals();
      mesh.geometry.normalsNeedUpdate = true;
      p.needsUpdate = true;
  }

}

const noisePara = {
  strength: 0.8,
  rough: 3
};


const gui = new GUI();
gui.add(noisePara, 'strength',0 ,10);
gui.add(noisePara, 'rough',0 ,10 );
gui.onChange((strength) => {
  console.log(noisePara);
  updateGeometry(sphere,5,noisePara);
});

toUnitSphere(sphere);
updateGeometry(sphere,5,noisePara);

renderer.setAnimationLoop( animate );
