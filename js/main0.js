$ ( document ).ready( function(){
 console.log('DOM listo');


 let mouse = new THREE.Vector2(-1000,-1000);

 var scene = new THREE.Scene();
 var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize( window.innerWidth, window.innerHeight );
 $("body").append( renderer.domElement );

 var light = new THREE.PointLight( 0xffffff, 1, 1000 );
 light.position.set( 0, 0, 4 );
 light.castShadow = true;
 scene.add( light );

scene.add(camera);
 camera.position.z = 6;


 let geometry = new THREE.IcosahedronGeometry(1,2);
 let material = new THREE.MeshLambertMaterial({ color: 0xF5314d, flatShading: true} );
 geometry.computeFlatVertexNormals();
 let ico = new THREE.Mesh( geometry, material );
scene.add(ico);

let contenedorDibujo = new THREE.Object3D();
scene.add( contenedorDibujo);


       function animate(){
       requestAnimationFrame( animate );
       renderer.render( scene, camera );
     }
     animate();

let isPressed = false;



 $( window ).on( 'mousemove', function( e ){
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    camera.position.x = mouse.x*5;
    camera.position.y = mouse.y*5;
    light.position.x = mouse.x*2;
    light.position.y = mouse.y*2;
    camera.lookAt(0, 0, 0, );


if ( isPressed ){

  let geometry = new THREE.CircleGeometry( (Math.abs(mouse.x)*0.3)+ 0.2,32);
  let color = new THREE.Color("rgb("+Math.round( Math.abs(mouse.x) * 255) + "," + Math.round(Math.abs(mouse.y) * 255) + ", 255)");
  let material = new THREE.MeshLambertMaterial({ color: color} );
  let circulo = new THREE.Mesh( geometry, material );

  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar( distance ));
  circulo.position.copy(pos);
  contenedorDibujo.add(circulo);
}

  });

 $(window).on('mousedown', function(e){

   isPressed = true;
 });

 $(window).on('mouseup', function(e){

   isPressed = false;
 });


  });
