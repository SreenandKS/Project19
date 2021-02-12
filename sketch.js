var monkey,banana,obstacle,bananaImg,obstacleImg,obstacleGroup,backGround,score,foodGroup,ground;

function preload(){
  backGroundImg = loadImage("jungle.jpg");
  
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
  
}

function setup() {
  createCanvas(400, 400);
  backGround = createSprite(200,200,200,200);
  backGround.addImage("background",backGroundImg);
  backGround.velocityX = -6;
  backGround.scale = 1;
  
  ground = createSprite(10,390,400,10)
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  monkey = createSprite(100,350,10,10);
  monkey.addAnimation("monkey",monkeyImg);
  monkey.scale = 0.1;
}

function draw() {
  background(220);
  
  monkey.collide(ground); 
  if (backGround.x<0){
    backGround.x = backGround.width/2;
  }
  
  if (keyDown("space")&&monkey.y>349){
    monkey.velocityY = -20;  
  }
  monkey.velocityY = monkey.velocityY+0.8;
  if (foodGroup.isTouching(monkey)){
    score = score+2;
    foodGroup.destroyEach();
  }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    default:break;
      
  }
  
  if (obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.1;
    score = 0;
  }
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  
  fill("white");
  textSize(20);
  text("Score : "+ score,250,50);
}

function spawnFood(){
  if (frameCount%80===0){
    banana = createSprite(400,random(100,300,10,10));
    banana.addImage("banana",bananaImg);
    banana.scale = 0.03;
    banana.velocityX = -6;
    banana.lifetime = 67;
    foodGroup.add(banana);
  }
  
  
}

function spawnObstacles(){
  if (frameCount%150===0){
    obstacle = createSprite(400,330,10,10);
    obstacle.addImage("obstacle",obstacleImg);
    obstacle.scale = 0.25;
    obstacle.velocityX = -10;
    obstacle.lifetime = 40;
    obstacleGroup.add(obstacle);
  }
}