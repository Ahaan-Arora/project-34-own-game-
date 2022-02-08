
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bg

var monsterimg,monster

var projectileimg,projectile

var engine,world
var peopleimgfell
var people,peopleimg
function preload()
{
  bg = loadImage('backround.png')

  monsterimg = loadImage('monster.png')
  
  projectileimg = loadImage('projectile.png')

peopleimg = loadAnimation('r1.png','r2.png','r3.png','r4.png','r5.png')
peopleimgfell=loadAnimation('r1fell.png')
}
function setup() {
  createCanvas(1200,600);
  
  engine = Engine.create();
  world = engine.world;
  
monster=Bodies.rectangle(800,300,300,400,{isStatic:true})
World.add(world,monster)
projectile=Bodies.circle(770,400,100,{isStatic:true,frictionAir:0.05,})
World.add(world,projectile)
rectMode(CENTER)
ellipseMode(RADIUS)

people=createSprite(50,400)
people.addAnimation("peoplefell",peopleimgfell)
people.addAnimation("people",peopleimg)
people.changeAnimation("people",peopleimg)
people.velocityX=2.5
people.scale=0.5
}


function draw() 
{
  background(bg);
  Engine.update(engine)
 image(monsterimg,monster.position.x,monster.position.y,300,400)
 image(projectileimg,projectile.position.x,projectile.position.y,100,100)
 if (people.x>=400){

  people.velocityX=-2.5
 }

 if (people.x<=50){

  people.velocityX=2.5
 }
 if(collide(projectile,people)===true){
  people.y=460
  people.changeAnimation("peoplefell",peopleimgfell)
  people.velocityX=0

 }
 drawSprites()
}



function keyPressed(){

  if(keyCode===LEFT_ARROW){

    Matter.Body.applyForce(
      projectile,{x:0,y:0},{x:-0.75,y:-1})
     Matter.Body.setStatic(projectile,false)
  }
}

function collide(body,sprite){

if(body!==null){

  var d=dist(body.position.x, body.position.y,sprite.position.x,sprite.position.y)
if (d<=100){

  return true
}
else{

  return false
}
}

}