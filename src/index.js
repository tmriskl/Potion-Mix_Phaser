import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: '',
    width: 1010,
    height: 564,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var buttonStatus = 0;//to different between the button actions
var musicButtonStatus = 0;//to different between the music button actions
var potions = [[],[],[],[],[]];//array for the pictures in the slot machine
var sX = 122;     //Starting point on X graph
var sY = 143;     //Starting point on Y graph
var mX = 138.5;     //Distance multoplayer for X graph
var mY = 138.5;     //Distance multoplayer for Y graph
var mY2 = [0,1,2,-1];   //Position multiplayer for row i in the screen
var spinning = [false,false,false,false,false]; //Enables a column to spin
var colNum = 5, rowNum = 4;
var currentOffset = 0;  //Offset for current position for all rows
var resaultOffset=[];   //Offset for resault position for each rows
var random = new Phaser.Math.RandomDataGenerator();//random generator
var canClick = false; //boolean to make the user do a full 'click'
var currentColumn = 0; //the number of the current stoping column
var music;
var spinSound;
var stopButton;
var stop1Button;
var spinButton;
var musicOnButton, musicOffButton, musicEffectsOnButton;
var timer;

function preload ()
{
  //Loading the assets
    this.load.image('potion1', 'assets/potion1.png');
    this.load.image('potion2', 'assets/potion2.png');
    this.load.image('potion3', 'assets/potion3.png');
    this.load.image('potion4', 'assets/potion4.png');
    this.load.image('Spin_Button', 'assets/button_spin.png');
    this.load.image('Stop_Button', 'assets/button_stop.png');
    this.load.image('Stop1_Button', 'assets/button_stop1.png');
    this.load.audio('BG_music', 'assets/BG_Music.wav');
    this.load.audio('spin', 'assets/spin.wav');
    this.load.image('BG_image', 'assets/BG_slotContainer2.png');
    this.load.image('sound_on', 'assets/sound_on.png');
    this.load.image('sound_off', 'assets/sound_off.png');
    this.load.image('sound_effects_on', 'assets/sound_effects_on.png');
}


function create ()
{
  //Adding background image and music
    music = game.sound.add('BG_music');
    music.play();
    music.loop = true;
    var background = this.add.image(505, 282, 'BG_image').setDepth(1);

  //Adding buttons
    stopButton = this.add.image(550, 530, 'Stop_Button').setDepth(3);
    stop1Button = this.add.image(300, 530, 'Stop1_Button').setDepth(3);
    spinButton = this.add.image(550, 530, 'Spin_Button',).setDepth(2);
    musicOffButton = this.add.image(100, 530, 'sound_off').setDepth(3);
    musicOnButton = this.add.image(100, 530, 'sound_on').setDepth(2);
    musicEffectsOnButton = this.add.image(100, 530, 'sound_effects_on').setDepth(3);


  //setting the slots
    setResault();
    for(var i = 0;i<colNum;i++){
      for(var j = 0;j<rowNum;j++){
          potions[i][j]= this.add.image(sX+mX*i, sY+mY*mY2[(resaultOffset[i]+j)%4], 'potion'+(j+1)).setDepth(0);
      }
    }

    //adding spin sound
    spinSound = game.sound.add('spin');

    //setting the buttons
    setButtons();
    spinButton.on("pointerup", ()=>{
      if(canClick){
        if(buttonStatus == 0){
            spinSound.play();
            if(musicButtonStatus == 2){
              spinSound.pause();
            }
            setResault();
            spinButton.alpha = 0.5;
            buttonStatus = 3;
            for(var i = 0;i<colNum;i++){
              spinning[i] = true;
            }
            this.time.addEvent({
                delay: 1000,
                callback: ()=>{
                  buttonStatus=1;
                },
                loop: false
            });
            this.time.addEvent({
                delay: 2000,
                callback: ()=>{
                  timer = //timer to stop slot one by one
                    this.time.addEvent({
                      delay: 1000,
                      callback: ()=>{
                        stopOne();
                      },
                      loop: true
                    });
                },
                loop: false
            });
        }
        else if(buttonStatus == 1){
            stopButton.alpha = 1;
            stop1Button.alpha = 1;
            buttonStatus=2;
            currentColumn = 0;
        }
        else if(buttonStatus == 2){
          stopAll();
        }
      }
    });

}

function update(){
  currentOffset+=21;
  for(var i = 0;i<colNum;i++){
    if(spinning[i] == true){
      for(var j = 0;j<rowNum;j++){
            potions[i][j].y=(sY+mY*mY2[(j+resaultOffset[i]+currentOffset)%rowNum]+currentOffset)%(rowNum*sY-mY/5);
      }
    }
    else{
      for(var j = 0;j<rowNum;j++){
            potions[i][j].y=sY+mY*mY2[(j+resaultOffset[i])%rowNum];
      }
    }
  }
}

function setButtons(){
  stopButton.alpha = 0;
  stop1Button.alpha = 0;
  spinButton.alpha = 1;
  musicOnButton.alpha = 1;
  musicOffButton.alpha = 0;
  musicEffectsOnButton.alpha = 0;

  spinButton.setInteractive();
  stop1Button.setInteractive();
  musicOnButton.setInteractive();

  // make the user do a full 'click' on musicOnButton & musicOffButton
  musicOnButton.on("pointerout", ()=>{
    canClick=false;
  })

  musicOnButton.on("pointerdown", ()=>{
    canClick=true;
  })

  // make the user do a full 'click' on spinButton & stopButton
  spinButton.on("pointerout", ()=>{
    canClick=false;
  })

  spinButton.on("pointerdown", ()=>{
    canClick=true;
  })

  // make the user do a full 'click' on stop1Button
  stop1Button.on("pointerout", ()=>{
    canClick=false;
  })

  stop1Button.on("pointerdown", ()=>{
    canClick=true;
  })


  stop1Button.on("pointerup", ()=>{
    if(canClick){
      if(buttonStatus == 2){  //stopOne only works when stopAll does
        stopOne();
      }
    }
  });

  musicOnButton.on("pointerup", ()=>{
    if(canClick){
      if(musicButtonStatus == 0){
          music.pause();
          spinSound.resume();
          musicButtonStatus = 1;
          musicOnButton.alpha = 0.1;
          musicOffButton.alpha = 0;
          musicEffectsOnButton.alpha = 1;
      }
      else if(musicButtonStatus == 1){
          spinSound.pause();
          musicOnButton.alpha = 0.1;
          musicOffButton.alpha = 1;
          musicEffectsOnButton.alpha = 0;
          musicButtonStatus=2;
      }
      else if(musicButtonStatus == 2){
          spinSound.resume();
          music.resume();
          musicOnButton.alpha = 1;
          musicOffButton.alpha = 0;
          musicEffectsOnButton.alpha = 0;
          musicButtonStatus=0;
      }
    }
  });
}

function setResault(){
  for(var i = 0;i<colNum;i++){
     resaultOffset[i] = random.integer(0,3);  //creating the resault for the slot machine
  }
}

function stopAll(){
  for(var i = 0;i<colNum;i++){  //stop all the slots in the machine
    spinning[i] = false;
  }
  resetButtons();
}

function stopOne(){
  spinning[currentColumn] = false;  //stop current slot in the machine
  currentColumn++;
  if(currentColumn >= colNum){
    stopAll();
    resetButtons();
  }
}

function resetButtons(){
  stopButton.alpha = 0;
  stop1Button.alpha = 0;
  spinButton.alpha = 1;
  buttonStatus=0;
  spinSound.stop();
  timer.remove();
  currentColumn=0;
}
