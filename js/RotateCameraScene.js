
class CameraRotationScene extends GScene{
  constructor(camera){
    super();
    this._camera = camera;
    var light = new THREE.PointLight( 0xcccccc, 1, 100 );
    light.position.set( 0, 3, 0 );
    this.add( light );

    var geometry = new THREE.PlaneGeometry( 50, 50, 50 );
    var material = new THREE.MeshBasicMaterial( {color: 0x555555, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX( - Math.PI / 2);
    plane.position.set(0,0,0);
    this.add( plane );

    loadModel('./models/detail_rocks.glb',this);

    this.add(new Shooter(this._camera));
  }
}

class RotateCamera extends THREE.PerspectiveCamera{
  constructor(fov,aspect,minDistance,maxDistance){
    super(fov,aspect,minDistance,maxDistance);
    this._deg = 0;
    this._distance = 3;
  }
  update(){

    if(this._deg >= 2*Math.PI){
      this._deg = 0;
    } else{
      this._deg += 0.01;
    }
    if(isKeyDown['38']){
      this._distance -= 0.01;
    }
    if(isKeyDown['40']){
      this._distance += 0.01;
    }
    this.position.set(this._distance*Math.sin(this._deg),0.7,this._distance*Math.cos(this._deg));
    this.lookAt(0,0,0);
  }
}

class Ball extends GObject{
  constructor(geometry, material){
    super(geometry,material);
    this._limitTime = 100;
  }
  update(){
    return (this._limitTime-- > 0);
  }
}
class Shooter extends GObject {
  constructor(camera){
    super();
    this._camera = camera;
    this._ball = {
      _geometry : new THREE.SphereGeometry(5,32,32),
      _material : new THREE.MeshBasicMaterial({color:0xffff00}),
    };
  }
  update(){
    if(isKeyDown['32']){
      var newBall = new Ball(this._ball._geometry,this._ball._material);
      var vector = new THREE.Vector3();
      this._camera.getWorldDirection(vector);
      newBall.position.x = this._camera.position.x + vector.x;
      newBall.position.y = this._camera.position.y + vector.y;
      newBall.position.z = this._camera.position.z + vector.z;
      console.log(newBall.position);
      GameBuilder.scene.add(newBall);
    }
  }
}
