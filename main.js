var img = "";
var status = "";
var object = [];

function preload(){
  img = loadImage('dog_cat.jpg')
}

function setup(){
  canvas = createCanvas(640,420)
  canvas.center()
  objectDetector = ml5.objectDetector('cocossd',modelLoaded)
}

function modelLoaded(){
  console.log("modelo carregado")
  status = true
  objectDetector.detect(img,gotResult)
}

function gotResult(error,results){
  if(error){
    console.error(error)
  }
  else{
    console.log(results)
    object = results;
  }
}

function draw(){
  image(img,0,0,640,420)

  if(status !=""){
    for(var i =0; i<object.length ; i++){
      document.getElementById("status").innerHTML = "status: objeto detectado"
      fill("#ff0000");
      percent = floor(object[i].confidence*100)
      text(object[i].label+" "+percent+"%",object[i].x,object[i].y)
      noFill()
      stroke("#ff0000")
      rect(object[i].x,object[i].y,object[i].width,object[i].height)
    }
  }
}