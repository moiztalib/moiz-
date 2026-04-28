const canvas=document.getElementById('canvas');
scene.add(hemi);

const dirLight=new THREE.DirectionalLight(0xffffff,2);
dirLight.position.set(5,10,7);
dirLight.castShadow=true;
scene.add(dirLight);

// HDR
new THREE.RGBELoader().load(
'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_03_1k.hdr',
(texture)=>{
texture.mapping=THREE.EquirectangularReflectionMapping;
scene.environment=texture;
}
);

// CONTROLS
const controls=new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;
controls.autoRotate=true;
controls.autoRotateSpeed=1;

// LOAD REAL CAR MODEL (REPLACE WITH DOWNLOADED PORSCHE FILE)
let car;
const loader=new THREE.GLTFLoader();
loader.load(
'https://modelviewer.dev/shared-assets/models/Astronaut.glb', // placeholder WORKING MODEL
(gltf)=>{
car=gltf.scene;
car.scale.set(2,2,2);
car.traverse(c=>{if(c.isMesh){c.castShadow=true}});
scene.add(car);
},
undefined,
(e)=>console.error(e)
);

// ANIMATE
function animate(){
requestAnimationFrame(animate);
controls.update();
renderer.render(scene,camera);
}
animate();

// RESPONSIVE
window.addEventListener('resize',()=>{
camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth,window.innerHeight);
});

// CONFIG
function setColor(color){
if(!car) return;
car.traverse(child=>{
if(child.isMesh){child.material.color.set(color)}
});
}

// CINEMATIC
function cinematic(){
gsap.to(camera.position,{x:5,y:2,z:5,duration:2});
}