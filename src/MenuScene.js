import { Scene } from 'phaser'

class MenuScene extends Scene{

  preload(){
    //Loading the assets
    this.load.image('BG_image', 'assets/Potion_Lab.jpg');
    //this.load.audio('BG_music', 'assets/BG_Music.wav');
  }

  create(){
      //Adding background image and music
        var music = game.sound.play('BG_music');

     //Adding slot machine and buttons
      //  var background = this.add.image(500, 350, 'BG_image');
  }

}

export default MenuScene
