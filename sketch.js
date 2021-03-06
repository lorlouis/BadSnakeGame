const pixelSize =16;
const canvasSizeX =480;
const canvasSizeY =480;
var topScores = [0,0,0,0,0];
var xpos =0;
var ypos =0;
var snekLenght =4;
var snek = [(canvasSizeX/pixelSize)/2,(canvasSizeY/pixelSize)/2];
var fieldx = [];
var fieldy = [];
var directionx=0;
var directiony=-1;

var berryX;
var berryY;

function lose()
{
  if(document.cookie)
  {
    topScores=JSON.parse(document.cookie);
	 
  }
  topScores.push((snekLenght-4)*10);
  topScores = topScores.sort(function(a, b){return b - a});
  topScores.length=5;
  for(i=0;i<5;i++)
    {
      document.getElementById(i.toString()).innerHTML=topScores[i];
    }
  document.cookie=JSON.stringify(topScores);
  xpos =0;
  ypos =0;
  snekLenght =4;
  snek = [(canvasSizeX/pixelSize)/2,(canvasSizeY/pixelSize)/2];
  directionx=0;
  directiony=-1;

  berryX;
  berryY;
  setup();
}

function setup()
{
  var can = createCanvas(canvasSizeX+1,canvasSizeY+1);
  //center the canvas
  can.position((windowWidth-width)/2,(windowHeight-height)/2);
  fill(255);
  stroke(51);
  
  for(i=0;i<canvasSizeY/pixelSize;i++)
  {
    for(j=0;j<canvasSizeX/pixelSize;j++)
    {
      rect(pixelSize*j,pixelSize*i,pixelSize,pixelSize);
    }
  }
  newBerry();
  frameRate(24);
}
function keyPressed()
{
  if(keyCode === RIGHT_ARROW && directionx !=-1)
    {
      directionx = 1;
      directiony =0;
    }
  else if(keyCode === LEFT_ARROW  && directionx !=1)
    {
      directionx =-1;
      directiony =0;
    }
  else if(keyCode === UP_ARROW  && directiony !=1)
    {
      directiony =-1;
      directionx=0;
    }
  else if(keyCode === DOWN_ARROW  && directiony !=-1)
    {
      directiony =1;
      directionx=0;
    }
}
function newBerry()
{
  //make sure the berry dosent spawn on the snek
  do
  {
    berryX =Math.floor(Math.random() * canvasSizeX/pixelSize);
    berryY =Math.floor(Math.random() * canvasSizeY/pixelSize);
    var isOnTheSnek = false;
    for(i=0;i<snekLenght*2;i+=2)
      {
        if(snek[i]==berryX && snek[i+1]==berryY)
          {
            isOnTheSnek = true;
            break;
          }
      }
  }while(isOnTheSnek)
    
  fill(60);
  rect(berryX*pixelSize,berryY*pixelSize,pixelSize,pixelSize);
}

function draw()
{ 
  document.getElementById("score").innerHTML=(snekLenght-4)*10;
  //draw the snek
  fill(51);
  for(i=0;i<snekLenght-1;i+=2)
    {
      rect(pixelSize*snek[i],pixelSize*snek[i+1],pixelSize,pixelSize);
    }
  //erase the tail of the snek
  fill(255); rect(pixelSize*snek[2*snekLenght],pixelSize*snek[2*snekLenght+1],pixelSize,pixelSize);
  
  //only move on 1/4 of the frames
  if(frameCount%4==0 && focused)
    {
      snek.unshift(snek[0]+directionx,snek[1]+directiony);
      snek.length=snekLenght*2+2;
    }
  
  //losing conditions
  if(snek[0]<0 || snek[0] >= canvasSizeX/pixelSize || snek[1]<0 || snek[1] >= canvasSizeY/pixelSize)
    {
      lose();
    }
  //detect if the snek is biting its tail
  for(i=2;i<snekLenght*2;i+=2)
    {
      if(snek[0]==snek[i] && snek[1] == snek[i+1]) 
      {
        lose();
      }
    }
  
  //detect if the snake is eating a berry
  if(snek[0] == berryX && snek[1] == berryY)
    {
      snekLenght++;
      newBerry();
    }
}
