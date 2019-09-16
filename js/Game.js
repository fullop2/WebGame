var isKeyDown = [];
var isMouseDown =[];

$(document).keydown(function(e){ // 어떤 키가 눌렸는지 저장
  isKeyDown[e.which.toString()] = true;
});
$(document).keyup(function(e){ // 눌렸던 키를 해제
  isKeyDown[e.which.toString()] = false;
});

function Game(){

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    this._renderer = new THREE.WebGLRenderer({antialias:true});
    this._renderer.setSize(window.innerWidth,window.innerHeight);
    this._renderer.setClearColor (0xcccccc, 1);

    this._loader= new THREE.GLTFLoader();


    this.modelLoader = (dir)=>{
      var obj = null;
      this._loader.load(
        dir,
        (gltf)=>{
          gltf.animations;
          gltf.scene;
          gltf.scenes;
          gltf.cameras;
          gltf.asset;
          obj = gltf.scene;
          this._scene._objects.push(obj);
          this._scene.add(obj);
        },
        (xhr)=>{
          console.log((xhr.loaded / xhr.total*100)+"% loaded");
        },
        (error)=>{
          console.log('An error happened');
        }
      );
      console.log(this.obj);
      return this.obj;
    }
}
