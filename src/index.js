import 'phaser';
import MenuScene from './MenuScene.js'

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
    this.load.image('BG_image', 'assets/Potion_Lab.jpg');
    this.load.image('slotContainer', 'assets/slotContainer.png');
}


var buttonStatus = 0;
var potions = [[],[],[],[],[]];
var sX = 138; //starting point on X graph
var sY = 140; //starting point on Y graph
var mX = 138.5; //distance multoplayer for X graph
var mY = 138.5; //distance multoplayer for Y graph
var mY2 = [0,1,2,10];
var spinning = [false,false,false,false,false];
var colNum = 5, rowNum = 4;
var currentCol = 0;
var currentOffset = 0;

function create ()
{
  //Adding background image and music
    //var music = game.sound.play('BG_music');
    var background = this.add.image(500, 350, 'BG_image').setDepth(0);

  //Adding and initialising slot machine and buttons
    var slot_Machine = this.add.image(395, 250, 'slotContainer').setDepth(1);
    var stop_Button = this.add.image(600, 550, 'Stop_Button').setDepth(3);
    var spin_Button = this.add.image(600, 550, 'Spin_Button',).setDepth(2);
    stop_Button.alpha = 0;
    spin_Button.alpha = 1;

    spin_Button.setInteractive();


    // spin_Button.on("pointerover", ()=>{
    //   spin_Button.alpha = 1
    // })
    //
    // spin_Button.on("pointerout", ()=>{
    //   spin_Button.alpha = 0.5
    // })

    for(var i = 0;i<colNum;i++){
      for(var j = 0;j<rowNum;j++){
          potions[i][j]= this.add.image(sX+mX*i, sY+mY*mY2[j], 'potion'+(j+1)).setDepth(2);
      }
    }

    spin_Button.on("pointerup", ()=>{
      if(buttonStatus == 0){
          spin_Button.alpha = 0.5;
          buttonStatus = 3;
          // for(var i = 0;i<colNum;i++){
          //     for(var j = 0;j<rowNum;j++){
          //        potions[i][j].body.velocity.x=sY+mY*mY2[(j+1)%4];
          //     }
          // }
          buttonStatus1();
          // game.time.events.add(Timer.SECOND * 1, buttonStatus1, this);
      }
      else if(buttonStatus == 1){
          stop_Button.alpha = 1
          currentCol=0;
          buttonStatus2();
      }
      else if(buttonStatus == 2){
          spinning[currentCol] = false;
          currentCol++;
          if(currentCol >= colNum){
            stop_Button.alpha = 0
            spin_Button.alpha = 1;
            buttonStatus0();
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
