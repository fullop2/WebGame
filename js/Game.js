var isKeyDown = [];
var isMouseDown =[];

function Game(width,height){
    this._canvas = document.createElement("canvas");
    this._context = this._canvas.getContext("2d");
    this._canvas.width = width;
    this._canvas.height= height;
    this._canvas.style="border : 1px solid black";
    this._interval = 10;

    
    
    this.addScene = function(scene){
        if(scene instanceof Scene){
            this._scene = scene;
        } else{
            console.log("Invalid Scene");
        }
    }
    
    this.start = ()=>{
        this._scene.init();
        setInterval(()=>{
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._scene.update();
        this._scene.draw(this._context);
        }, this._interval);
        this._canvas.id = 'game';
        $(document).ready(()=>{document.body.appendChild(this._canvas);});
    };
}

function Player(x,y,imgDir){
    this._x = x;
    this._y = y;
    this._image = new Image(10,10);
    this._image.src = imgDir;
    
    Player.prototype.update = (deltaTime)=>{
        var speed = deltaTime/5;
        if(isKeyDown[37]) this._x-=speed;
        if(isKeyDown[38]) this._y-=speed;
        if(isKeyDown[39]) this._x+=speed;
        if(isKeyDown[40]) this._y+=speed;
    }
}
Player.prototype = new GameObject(0,0,new Image(10,10));
Player.prototype.constructor = Player;

function GameObject(x,y,image){
    this._x = x;
    this._y = y;
    this._image = image;
    
    this.move = (x,y)=>{
        this._x = x;
        this._y = y;
    }
    this.moveRelative = (x,y)=>{
        this._x += x;
        this._y += y;
    }
    this.update = (deltaTime)=>{
    }
}

function typeCheckAndExecuteFunction(func, object, type, errMsg){
    if(object instanceof type){
        func(object);
    } else{
        console.log(errMsg);
    }
}

function Scene(){
    
    this._gameObjects = new Array();    
    this._lastUpdate = Date.now();
    
    this.init;
    
    this.addObject = (object)=>{
        typeCheckAndExecuteFunction(
            (object)=>{this._gameObjects.push(object);}, object,GameObject,"Invalid Object");
    }
    this.removeObject = (object)=>{
        typeCheckAndExecuteFunction(
            (object)=>{this._gameObjects.pop(object);}, object,GameObject,"Invalid Object");};
    
    this.draw = (context)=>{
        for(var object in this._gameObjects){
            var tmp = this._gameObjects[object];
            context.drawImage(tmp._image,tmp._x,tmp._y);
        }
    }
    this.update = ()=>{
        var now = Date.now();
        for(var object in this._gameObjects){            
            this._gameObjects[object].update(now - this._lastUpdate);  
        }
        this._lastUpdate = now;
        
    }
}

