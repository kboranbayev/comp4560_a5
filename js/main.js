/**
  *  COMP 4560 - Assignment 5
  *  Basic Transformations
  *
  *  @autor Boranbayev Kuanysh
  *  @autor Michael Chen
  **/
var container, controls;
var scene, renderer;
var rotX, rotY, rotZ;
var points = [];  // stores points
var lines = [];   // stores lines

/////////////////////////////////////
// Input File Opener for Points file
function handleFiles1(files) {
  if (window.FileReader) {
    getAsText1(files[0]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}
// Input File Reader for Lines file
function getAsText1(fileToRead) {
  var reader = new FileReader();

  reader.readAsText(fileToRead);

  reader.onload = loadHandler1;
  reader.onerror = errorHandler;
}
// Input File Loader for Points file
function loadHandler1(event) {
  var csv = event.target.result;
  processData1(csv);
}
// Input File Processer for Points file
function processData1(dat) {
  var allTextLines = dat.split(/\r\n|\n/);

  for (var i = 0; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(' ');
    var tarr = [];
    for (var j = 0; j < data.length; j++) {
      tarr.push(data[j]);
    }
    points.push(tarr);
  }
}
// Input File Opener for Lines file
function handleFiles2(files) {
  if (window.FileReader) {
    getAsText2(files[0]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}
// Input File Reader for Lines file
function getAsText2(fileToRead) {
  var reader = new FileReader();

  reader.readAsText(fileToRead);

  reader.onload = loadHandler2;
  reader.onerror = errorHandler;
}
// Input File Loader for Lines file
function loadHandler2(event) {
  var dat = event.target.result;
  processData2(dat);
}
// Input File Processer for Lines file
function processData2(dat) {
  var allTextLines = dat.split(/\r\n|\n/);

  for (var i = 0; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(' ');
    var tarr = [];
    for (var j = 0; j < data.length; j++) {
      tarr.push(data[j]);
    }
    lines.push(tarr);
  }
  init();
  animate();
}
// Input File Error Handler
function errorHandler(evt) {
  if (evt.target.error.name === "NotReadableError") {
    alert("Cannot read file!");
  }
}
{
    var camera = new THREE.OrthographicCamera( window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 2000 );
    var material = new THREE.LineBasicMaterial( { color: 0xfefefe, wireframe: true, opacity: 0.5 } );
    var geometry = new THREE.Geometry();
    var initialGeometry = new THREE.Geometry();
    var line = new THREE.LineSegments(geometry, material);
}

/*
  Translates left by 7.5
*/
function translateLeft() {
  console.log('translate left triggered');
  var m = new THREE.Matrix4();
  m.set( 1,    0,    0, -7.5,
         0,    1,    0,    0,
         0,    0,    1,    0,
         0,    0,    0,    1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Translates right by 7.5
*/
function translateRight() {
  console.log('translate right triggered');
  var m = new THREE.Matrix4();
  m.set( 1,    0,    0,  7.5,
         0,    1,    0,    0,
         0,    0,    1,    0,
         0,    0,    0,    1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Translates up by 3.5
*/
function translateUp() {
  console.log('translate up triggered');
  var m = new THREE.Matrix4();
  m.set( 1,    0,    0,    0,
         0,    1,    0,  3.5,
         0,    0,    1,    0,
         0,    0,    0,    1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Translates down by 3.5
*/
function translateDown() {
  console.log('translate down triggered');
  var m = new THREE.Matrix4();
  m.set( 1,    0,    0,    0,
         0,    1,    0, -3.5,
         0,    0,    1,    0,
         0,    0,    0,    1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Scales up by 10%
*/
function scaleUp() {
  console.log('scale up triggered');
  //geometry.scale(1.1, 1.1, 1.1);
  var m = new THREE.Matrix4();
  m.set( 1.1,   0,     0,    0,
           0,  1.1,    0,    0,
           0,    0,  1.1,    0,
           0,    0,    0,    1 );
  geometry.applyMatrix(m);
  render();
}

/*
  Scales down by 10%
*/
function scaleDown() {
  console.log('scale down triggered');
  var m = new THREE.Matrix4();
  m.set( 10/11,     0,     0,    0,
             0, 10/11,     0,    0,
             0,     0, 10/11,    0,
             0,     0,     0,    1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Clockwise Rotation about x-axis
  by 0.05 radians
*/
function rotateX() {
  console.log('rotate about x triggered');
  var cosA = Math.cos(0.05);
  var sinA = Math.sin(0.05);
  var m = new THREE.Matrix4();
  m.set(     1,     0,     0,    0,
             0,  cosA,  sinA,    0,
             0, -sinA,  cosA,    0,
             0,     0,     0,    1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Clockwise Rotation about y-axis
  by 0.05 radians
*/
function rotateY() {
  console.log('rotate about y triggered');
  var cosA = Math.cos(0.05);
  var sinA = Math.sin(0.05);
  var m = new THREE.Matrix4();
  m.set(  cosA,     0,  sinA,    0,
             0,     1,     0,    0,
         -sinA,     0,  cosA,    0,
             0,     0,     0,    1 );
  geometry.applyMatrix(m);
  // render
  render();
}


/*
  Clockwise Rotation about z-axis
  by 0.05 radians
*/
function rotateZ() {
  console.log('rotate about z triggered');
  var cosA = Math.cos(0.05);
  var sinA = Math.sin(0.05);
  var m = new THREE.Matrix4();
  m.set(  cosA,  sinA,     0,    0,
         -sinA,  cosA,     0,    0,
             0,     0,     1,    0,
             0,     0,     0,    1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Clockwise Continuous Rotation about x-axis
*/
function rotateXcon() {
  console.log('continuous rotate about x triggered');
  rotX = setInterval(rotateX, 50);
}

/*
  Clockwise Continuous Rotation about y-axis
*/
function rotateYcon() {
  console.log('continuous rotate about y triggered');
  rotY = setInterval(rotateY, 50);
}

/*
  Clockwise Continuous Rotation about z-axis
*/
function rotateZcon() {
  console.log('continuous rotate about z triggered');
  rotZ = setInterval(rotateZ, 50);
}

/*
  Shears in the +x direction with respect to y
*/
function shearRight() {
  console.log('Shear right triggered');
  var m = new THREE.Matrix4();
  m.set( 1,  0.1,   0,   0,
         0,    1,   0,   0,
         0,    0,   1,   0,
         0,    0,   0,   1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Shears in the -x direction with respect to y
*/
function shearLeft() {
  console.log('Shear left triggered');
  var m = new THREE.Matrix4();
  m.set( 1, -0.1,   0,   0,
         0,    1,   0,   0,
         0,    0,   1,   0,
         0,    0,   0,   1 );
  geometry.applyMatrix(m);
  // render
  render();
}

/*
  Resets all to initial state
*/
function reset() {
  console.log('Reset triggered');
  // stop all continuous rotations
  {
    clearInterval(rotX);
    clearInterval(rotY);
    clearInterval(rotZ);
  }
  // remove current state
  scene.remove(line);
  geometry.dispose();
  // reset to initial state
  geometry = initialGeometry;
  line = new THREE.LineSegments(geometry, material);
  scene.add(line);
  // normalize view and render
  normalize();
  render();
}

/*
  View normalizer
*/
function normalize() {
  geometry.normalize();
  var scaleFactor = 160 / geometry.boundingSphere.radius;
  geometry.scale( scaleFactor, scaleFactor, scaleFactor );
  camera.position.z = 500;
  camera.position.x = 0;
  camera.position.y = 0;
  for (i = 0; i < 10; i++)
    scaleUp();
}

/*
  Builds initial view of a character
*/
function addCharacter() {
  // getting data from read data which stored in global variables like points and lines
  // l is array such as for line 0, l['1','0']
  lines.forEach(function(l) {
    while (l[0] !== "-1" && l[1] !== "" && l[0] !== "") {
      var point = [];
      // getting first point
      for (var i = 0; i < 3; i++) {
        var lineVal0 = parseFloat(l[0]);
        point.push(parseInt(points[lineVal0][i]));
      }
      // getting second point
      for (var j = 0; j < 3; j++) {
        var lineVal1 = parseFloat(l[1]);
        point.push(parseInt(points[lineVal1][j]));
      }
      // draws line between these points
      geometry.vertices.push(new THREE.Vector3(point[0], point[1], point[2]), new THREE.Vector3(point[3], point[4], point[5]));
      break;
    }
  });
  scene.add(line);
  initialGeometry = geometry.clone();
  // scale geometry to a uniform size
  //geometry.computeBoundingSphere();
  geometry.normalize();
  //geometry.rotateX(1.5708);
  var scaleFactor = 160 / geometry.boundingSphere.radius;
  geometry.scale( scaleFactor, scaleFactor, scaleFactor );
}

function init() {
  // get element which will act as workspace
  container = document.getElementById( 'container' );

  // make viewer position
  {
    camera.position.z = 500;
    camera.position.x = 0;
    camera.position.y = 0;
  }

  // build scene
  scene = new THREE.Scene();

  // build a character
  addCharacter();

  // build renderer for scene
  {
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    // orbit controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );
  }

  // windown resize listener
  {
    window.addEventListener( 'resize', onWindowResize, false );
    for (i = 0; i < 10; i++)
    scaleUp();
  }
}

/*
  Resizes object everytime window size changes
*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

/*
  On mouse move animator
*/
function animate() {
  requestAnimationFrame( animate );
  render();
}

/*
  Displays to screen
*/
function render() {
  renderer.render( scene, camera );
}
