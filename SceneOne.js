/**
 * @author alesefs for Energie Entertainment
 */
SceneOne = function (game) {

	this.game = game;
	
	this.floor = null;
	this.tile;
	this.player = null;
	this.velocity = 200;
	this.speed = Number;
	this.life = Number;
	this.num = Number;
	this.nr = Number;
	this.pts = Number;
	this.Rpts = Number;
	this.enemiesGroup = Phaser.Group;
	var tempSprite;
	var flash;
	var fade;
	
};


SceneOne.prototype = {

	init: function () {
		this.game.world.setSize(512, 512);
		this.game.camera.setBounds(0, 0, 512, 512);


        
        this.game.loader.addTextFile('csvfloor', 'assets/floor.csv');//csv
        this.game.loader.addImageFile('csvtiles', 'assets/tiles.png');//tiles
        
        //coin group
        this.game.loader.addImageFile('cash', 'assets/cash.png');
        
        //player
        this.game.loader.addSpriteSheet('sheetplayer', 'assets/herosprite.png', 32, 32);

        this.game.loader.load();
         
	},
	
	
	create: function () {

		//BG
		this.game.camera.backgroundColor = 'rgb(85,85,85)';
        
        //cenario csv
        floor = this.game.createTilemap('csvtiles', 'csvfloor', Phaser.Tilemap.FORMAT_CSV, true, 32, 32);
        //9
        floor.setCollisionByIndex([9], Phaser.Collision.ANY, true, true, true);
        floor.collisionCallbackContext = this;
        
        //variaveis
        num = 0;
        pts = 0;
        Rpts = 0;
        nr = 0;
        life = 3;
        
        
        //grupo moedas
        moedas = this.game.createGroup();
        moedas = this.game.createSprite(40, 230, 'cash');
        moedas = this.game.createSprite(150, 430, 'cash');
        moedas = this.game.createSprite(185, 130, 'cash');
        moedas = this.game.createSprite(250, 25, 'cash');
        moedas = this.game.createSprite(250, 300, 'cash');
        moedas = this.game.createSprite(390, 360, 'cash');
        moedas = this.game.createSprite(490, 390, 'cash');
        moedas = this.game.createSprite(490, 170, 'cash');
        moedas = this.game.createSprite(490, 40, 'cash');
        moedas = this.game.createSprite(10, 10, 'cash');
        
        
        //player
        player = this.game.createSprite(50, 450, 'sheetplayer');
		player.setBounds(0, 0, this.game.world.width - 32, this.game.world.height + 64);
		player.drag.x = player.drag.y = 300;
        player.acceleration.y = 980;
		player.animations.add('walk', [0, 1], 5, true);
		player.animations.add('jump', [0]);
        this.game.camera.follow(player);
        
        flash = this.game.camera.fx.add(Phaser.FX.Camera.Flash);
        fade = this.game.camera.fx.add(Phaser.FX.Camera.Fade);
        
	},


	update: function () {
       
       floor.collide(player);
       this.game.collide(this.player, this.moedas, this.pontos.bind(this)); 
        
        Rpts = 10 - pts;
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            if(player.acceleration.y > 0 && player.isTouching(Phaser.Collision.DOWN)){
					player.velocity.y = -player.acceleration.y / 2.5;
			        player.animations.play('jump');		
				}
        }
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {   
        }
        
        if (player.velocity.x == 0){
        	player.animations.play('jump');
        }
        
        
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            player.velocity.x = -100;
            player.animations.play('walk');
            player.flipped = true;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
           player.velocity.x = 100;
           player.animations.play('walk');
           player.flipped = false;
        }
        
        
        if(player.y > this.game.stage.height + 32){
        	player.x = 50;
            player.y = 450;
            life -= 1;
            flash.start(0xff0000, 1);
        }
        
        if (life <= 0){
        	nr ++;
        }
        
        if (nr == 20){
        	this.game.switchState(Lose);
        }
        
        if (pts == 10){
        	num ++;
        }
        if (num == 10){
    		fade.start(0x000000, 1);
    	}
    	if (num == 50){
        	//this.game.switchState(Win);
        	this.game.switchState(SceneTwo);
        }
	},
	
	
	pontos : function(moedas, player)
    {
    	pts += 1;
        moedas.exists = false;
        moedas.kill();
    },
	
	
	kill : function()
    {
    	x = -50;
    	y = -50;
    },
	
	
	//csv
	collide: function (object, collisionData) {
        for(var i = 0; i < collisionData.length; i++) {
            if(collisionData[i].tile.index == 9) {
                console.log('you hit a cactus!');
            }
        }
    },
    
	
	render: function () {
		
		this.game.stage.context.fillStyle = 'rgb(0,0,0)';
		this.game.stage.context.font = 'bold 20px Arial';
		this.game.stage.context.textAlign = 'center';
		this.game.stage.context.fillText("COLETE: " + Rpts,  445, 25);
		this.game.stage.context.fillText("CHANCES: " + life,  445, 65);
	},

}

