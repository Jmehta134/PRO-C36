var dogimg,dog,happydog,database,foods,foodstock;
var feed , addfood;
var fedTime, lastFed;
var foodObj;
var namebox,dogname,button;
function preload()
{
	dogimg = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  foodstock = database.ref('food');
  foodstock.on("value",readStock);
  
  foodObj = new Food();

  //buttons
  feed = createButton("feed the Dog");
  feed.position(850,60);
  feed.mousePressed(feedDog);

  addfood = createButton("add Food");
  addfood.position(950,60);
  addfood.mousePressed(addFood);
  //naming input
  namingbox = createInput("Name this Dog");
  namingbox.position(1070,450);
  button = createButton("done");
  button.position(1070,500);
  button.mousePressed(function(){
    dogname = namingbox.value();
    namingbox.hide();
    button.hide();
    var n = createElement("h2");
    n.html(dogname);
    n.position(1100,150);
  });

  //Dog
  dog = createSprite(800,height/2,50,50);
  dog.addImage(dogimg);
  dog.scale=0.3;
  
}


function draw() {  
  background(46, 139, 87);
  drawSprites();
  textSize(20);
  fill(0,0,255);
  stroke(0);
  text("food remaining :"+foods,50,100);
  database.ref('hour').on("value",function(data){
    lastFed = data.val();
  })
  if (lastFed>12){
    text("last fed : "+ lastFed%12 +"PM",350,30);
  }else if (lastFed === 12){
    text("last fed : 12 AM",350,30);
  }else{
    text("last fed : "+ lastFed+ "AM",350,30);
  }
  foodObj.display();
}
// read values from DB
function readStock(data){
  foods = data.val();
}/*
// write values in DB
function writeStock(x){
  database.ref('/').update({
    food:x-1
  })
}*/
//function to feed Dog i.e, remove food
function feedDog(){
  foodObj.updateFoodStock();
  //writeStock(foods);
  dog.addImage(happydog);
  foodObj.fedImg = true;
}
// function to add food 
function addFood(){
  database.ref('/').update({
    food:foods+1
  });
}