var camera, scene, renderer, stats, materials = [], parameters;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );

    var geometry = new THREE.BufferGeometry();
    var vertices = [];

    var textureLoader = new THREE.TextureLoader();

    var sprite1 = textureLoader.load( 'textures/snowflake1.png' );
    var sprite2 = textureLoader.load( 'textures/snowflake2.png' );
    var sprite3 = textureLoader.load( 'textures/snowflake3.png' );
    var sprite4 = textureLoader.load( 'textures/snowflake4.png' );
    var sprite5 = textureLoader.load( 'textures/snowflake5.png' );

    for ( var i = 0; i < 10000; i ++ ) {

        var x = Math.random() * 2000 - 1000;
        var y = Math.random() * 2000 - 1000;
        var z = Math.random() * 2000 - 1000;

        vertices.push( x, y, z );

    }

    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

    parameters = [
        [[ 1.0, 0.2, 0.5 ], sprite2, 10 ],
        [[ 0.95, 0.1, 0.5 ], sprite3, 10 ],
        [[ 0.90, 0.05, 0.5 ], sprite1, 10 ],
        [[ 0.85, 0, 0.5 ], sprite5, 10 ],
        [[ 0.80, 0, 0.5 ], sprite4, 10 ]
    ];
    //生成了4种材质`
    for ( var i = 0; i < parameters.length; i ++ ) {

        var color = parameters[ i ][ 0 ];
        var sprite = parameters[ i ][ 1 ];
        var size = parameters[ i ][ 2 ];

        materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
        materials[ i ].color.setHSL( color[ 0 ], color[ 1 ], color[ 2 ] );

        var particles = new THREE.Points( geometry, materials[ i ] );

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;

        scene.add( particles );

    }

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
   var canvs = document.body.appendChild( renderer.domElement );
        canvs.style.position = "absolute";
        canvs.style.top = "opx";
        canvs.style.left = "opx";

    canvs.style.zIndex = -10+"";

    //

    stats = new Stats();
    //document.body.appendChild( stats.dom );

    //

    // var gui = new GUI();



    // gui.open();

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    //

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

//

function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

}

function render() {

    var time = Date.now() * 0.00005;

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

    camera.lookAt( scene.position );

    for ( var i = 0; i < scene.children.length; i ++ ) {

        var object = scene.children[ i ];

        if ( object instanceof THREE.Points ) {

            object.rotation.y = time * ( i < 4 ? i + 1 : - ( i + 1 ) );

        }

    }

    for ( var i = 0; i < materials.length; i ++ ) {

        var color = parameters[ i ][ 0 ];

        var h = ( 360 * ( color[ 0 ] + time ) % 360 ) / 360;
        materials[ i ].color.setHSL( h, color[ 1 ], color[ 2 ] );

    }

    renderer.render( scene, camera );

}