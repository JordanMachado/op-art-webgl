'use strict';

import THREE from 'three';

export default class Particles extends THREE.Object3D {
  constructor() {
    super();

    this.geom = new THREE.BoxGeometry(10, 10, 10);
    this.mat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.add(this.mesh);


    var particles = 500000;

				var geometry = new THREE.BufferGeometry();

				var positions = new Float32Array( particles * 3 );
				var colors = new Float32Array( particles * 3 );

				var color = new THREE.Color();

				var n = 1000, n2 = n / 2; // particles spread in the cube

				for ( var i = 0; i < positions.length; i += 3 ) {

					// positions

					var x = Math.random() * n - n2;
					var y = Math.random() * n - n2;
					var z = Math.random() * n - n2;

					positions[ i ]     = x;
					positions[ i + 1 ] = y;
					positions[ i + 2 ] = z;

					// colors

					var vx = ( x / n ) + 0.5;
					var vy = ( y / n ) + 0.5;
					var vz = ( z / n ) + 0.5;

					color.setRGB( vx, vy, vz );

					colors[ i ]     = color.r;
					colors[ i + 1 ] = color.g;
					colors[ i + 2 ] = color.b;

				}

				geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
				geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

				geometry.computeBoundingSphere();

				//

				var material = new THREE.PointsMaterial( { size: 15, vertexColors: THREE.VertexColors } );

				particleSystem = new THREE.Points( geometry, material );
				scene.add( particleSystem );


  }

  update() {

  }
}
