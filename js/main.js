var container, stats, controls;
var scene, renderer;
var frustumSize = 1000;
var rotX, rotY, rotZ;
var camera = new THREE.OrthographicCamera( window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 2000 );

var mesh;

var material = new THREE.LineBasicMaterial( { color: 0xfefefe, wireframe: true, opacity: 0.5 } );
var geometry = new THREE.Geometry();
var initialGeometry = new THREE.Geometry();
var line = new THREE.LineSegments(geometry, material);

var points = [];
var lines = [];

/////////////////////////////////////

function handleFiles1(files) {
  if (window.FileReader) {
    getAsText1(files[0]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}
function getAsText1(fileToRead) {
  var reader = new FileReader();

  reader.readAsText(fileToRead);

  reader.onload = loadHandler1;
  reader.onerror = errorHandler;
}
function loadHandler1(event) {
  var csv = event.target.result;
  processData1(csv);
}
function processData1(csv) {
  var allTextLines = csv.split(/\r\n|\n/);

  for (var i = 0; i < allTextLines.length; i++) {
    var data = allTextLines[i].split(' ');
    var tarr = [];
    for (var j = 0; j < data.length; j++) {
      tarr.push(data[j]);
    }
    points.push(tarr);
  }
  //console.log(points);
}
//////////////////////////////////////////////////////
function handleFiles2(files) {
  if (window.FileReader) {
    getAsText2(files[0]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}
function getAsText2(fileToRead) {
  var reader = new FileReader();

  reader.readAsText(fileToRead);

  reader.onload = loadHandler2;
  reader.onerror = errorHandler;
}
function loadHandler2(event) {
  var csv = event.target.result;
  processData2(csv);
}
function processData2(csv) {
  var allTextLines = csv.split(/\r\n|\n/);

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
//////////////////////////////////////////////////////
function errorHandler(evt) {
  if (evt.target.error.name === "NotReadableError") {
    alert("Cannot read file!");
  }
}


// Moves the object by 75 pixels in - x direction
function translateLeft() {
  console.log('translate left triggered');
  /*
  var m = new THREE.Matrix4();
  m.set( 1, 0, 0, 0,
         0, 1, 0, 0,
         0, 0, 1, 0,
     -0.75, 0, 0, 1 );
  geometry.applyMatrix(m);
  var scaleFactor = 160 / geometry.boundingSphere.radius;
  geometry.scale( scaleFactor, scaleFactor, scaleFactor );
  */
  geometry.translate(-7.5, 0, 0);
  render();
}

function translateRight() {
  console.log('translate right triggered');
  geometry.translate(7.5, 0, 0);
  render();
}

function translateUp() {
  console.log('translate up triggered');
  geometry.translate(0, 3.5, 0);
  render();
}

function translateDown() {
  console.log('translate down triggered');
  geometry.translate(0, -3.5, 0);
  render();
}

function scaleUp() {
  console.log('scale up triggered');
  geometry.scale(1.1, 1.1, 1.1);
  render();
}

function scaleDown() {
  console.log('scale down triggered');
  geometry.scale(10/11, 10/11, 10/11);
  render();
}

function rotateX() {
  console.log('rotate about x triggered');
  geometry.rotateX(0.05);
  render();
}

function rotateY() {
  console.log('rotate about y triggered');
  geometry.rotateY(-0.05);
  render();
}

function rotateZ() {
  console.log('rotate about z triggered');
  geometry.rotateZ(-0.05);
  render();
}

function rotateXcon() {
  console.log('continuous rotate about x triggered');
  rotX = setInterval(rotateX, 50);
}

function rotateYcon() {
  console.log('continuous rotate about y triggered');
  rotY = setInterval(rotateY, 50);
}

function rotateZcon() {
  console.log('continuous rotate about z triggered');
  rotZ = setInterval(rotateZ, 50);
}

function shearRight() {
  console.log('Shear right triggered');
  var m = new THREE.Matrix4();
  m.set( 1,  0.1,   0,   0,
         0,    1,   0,   0,
         0,    0,   1,   0,
         0,    0,   0,   1 );
  geometry.applyMatrix(m);
  render();
}

function shearLeft() {
  console.log('Shear left triggered');
  var m = new THREE.Matrix4();
  m.set( 1, -0.1,   0,   0,
         0,    1,   0,   0,
         0,    0,   1,   0,
         0,    0,   0,   1 );
  geometry.applyMatrix(m);
  render();
}

function reset() {
  console.log('Reset triggered');
  clearInterval(rotX);
  clearInterval(rotY);
  clearInterval(rotZ);
  scene.remove(line);
  geometry.dispose();
  geometry = initialGeometry;
  // reset initial setup
  line = new THREE.LineSegments(geometry, material);
  scene.add(line);
  controls.reset();
  // render
  normalize();
  render();
}

function normalize() {
  geometry.normalize();
  var scaleFactor = 160 / geometry.boundingSphere.radius;
  geometry.scale( scaleFactor, scaleFactor, scaleFactor );
  camera.position.z = 500;
  camera.position.x = 0;
  camera.position.y = 0;
  for (i = 0; i < 11; i++)
    scaleUp();
}

function addMesh() {
  //console.log(points);
  //console.log(lines);

  // getting data from read data which stored in global variables like points and lines
  // this is lazy version.
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
  container = document.getElementById( 'container' );

  camera.position.z = 500;
  camera.position.x = 0;
  camera.position.y = 0;

  scene = new THREE.Scene();

  addMesh();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

  controls = new THREE.OrbitControls( camera, renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
  for (i = 0; i < 11; i++)
	  scaleUp();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

	camera.left   = - frustumSize * camera.aspect / 2;
	camera.right  =   frustumSize * camera.aspect / 2;
	camera.top    =   frustumSize / 2;
	camera.bottom = - frustumSize / 2;
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  renderer.render( scene, camera );
}
