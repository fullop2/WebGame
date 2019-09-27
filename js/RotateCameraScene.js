class CameraRotationScene extends GScene{
  constructor(camera){
    super();
    this._camera = camera;
    var light = new THREE.PointLight( 0xcccccc, 1, 100 );
    light.position.set( 0, 3, 0 );
    this.add( light );
    light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    this.add(light);

    var geometry = new THREE.PlaneGeometry( 50, 50, 50 );
    var material = new THREE.MeshBasicMaterial( {color: 0x555555, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    plane.rotateX( - Math.PI / 2);
    plane.position.set(0,0,0);
    this.add( plane );

    var vector = new THREE.Vector3(3,0,1);
    loadModel('rock','./models/detail_rocks.glb',this,vector);
    vector = new THREE.Vector3(3,0,3);
    loadModel('rock','./models/detail_rocks.glb',this,vector);

    this.add(new Shooter(this._camera));

    for(let i = -10; i < 10; ++i){
      for(let j = -10; j < 10; ++j){
        let a = Math.floor(Math.random()*10);
        if(a % 2 == 0)
          loadModel('rock','./models/snow_tile_tree.glb',this,new THREE.Vector3(i,0,j));
        else {
            loadModel('rock','./models/towerRound_sampleA.glb',this,new THREE.Vector3(i,0,j));
        }
      }
    }
    const g = new THREE.SphereGeometry(0.1,256,256);
    const m = new THREE.MeshBasicMaterial({color:0xffff00});
    const newBall = new THREE.Mesh(g,m);
    newBall.position.set(1,1,1);
    this.add(newBall);

  }
}

class RotateCamera extends THREE.PerspectiveCamera{
  constructor(fov,aspect,minDistance,maxDistance){
    super(fov,aspect,minDistance,maxDistance);
    this._deg = 0;
    this._distance = 3;
    this._height = 5;
  }
  update(){
    if(this._deg > 2*Math.PI){
      this._deg = 0;
    }
    else{
      this._deg += 0.01;
    }
    if(isKeyDown['87']){
      this._height += 0.1;
    }
    if(isKeyDown['83']){
      this._height -= 0.1;
    }

    if(isKeyDown['38']){
      this._distance -= 0.1;
    }
    if(isKeyDown['40']){
      this._distance += 0.1;
    }
    this.position.set(2*this._distance*Math.sin(this._deg),this._height,2*this._distance*Math.cos(this._deg));
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
    this._restitution = 0.9;
  }
  update(){
    if(this.position.y + this._radius <= 0){
        if(this._vector.y > 1){
          this._vector.y = -0.9 * this._vector.y;
        }
        else {
          this._vector.y = -this._vector.y;
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
  constructor(camera,vector){
    super();
    this.position.x = this.position.y = this.position.z = 0;
    this._ball = {
      _geometry : new THREE.SphereGeometry(0.1,256,256),
      _material : new THREE.MeshBasicMaterial({color:0xffff00}),
    };
    this._vector = vector;
    this._timer = 0;
  }
  update(){
    if(isKeyDown['32'] && this._timer == 0){
      var newBall = new Ball(this._ball._geometry,this._ball._material,this.position, -0.1, this._vector );
      GameBuilder.scene.add(newBall);
      this._timer = 30;
    }
    else if(this._timer > 0){
      this._timer--;
    }
  }
}
