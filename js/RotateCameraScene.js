
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

    var vector = new THREE.Vector3(3,0,1);
    loadModel('./models/detail_rocks.glb',this,vector);
    vector = new THREE.Vector3(3,0,3);
    loadModel('./models/detail_rocks.glb',this,vector);

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


    if(isKeyDown['38']){
      this._distance -= 0.01;
    }
    if(isKeyDown['40']){
      this._distance += 0.01;
    }
    this.position.set(5*this._distance*Math.sin(this._deg),20,5*this._distance*Math.cos(this._deg));
    this.lookAt(0,0,0);
  }
}
class Ball extends GMesh{
  constructor(geometry, material,pos, r, vector){
    super(geometry,material);
    this.position.set(pos.x,pos.y,pos.z);

    this._limitTime = 100;
    this._vector = vector.multiplyScalar(0.01);
    this._radius = r;
  }
  update(){
    if(this.position.y + this._radius <= 0){
      if(0 <= this._vector.y && this._vector.y < 0.001){
        this._vector.y = 5;
      }
      else{
        this._vector.y = -0.9 * this._vector.y;
      }
    }
    else{
      this._vector.y -= 0.01;
    }
    this.position.add(this._vector);

    //return (this._limitTime-- > 0);
  }
}


class Shooter extends GObject {
  constructor(camera){
    super();
    this.position.x = this.position.y = this.position.z = 0;
    this._camera = camera;
    this._ball = {
      _geometry : new THREE.SphereGeometry(0.1,256,256),
      _material : new THREE.MeshBasicMaterial({color:0xffff00}),
    };
    this._timer = 0;
  }
  update(){
    if(isKeyDown['32'] && this._timer == 0){
      var vector = new THREE.Vector3();
      this._camera.getWorldDirection(vector);
      vector.y = 1;
      vector.x += 1;
      var newBall = new Ball(this._ball._geometry,this._ball._material,this._camera.position, -5, vector );
      GameBuilder.scene.add(newBall);
      this._timer = 30;
    }
    else if(this._timer > 0){
      this._timer--;
    }
  }
}
