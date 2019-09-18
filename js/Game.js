var isKeyDown = [];
var isMouseDown =[];

$(document).keydown(function(e){ // 어떤 키가 눌렸는지 저장
  isKeyDown[e.which.toString()] = true;
});
$(document).keyup(function(e){ // 눌렸던 키를 해제
  isKeyDown[e.which.toString()] = false;
});

function Game(){

    this._scene = new Scene();
    this._camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    this._renderer = new THREE.WebGLRenderer({antialias:true});
    this._renderer.setSize(window.innerWidth*0.9,window.innerHeight*0.9);
    this._renderer.setClearColor (0x999999, 1);

    this.animate =()=>{
      this._scene.update();
      requestAnimationFrame(this.animate);
      this._renderer.render(this._scene,this._camera);
    }
}

function ModelLoader(){
  var _loader = new THREE.GLTFLoader();
  this.load = (dir, scene)=>{
      _loader.load(
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

}

function Scene(){
  var _objects = [];

  this.init =()=>{

      var light = new THREE.PointLight( 0xcccccc, 1, 100 );
      light.position.set( 0, 3, 0 );
      this.add( light );

      var geometry = new THREE.PlaneGeometry( 50, 50, 50 );
      var material = new THREE.MeshBasicMaterial( {color: 0x555555, side: THREE.DoubleSide} );
      var plane = new THREE.Mesh( geometry, material );
      plane.rotateX( - Math.PI / 2);
      plane.position.set(0,0,0);
      this.add( plane );

      game._camera.position.set(0.5,0.7,0.1);
      game._camera.lookAt(0,0,0);
      var vector = new THREE.Vector3();
      game._camera.getWorldDirection(vector);
      modelLoader.load('./models/detail_rocks.glb',this);
    }
    this.update=()=>{
    }
}
Scene.prototype = new THREE.Scene();
Scene.prototype.constructor = Scene;

game = new Game();
modelLoader = new ModelLoader();
