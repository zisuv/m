var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score=0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  stone_Img = loadImage("stone.png");
  bananaImage = loadImage("banana.png");
  over = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;



  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  FoodGroup = createGroup();   
  
}

function draw() { 
  background(0);

 


  if(keyDown("space")&& player.y >= 120) {
    player.velocityY = -12;
 }
 


  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space")&&player.y>=235) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }

  if( obstacleGroup.isTouching(player)) {
    player.scale=0.05
    obstacleGroup.destroyEach();
    score=0;
    gameState===END;
  }

  if(gameState===END){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
  }


  if(FoodGroup.isTouching(player)){
    score=score+2;
    player.scale = 0.2;
    FoodGroup.destroyEach();
    }
  

  spawnFood();
  spawnObstacles();

  drawSprites();
  textSize = 20;
  stroke("white");
  fill("white");
  text("Score: " + score, 150, 50);
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth+1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 150 === 0){
    var stone = createSprite(700,250,40,10);
    stone.y = random(300,320);
    stone.addImage(stone_Img);
    stone.scale = 0.2;
    stone.velocityX = -4;

    stone.lifetime = 300;
    player.depth = stone.depth+1;
    obstacleGroup.add(stone);
  }
}