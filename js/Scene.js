function Scene1(){

  this.init =()=>{
      var light = new THREE.PointLight( 0xcccccc, 1, 100 );
      light.position.set( 0, 3, 0 );
      light.castShadow = true;
      console.log(this.add);
      this.add( light );
      this._camera.position.y = 1;
  /*
      var geometry = new THREE.PlaneGeometry( 5, 20, 32 );
      var material = new THREE.MeshBasicMaterial( {color: 0x555555, side: THREE.DoubleSide} );
      var plane = new THREE.Mesh( geometry, material );
      plane.rotateX( - Math.PI / 2);
      plane.receiveShadow = true;
      plane.castShadow = false;
      scene.add( plane );
  */
      var obj = modelLoader('./models/detail_rocks.glb');
      console.log('obj is ');
      console.log(obj);
    }
    this.add=
}
Scene1.prototype = Object.create(THREE.Scene.prototype);
Scene1.prototype.constructor = Scene1;
