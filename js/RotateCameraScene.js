class KeyGetter extends GObject{
  constructor(key,func){
    super();
    this._key = key;
    this._func= func;
    this._timer = 60;
  }
  update(deltaTime){
    if(isKeyDown[this._key] && this._timer <= 0){
      this._func();
    }
    else if(this._timer > 0){
      this._timer--;
    }
    return true;
  }
}

function makeTestScene(){
  GameBuilder.setScene(new TestScene());
}
function makeCameraRotationScene(){
  GameBuilder.setScene(new CameraRotationScene());
}

class TestScene extends GScene{
  constructor(){
    super(new RotateCamera(75,window.innerWidth/window.innerHeight,0.1,1000));
    const light = new THREE.PointLight( 0xcccccc, 1, 100 );
    light.position.set( 0, 10, 0 );
    this.add( light );
    light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    this.add(light);

    const geometry = new THREE.PlaneGeometry( 50, 50, 50 );
    const material = new THREE.MeshBasicMaterial( {color: 0x555555, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX( - Math.PI / 2);
    plane.position.set(0,0,0);
    this.add( plane );

    this.add(new KeyGetter('13',makeCameraRotationScene));

    for(let i = -10; i < 10; ++i){
      for(let j = -10; j < 10; ++j){
        let a = Math.floor(Math.random()*10);
        if(a % 2 == 0){
          let obj = ResourceManager.getModel('dirt').clone();
          obj.position.set(i,0,j);
          this.add(obj);
        }
        else {
          let obj = ResourceManager.getModel('sampleA').clone();
          obj.position.set(i,0,j);
          this.add(obj);
        }
      }
    }

  }

}
class CameraRotationScene extends GScene{

  constructor(){
    super(new RotateCamera(75,window.innerWidth/window.innerHeight,0.1,1000));

    var light = new THREE.PointLight( 0xcccccc, 1, 100 );
    light.position.set( 0, 10, 0 );
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
    this.add(ResourceManager.getModel('rock').clone());
    vector = new THREE.Vector3(3,0,3);
    this.add(ResourceManager.getModel('rock').clone());

    this.add(new Shooter(vector));
    this.add(new KeyGetter('13',makeTestScene));

    for(let i = -10; i < 10; ++i){
      for(let j = -10; j < 10; ++j){
        let a = Math.floor(Math.random()*10);
        if(a % 2 == 0){
          let obj = ResourceManager.getModel('tree').clone();
          obj.position.set(i,0,j);
          this.add(obj);
        }
        else {
          let obj = ResourceManager.getModel('sampleA').clone();
          obj.position.set(i,0,j);
          this.add(obj);
        }
      }
    }
  }
}


class RotateCamera extends GCamera{
  constructor(fov,aspect,minDistance,maxDistance){
    super(fov,aspect,minDistance,maxDistance);
    this._deg = 0;
    this._distance = 3;
    this._height = 5;
  }
  update(deltaTime){
    /*
    if(this._deg > 2*Math.PI){
      this._deg = 0;
    }
    else{
      this._deg += 0.01;
    }
    */
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
    /*
    this.position.set(
    2*this._distance*Math.sin(this._deg),
    this._height,
    2*this._distance*Math.cos(this._deg));
    */
    this.position.set(-10,this._height,-10);
    this.lookAt(0,0,0);
  }
}
class Ball extends GMesh{
  constructor(geometry, material,pos, r, vector){
    super(geometry,material);
    this.position.set(pos.x,pos.y,pos.z);

    this._limitTime = 500;
    this._vector = vector.multiplyScalar(0.01);
    this._radius = r;
    this._restitution = 0.9;
  }
  update(deltaTime){
    if(this.position.y - this._radius <= 0){
        if(this._vector.y < -0.2){
          this._vector.y = -this._restitution * this._vector.y;
        }
        else {
          this._vector.y = -this._vector.y;
        }
    }
    else{
      this._vector.y -= 0.01;
    }
    this.position.add(this._vector);
    if(Math.abs(this.position.x) > 10 || Math.abs(this.position.z) > 10){
    }
    return (this._limitTime-- > 0);
  }
}

class Shooter extends GObject {
  constructor(vector){
    super();
    this.position.x = this.position.z = 0;
    this.position.y = 10;
    ResourceManager.setGeometry('ball',new THREE.SphereGeometry(0.1,256,256));
    this._ballMaterial = new THREE.MeshLambertMaterial({color: 0xffbbff, vertexColors: THREE.FaceColors});
    this._vector = vector;
    this._timer = 0;
  }
  update(deltaTime){
    if(isKeyDown['32'] && this._timer == 0){
      var newBall = new Ball(ResourceManager.getGeometry('ball'),this._ballMaterial,this.position, 0.1,
        new THREE.Vector3(Math.random()*10-5,Math.random()*3,Math.random()*10-5) );
      GameBuilder.scene.add(newBall);
      this._timer = 30;
    }
    else if(this._timer > 0){
      this._timer--;
    }
    return true;
  }
}
