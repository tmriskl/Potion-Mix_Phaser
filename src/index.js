import 'phaser';
import MenuScene from './MenuScene.js';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1000,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  //Loading the assets
    this.load.image('potion1', 'assets/potion1.png');
    this.load.image('potion2', 'assets/potion2.png');
    this.load.image('potion3', 'assets/potion3.png');
    this.load.image('potion4', 'assets/potion4.png');
    this.load.image('Spin_Button', 'assets/button_spin.png');
    this.load.image('Stop_Button', 'assets/button_stop.png');
    this.load.audio('BG_music', 'assets/BG_Music.wav');
    this.load.audio('spin', 'assets/spin.wav');
    this.load.image('BG_image', 'assets/Potion_Lab.jpg');
    this.load.image('slotContainer', 'assets/slotContainer.png');
}


var buttonStatus = 0;//to different between the button actions
var potions = [[],[],[],[],[]];//array for the pictures in the slot machine
var sX = 138;     //Starting point on X graph
var sY = 140;     //Starting point on Y graph
var mX = 138.5;     //Distance multoplayer for X graph
var mY = 138.5;     //Distance multoplayer for Y graph
var mY2 = [0,1,2,10];   //Position multiplayer for row i in the screen
var spinning = [false,false,false,false,false]; //Enables a column to spin
var colNum = 5, rowNum = 4;
var currentOffset = 0;  //Offset for current position for all rows
var resaultOffset=[];   //Offset for resault position for each rows
var music = game.sound; //Sound activator
var random = new Phaser.Math.RandomDataGenerator();//random generator
var canClick = false; //boolean to make the user do a full 'click'

function create ()
{
  //Adding background image and music

    // music.play('BG_music');
    // music.loop = true;
    var background = this.add.image(500, 350, 'BG_image').setDepth(0);

  //Adding and initialising slot machine and buttons
    var slotMachine = this.add.image(395, 250, 'slotContainer').setDepth(1);
    var stopButton = this.add.image(600, 550, 'Stop_Button').setDepth(3);
    var spinButton = this.add.image(600, 550, 'Spin_Button',).setDepth(2);
    stopButton.alpha = 0;
    spinButton.alpha = 1;

    spinButton.setInteractive();


    // spinButton.on("pointerover", ()=>{
    // })

    spinButton.on("pointerout", ()=>{
      canClick=false;
    })

    spinButton.on("pointerdown", ()=>{
      canClick=true;
    })

    setResault();

    for(var i = 0;i<colNum;i++){
      for(var j = 0;j<rowNum;j++){
          potions[i][j]= this.add.image(sX+mX*i, sY+mY*mY2[(resaultOffset[i]+j)%4], 'potion'+(j+1)).setDepth(2);
      }
    }


    spinButton.on("pointerup", ()=>{
      if(canClick){
        if(buttonStatus == 0){
            // music.play('spin');
            setResault();
            spinButton.alpha = 0.5;
            buttonStatus = 3;
            for(var i = 0;i<colNum;i++){
              spinning[i] = true;
            }
            buttonStatus1();
            // game.time.events.add(Timer.SECOND * 1, buttonStatus1, this);
        }
        else if(buttonStatus == 1){
            stopButton.alpha = 1
            buttonStatus2();
        }
        else if(buttonStatus == 2){

          for(var i = 0;i<colNum;i++){
            spinning[i] = false;
          }
          stopButton.alpha = 0
          spinButton.alpha = 1;
          buttonStatus0();
            // }
        }
      }
    })



    // potions[0][0] = this.add.image(sX+mX*0, sY+mY*0, 'potion1').setDepth(2);
    // potions[0][1] = this.add.image(sX+mX*1, sY+mY*0, 'potion1').setDepth(2);
    // potions[0][2] = this.add.image(sX+mX*2, sY+mY*0, 'potion1').setDepth(2);
    // potions[0][3] = this.add.image(sX+mX*3, sY+mY*0, 'potion1').setDepth(2);
    // potions[0][4] = this.add.image(sX+mX*4, sY+mY*0, 'potion1').setDepth(2);
    //
    // potions[1][0] = this.add.image(sX+mX*0, sY+mY*1, 'potion2').setDepth(2);
    // potions[1][1] = this.add.image(sX+mX*1, sY+mY*1, 'potion2').setDepth(2);
    // potions[1][2] = this.add.image(sX+mX*2, sY+mY*1, 'potion2').setDepth(2);
    // potions[1][3] = this.add.image(sX+mX*3, sY+mY*1, 'potion2').setDepth(2);
    // potions[1][4] = this.add.image(sX+mX*4, sY+mY*1, 'potion2').setDepth(2);
    //
    // potions[2][0] = this.add.image(sX+mX*0, sY+mY*2, 'potion3').setDepth(2);
    // potions[2][1] = this.add.image(sX+mX*1, sY+mY*2, 'potion3').setDepth(2);
    // potions[2][2] = this.add.image(sX+mX*2, sY+mY*2, 'potion3').setDepth(2);
    // potions[2][3] = this.add.image(sX+mX*3, sY+mY*2, 'potion3').setDepth(2);
    // potions[2][4] = this.add.image(sX+mX*4, sY+mY*2, 'potion3').setDepth(2);
    //
    // potions[3][0] = this.add.image(sX+mX*0, sY+mY*10, 'potion4').setDepth(2);
    // potions[3][1] = this.add.image(sX+mX*1, sY+mY*10, 'potion4').setDepth(2);
    // potions[3][2] = this.add.image(sX+mX*2, sY+mY*10, 'potion4').setDepth(2);
    // potions[3][3] = this.add.image(sX+mX*3, sY+mY*10, 'potion4').setDepth(2);
    // potions[3][4] = this.add.image(sX+mX*4, sY+mY*10, 'potion4').setDepth(2);



}
function update(){
  currentOffset++;
  for(var i = 0;i<colNum;i++){
    if(spinning[i] == true){
      for(var j = 0;j<rowNum;j++){
            potions[i][j].y=sY+mY*mY2[(j+currentOffset)%rowNum];
      }
    }
    else{
      for(var j = 0;j<rowNum;j++){
            potions[i][j].y=sY+mY*mY2[(j+resaultOffset[i])%rowNum];
      }
    }
  }
}

function setResault(){
  for(var i = 0;i<colNum;i++){
     resaultOffset[i] = random.integer(0,11);
  }
}

function buttonStatus0(){
  buttonStatus = 0;
}

function buttonStatus1(){
  buttonStatus = 1;
}

function buttonStatus2(){
  buttonStatus = 2;
}
