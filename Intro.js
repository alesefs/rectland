/**
 * @author alesefs for Energie Entertainment
 */
Intro = function (game) {

	this.game = game;
	this.painel = null;
	this.hasClicked = false;
	var fade;
	this.timer = Number;
	
};

Intro.prototype = {

	init: function () {
		this.game.world.setSize(512, 512);
		this.game.camera.setBounds(0, 0, 512, 512);


		//bg main 
		this.game.loader.addImageFile('bg', 'assets/img/intro.jpg');
        this.game.loader.load(); 
	},
	
	create: function () {

		this.game.camera.backgroundColor = 'rgb(85,85,85)';
        
        painel = this.game.createSprite(0, 0, 'bg');
        
        fade = this.game.camera.fx.add(Phaser.FX.Camera.Fade);
        
        timer = 0;
	},

	update: function () {
       
        timer++;
        
        if (timer == 60){
            fade.start(0x000000, 1);
        }
        
        if (timer == 120){
            this.game.switchState(Main);
        }
        
	},
	
	render: function () {
		
		this.game.stage.context.fillStyle = 'rgb(255,255,255)';
		this.game.stage.context.font = 'bold 32px Arial';
		this.game.stage.context.textAlign = 'center';
		//this.game.stage.context.fillText(timer, 25, 25);
		
	},

}

