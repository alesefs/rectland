/**
 * @author alesefs for Energie Entertainment
 */
SceneThree = function (game) {

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


SceneThree.prototype = {

	init: function () {
		this.game.world.setSize(512, 5120);
		this.game.camera.setBounds(0, 0, 512, 5120);


        
        this.game.loader.addTextFile('csvfloor', 'assets/fly.csv');//csv
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
        floor.setCollisionByIndex([2], Phaser.Collision.ANY, true, true, true);
        floor.collisionCallbackContext = this;
        
        //variaveis
        num = 0;
        pts = 0;
        Rpts = 0;
        nr = 0;
        life = 3;
        
        
        //grupo moedas
        moedas = this.game.createGroup();
        //g1
        moedas = this.game.createSprite(40, 230, 'cash');
        moedas = this.game.createSprite(40, 700, 'cash');
        moedas = this.game.createSprite(185, 1130, 'cash');
        moedas = this.game.createSprite(490, 1840, 'cash');
        moedas = this.game.createSprite(250, 2005, 'cash');
        moedas = this.game.createSprite(490, 2400, 'cash');
        moedas = this.game.createSprite(250, 3000, 'cash');
        moedas = this.game.createSprite(390, 3600, 'cash');
        moedas = this.game.createSprite(490, 3900, 'cash');
        moedas = this.game.createSprite(30, 4700, 'cash');
        //g2
        moedas = this.game.createGroup();
        moedas = this.game.createSprite(440, 230, 'cash');
        moedas = this.game.createSprite(440, 700, 'cash');
        moedas = this.game.createSprite(485, 1130, 'cash');
        moedas = this.game.createSprite(90, 1840, 'cash');
        moedas = this.game.createSprite(250, 2805, 'cash');
        moedas = this.game.createSprite(90, 2400, 'cash');
        moedas = this.game.createSprite(250, 3500, 'cash');
        moedas = this.game.createSprite(30, 3650, 'cash');
        moedas = this.game.createSprite(75, 3850, 'cash');
        moedas = this.game.createSprite(230, 4700, 'cash');
        //g3
        moedas = this.game.createGroup();
        moedas = this.game.createSprite(240, 530, 'cash');
        moedas = this.game.createSprite(340, 750, 'cash');
        moedas = this.game.createSprite(85, 1130, 'cash');
        moedas = this.game.createSprite(490, 1840, 'cash');
        moedas = this.game.createSprite(450, 2005, 'cash');
        moedas = this.game.createSprite(290, 2400, 'cash');
        moedas = this.game.createSprite(400, 3000, 'cash');
        moedas = this.game.createSprite(290, 3230, 'cash');
        moedas = this.game.createSprite(260, 4900, 'cash');
        moedas = this.game.createSprite(430, 4750, 'cash');
        
        
        //player
        player = this.game.createSprite(300, 50, 'sheetplayer');
		player.setBounds(0, 0, this.game.world.width - 32, this.game.world.height + 64);
		player.drag.x = player.drag.y = 490;
        player.acceleration.y = 330;
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
        
        
        
        if(player.y > this.game.world.height - 160 && pts < 10){
            player.x = 300;
            player.y = 50;
            life -= 1;
            flash.start(0xff0000, 1);
        }
        
        if(player.y > this.game.world.height + 32){
            player.x = 300;
            player.y = 50;
            life -= 1;
            flash.start(0xff0000, 1);
        }
        
        if (life <= 0){
        	nr ++;
        }
        
        if (nr == 20){
        	this.game.switchState(Lose);
        }
        
        if (pts >= 10 && player.y > this.game.world.height - 160){
        	num ++;
        }
        if (num == 10){
    		fade.start(0x000000, 1);
    	}
    	if (num == 50){
        	this.game.switchState(Win);
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
            if(collisionData[i].tile.index == 2) {
                console.log('you hit a cactus!');
            }
        }
    },
    
	
	render: function () {
		
		
		if (Rpts <= 0){
			this.game.stage.context.fillStyle = 'rgb(255,191,0)';
			this.game.stage.context.font = 'bold 20px Arial';
			this.game.stage.context.textAlign = 'center';
        	this.game.stage.context.fillText("CHEGUE A ILHA",  430, 25);
       } else {
       		this.game.stage.context.fillStyle = 'rgb(0,0,0)';
			this.game.stage.context.font = 'bold 20px Arial';
			this.game.stage.context.textAlign = 'center';
       		this.game.stage.context.fillText("COLETE: " + Rpts,  445, 25);
       }
       	
       	this.game.stage.context.fillStyle = 'rgb(0,0,0)';
		this.game.stage.context.font = 'bold 20px Arial';
		this.game.stage.context.textAlign = 'center';
		this.game.stage.context.fillText("CHANCES: " + life,  445, 65);
	},

}

