$ ( document ).ready( function(){
 console.log('DOM listo');


 let mouse = new THREE.Vector2(-1000,-1000);

 var scene = new THREE.Scene();
 var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize( window.innerWidth, window.innerHeight );
 $("body").append( renderer.domElement );

 var light = new THREE.PointLight( 0xffffff, 5, 10000 );
 light.position.set( 0, 2, 5 );
 light.castShadow = true;
 scene.add( light );

scene.add(camera);
 camera.position.z = 6;


//  let geometry = new THREE.IcosahedronGeometry(4,2);
//  let material = new THREE.MeshLambertMaterial({ color: 0xF5314d, flatShading: true, wireframe:true } );
//  geometry.computeFlatVertexNormals();
//  let ico = new THREE.Mesh( geometry, material );
// scene.add(ico);

let contenedorDibujo = new THREE.Object3D();
scene.add( contenedorDibujo);


       function animate(){
       requestAnimationFrame( animate );
       renderer.render( scene, camera );

      // camera.position.x -= 0.001;
       light.position.y -= 0.01;
       contenedorDibujo.rotation.z -= 0.005;
     }
     animate();

let isPressed = false;
let wire = false;


 $( window ).on( 'mousemove', function( e ){
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    camera.position.x = mouse.x*6;
    camera.position.y = mouse.y*6;
    light.position.x = mouse.x;
    light.position.z = mouse.y;
    camera.lookAt(0, 0, 0, );


if ( isPressed ){

  let geometry = new THREE.IcosahedronGeometry(Math.abs(mouse.x),1,2);
  let color = new THREE.Color("rgb("+Math.round( Math.abs(mouse.x) * 255) + "," + Math.round(Math.abs(mouse.y) * 255) + ", 255)");
  let material = new THREE.MeshLambertMaterial({ color: color,  wireframe:wire} );
  let circulo = new THREE.Mesh( geometry, material );

  let geometry2 = new THREE.BoxGeometry(Math.abs(mouse.x),2);
  let color2 = new THREE.Color("rgb("+Math.round( Math.abs(mouse.x) * 255) + "," + Math.round(Math.abs(mouse.y) * 25) + ", 255)");
  let material2 = new THREE.MeshLambertMaterial({ color: color2, transparent: true, opacity: 0.2} );
  let box = new THREE.Mesh( geometry2, material2 );

  var vector = new THREE.Vector3(mouse.x, mouse.y, 2);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar( distance ));
  circulo.position.copy(pos);
  box.position.copy(pos);
  contenedorDibujo.add(circulo);
  contenedorDibujo.add(box);
}

  });

 $(window).on('mousedown', function(e){

   isPressed = true;
   wire = true;
 });

 $(window).on('mouseup', function(e){

   isPressed = false;
 });




  });
