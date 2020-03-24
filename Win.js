/**
 * @author alesefs for Energie Entertainment
 */
Win = function (game) {

	this.game = game;
	this.painel = null;
    this.hasClicked = false;
	var fade;
	this.timer = Number;
	
};

Win.prototype = {

	init: function () {
		this.game.world.setSize(512, 512);
		this.game.camera.setBounds(0, 0, 512, 512);

		//bg main 
		this.game.loader.addImageFile('bg', 'assets/img/win.jpg');
        this.game.loader.load(); 
	},
	
	create: function () {

		this.game.camera.backgroundColor = 'rgb(85,85,85)';
        
        painel = this.game.createSprite(0, 0, 'bg');

		fade = this.game.camera.fx.add(Phaser.FX.Camera.Fade);
		
		timer = 0;
	},

	update: function () {
       
        if (this.game.input.mouse.isDown && this.hasClicked == false){
        	this.hasClicked = true;
        	fade.start(0xffff00, 1);
        }
        
        if (this.hasClicked == true){
        	timer ++;
        }
        
        if (timer == 60){
        	this.game.switchState(Intro);
        }
	},
	
	render: function () {
		
		this.game.stage.context.fillStyle = 'rgb(255,255,255)';
		this.game.stage.context.font = 'bold 32px Arial';
		this.game.stage.context.textAlign = 'center';
		this.game.stage.context.fillText(timer, 25, 25);
		
	},

}

