var isKeyDown = [];
var isMouseDown =[];

$(document).keydown(function(e){ // 어떤 키가 눌렸는지 저장
  isKeyDown[e.which.toString()] = true;
});
$(document).keyup(function(e){ // 눌렸던 키를 해제
  isKeyDown[e.which.toString()] = false;
});

const ResourceManager = {
  _geometry : [],
  _model : [],
  getGeometry(name){
    return this._geometry[name];
  },
  setGeometry(name, geometry){
    this._geometry[name] = geometry;
  },
  getModel(name){
    return this._model[name];
  },
  setModel(name,model){
    this._model[name] = model;
  }
}

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
  },

};
class GMesh extends THREE.Mesh{
  constructor(geometry,material){
    super(geometry,material);
  }
  update(){

  }
}
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
    this._terrain = [];
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
      if(object instanceof GObject || object instanceof GMesh){
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

function loadModel(name, dir,scene,vector){
  geometry = ResourceManager.getModel(name);
  if(geometry === undefined){
    GameBuilder.loader.load(
      dir,
      (gltf)=>{
        scene.add(gltf.scene);
        ResourceManager.setModel(dir,gltf.scene);
        gltf.scene.position.set(vector.x,vector.y,vector.z);
      },
      (xhr)=>{
        console.log((xhr.loaded / xhr.total*100)+"% loaded");
      },
      (error)=>{
        console.log('An error happened : ' + error);
      }
    );
  }
  else {
      const newObject = new Object3D(ResourceManager.model[name]);
      scene.add(ResourceManager.model[name]);
  }
}
