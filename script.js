
let doodlerX,doodlerY;
let is_going_left = false;
let is_going_right = false;
let doodler_img;
let platform_img;
let board_png;
let platforms=[];
numberfPlatforms=5;
let is_jumping=false;
let velocity=0;
let gravity=0.9;
let ground=300;


// loading the images
function preload() { 
    doodler_img = loadImage('./images/business left look.png');
    platform_img=loadImage("./images/platform.png")
    board_png=loadImage("./images/board.png")

  }
  
// function setup 
function setup() {
    createCanvas(600,400);
    doodlerX=400;
    doodlerY=height-100;

    for (let i=0; i<=5;i++)
platforms.push(new Platform(i*(height/numberfPlatforms))); //I want to generate multiple platforms here
   
  }

//class
  class Platform{
      constructor(y){
        this.x=Math.round(Math.random()*(width-85));
        this.y=y;
      }

      show(){
        image(platform_img,this.x,this.y,85,20);
      }
  }
//drawinng my beatiful doodler
function draw(){
    image(board_png,0,0,width,height)
    moveDoodler();

  //calling my platforms to show up
  for(let platform of platforms){
        platform.show();
   }

  // ✅ Collision detectionstars here
  let doodlerBottom = doodlerY + 60;
  let platformTop = platform.y;
  let platformBottom = platform.y + 20;
  let doodlerCenterX = doodlerX + 30;

  if (
    doodlerBottom >= platformTop &&     // Doodler is touching top of platform
    doodlerBottom <= platformBottom &&  // Not too far below
    doodlerCenterX >= platform.x &&     // X position overlaps
    doodlerCenterX <= platform.x + 85 &&
    velocity > 0                        // Only when falling
  ) {
    is_jumping = true;
    velocity = -15;  // Bounce up
  }
}


// collision ends here
    if(is_jumping){
      velocity=velocity+gravity;
      doodlerY=doodlerY+velocity;  
    }

    if(doodlerY>=ground){
        velocity=0;
        doodlerY=ground;
        is_jumping=false;
    }

 //  here I want to keep doodler on canvas
  doodlerX = constrain(doodlerX, 0, width - 80);
  doodlerY = constrain(doodlerY, 0, height - 80);
   image(doodler_img,doodlerX,doodlerY,60,60);
   
  


    // what happens when I press the key here
    function keyPressed(e) {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        is_going_right = true;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        is_going_left = true;
      }
      if (e.code === "ArrowUp") {
        jump();
      }
    }

        // what happens when I release the key here
    function keyReleased(e) {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        is_going_right = false;
      }
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        is_going_left = false;
      }

      // move doodle jump function
    }
    function moveDoodler() {
      if (is_going_left) {
        doodlerX -= 5;
      }
      if (is_going_right) {
        doodlerX += 5;
      }
    }
        
  function jump(){
  
     if (!is_jumping){
        velocity=-15;
        is_jumping=true;
     }
       
    }