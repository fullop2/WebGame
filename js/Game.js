var isKeyDown = [];
var isMouseDown =[];

$(document).keydown(function(e){ // 어떤 키가 눌렸는지 저장
  isKeyDown[e.which.toString()] = true;
});
$(document).keyup(function(e){ // 눌렸던 키를 해제
  isKeyDown[e.which.toString()] = false;
});

const GameBuilder = {
  _scene : null,
  _camera : null,
  _renderer : null,
  _loader :  new THREE.GLTFLoader(),
  get scene() {
    return this._scene;
  },
  setScene(scene){
    this._scene = scene;
  },
  get camera() {
    return this._camera;
  },
  setCamera(camera){
    this._camera = camera;
  },
  get renderer() {
    return this._renderer;
  },
  get loader(){
    return this._loader;
  }
};

class GObject extends THREE.Object3D{
  constructor(){
    super();
  }
  update(){

  }
}

class GScene extends THREE.Scene{
  constructor(){
    super();
    this._objects = [];
    this._camera = null;
  }
  update(){
    this._objects.forEach(object=>{
      object.update();
    });
    this._camera.update();
  }
  add(object){
    if(object instanceof THREE.Object3D){
      super.add(object);
      if(object instanceof GObject){
        this._objects.push(object);
      }
    } else{
      console.error("object is not instance of THREE.Object3D!");
    }
  }
}

function initGame(camera,scene){
  GameBuilder._renderer = new THREE.WebGLRenderer({antialias:true});
  GameBuilder._renderer.setSize(window.innerWidth*0.9,window.innerHeight*0.9);
  GameBuilder._renderer.setClearColor (0x999999, 1);
  GameBuilder._camera = camera;
  GameBuilder._scene = scene;
}

function loop(){
  GameBuilder.scene.update();
  GameBuilder.renderer.render(GameBuilder.scene,GameBuilder.camera);
  requestAnimationFrame(loop);
}

function loadModel(dir,scene){
  GameBuilder.loader.load(
    dir,
    (gltf)=>{
      scene.add(gltf.scene);
    },
    (xhr)=>{
      console.log((xhr.loaded / xhr.total*100)+"% loaded");
    },
    (error)=>{
      console.log('An error happened : ' + error);
    }
  );
}
