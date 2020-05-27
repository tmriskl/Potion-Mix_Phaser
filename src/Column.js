import 'phaser';
class Column {

  constructor(x1, y1, game1) {
    x = x1;
    y = y1;
    game = game1;
    locations[] = {0,1,2,10};
    preload();

  }

  preload(){
    game.load.image('potion1', 'assets/potion1.png');
    game.load.image('potion2', 'assets/potion2.png');
    game.load.image('potion3', 'assets/potion3.png');
    game.load.image('potion4', 'assets/potion4.png');
  }

  create(){
    var potion1 = game.add.image(this.x, this.y+138.5*this.locations[0], 'potion1').setDepth(2);
    var potion2 = game.add.image(this.x, this.y+138.5*this.locations[1], 'potion2').setDepth(2);
    var potion3 = game.add.image(this.x, this.y+138.5*this.locations[2], 'potion3').setDepth(2);
    var potion4 = game.add.image(this.x, this.y+138.5*this.locations[3], 'potion4').setDepth(2);
  }
}
