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
};

const GameBuilder = {
  _container : null,
  _scene : null,
  _renderer : null,
  _loader :  new THREE.GLTFLoader(),
  _clock : new THREE.Clock(),
  get scene() {
    return this._scene;
  },
  setScene(scene){
    this._scene = null;
    this._scene = scene;
  },
  get renderer() {
    return this._renderer;
  },
  setRenderer(renderer){
    this._renderer = renderer;
  },
  get loader(){
    return this._loader;
  },
  get clock(){
    return this._clock;
  },
  get container(){
    return this._container;
  },
  setContainer(container){
    this._container = container;
  }
};

const SceneManager = {
  _mainScene : null,
  _scenes : [],

  get mainScene(){
    return this._mainScene;
  },
  addScene(scene){
    this._scenes.push(scene);
  }
};

class GCamera extends THREE.PerspectiveCamera{
  constructor(fov,aspect,minDistance,maxDistance){
    super(fov,aspect,minDistance,maxDistance);

  }

  update(deltaTime){
    return true;
  }
}

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
    return true;
  }
}

class GScene extends THREE.Scene{
  constructor(camera){
    super();
    this._objects = [];
    this._camera = camera;
    this._terrain = [];
  }
  get camera(){
    return this._camera;
  }
  update(deltaTime){
    for(let i in this._objects){
      let object = this._objects[i];
      if(!object.update(deltaTime)){
        this.remove(object);
        this._objects.splice(i,1);
    }
    }
    if(this._camera != null)
      this._camera.update(deltaTime);
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

function initGame(){

  GameBuilder.setContainer(document.getElementById("game"));
  const newScene = new CameraRotationScene();
  GameBuilder.setScene(newScene);
  GameBuilder.setRenderer(new THREE.WebGLRenderer({antialias:true}));
  GameBuilder.renderer.setSize(800,600);
  GameBuilder.renderer.setClearColor (0x999999, 1);
  GameBuilder.camera = new RotateCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  GameBuilder.clock.start();
  loop();
}

function loadResources(){
      const prom = [
        loadModelPromise('./models/detail_rocks.glb'),
        loadModelPromise('./models/snow_tile_tree.glb'),
        loadModelPromise('./models/towerRound_sampleA.glb'),
        loadModelPromise('./models/tile_dirt.glb')];

      Promise.all(prom)
      .then((values)=>{
        ResourceManager.setModel('rock', values[0]);
        ResourceManager.setModel('tree',values[1]);
        ResourceManager.setModel('sampleA',values[2]);
        ResourceManager.setModel('dirt',values[3]);
        initGame();
        GameBuilder.container.appendChild(GameBuilder.renderer.domElement);
      })
      .catch(()=>{
        console.log('error from promise');
      });
}

function loop(){
  GameBuilder.scene.update(GameBuilder.clock.getDelta());
  GameBuilder.renderer.render(GameBuilder.scene,GameBuilder.scene.camera);
  requestAnimationFrame(loop);
}

function loadModelPromise(dir){
  return new Promise(resolve=>{
      GameBuilder.loader.load(
        dir,
        (gltf)=>{
          resolve(gltf.scene);
        },
        (xhr)=>{
          console.log((xhr.loaded / xhr.total*100)+"% loaded");
        },
        (error)=>{
          console.log('An error happened : ' + error);
          reject(new Object3D());
        }

      );
  });
}

function loadModelPromise(dir){
  return new Promise(resolve=>{
      GameBuilder.loader.load(
        dir,
        (gltf)=>{
          resolve(gltf.scene);
        },
        (xhr)=>{
          console.log((xhr.loaded / xhr.total*100)+"% loaded");
        },
        (error)=>{
          console.log('An error happened : ' + error);
        }
      );
  });
}


/*
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
}*/
