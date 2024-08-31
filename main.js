import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';
import GUI from 'lil-gui'; 

const noisePara = {
  numLayers: 4,
  persistence: 0.5,
  baseRoughness: 1,
  strength: 0.8,
  roughness: 2,
  minVal: 1,
  centreX: 0,
  centreY: 0,
  centreZ: 0
};

function animate() {
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  let radius = 15;
	renderer.render( scene, camera );
}

function evaluatenoise(x,y,z,noisePara){
  let value = 0;
  let freq = noisePara.baseRoughness;
  let ampli = 1;
  for(let i = 0; i < noisePara.numLayers; i++){
    let v = (noise3D(x * freq + noisePara.centreX,
                    y * freq + noisePara.centreY,
                    z * freq + noisePara.centreZ
    ));  

    value += (v + 1) * 0.5 * ampli;
    ampli *= noisePara.persistence;
    freq *= noisePara.roughness;
    
  }
  value = Math.max(value,noisePara.minVal);
  return value * noisePara.strength;
}

function updateGeometry(mesh,radius,noisePara){
  toUnitSphere(mesh);
  if (mesh != null) {
    let g = mesh.geometry;
    let p = g.getAttribute('position');
    for (let i = 0; i<p.count; i++) { 
        let x = p.getX(i);
        let y = p.getY(i);

        let z = p.getZ(i) 
        //let scale =  (noise3D(x*noisePara.rough+noisePara.centreX,y*noisePara.rough + noisePara.centreY,z*noisePara.rough + noisePara.centreZ) + 1) * 0.5 * noisePara.strength;      //change output from -1 to 1 -> 0 to 1
       // console.log(scale);
        let scale = evaluatenoise(x,y,z,noisePara);
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
      p.needsUpdate = true;
  }

}


//gui
const gui = new GUI();
gui.add(noisePara, 'strength',0 ,4, 0.01);
gui.add(noisePara, 'roughness',1,5 ).step(0.01);
gui.add(noisePara, 'centreX',0,4, 0.1);
gui.add(noisePara, 'centreY',0,4, 0.1);
gui.add(noisePara, 'centreZ',0,4, 0.1);
gui.add(noisePara, 'baseRoughness',0,5);
gui.add(noisePara, 'persistence', 0,1)
gui.add(noisePara, 'minVal',0,5);

gui.onChange((strength) => {
  updateGeometry(sphere,5,noisePara);
});


//3d rendering and setup
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
lightambi.intensity = 0.5;
scene.add(lightambi);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
light.intensity = 75;
scene.add(light);


camera.position.z = 50;


let noise3D = createNoise3D();
toUnitSphere(sphere);
updateGeometry(sphere,5,noisePara);

renderer.setAnimationLoop( animate );
