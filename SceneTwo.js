/**
 * @author alesefs for Energie Entertainment
 */
SceneTwo = function (game) {

	this.game = game;
	
	this.floor = null;
	this.tile;
	this.player = null;
	this.enemy1 = null;
	this.enemy2 = null;
	this.enemy3 = null;
	this.velocity = 200;
	this.speed1 = Number;
	this.speed2 = Number;
	this.speed3 = Number;
	this.life = Number;
	this.num = Number;
	this.killenemy = Number;
	this.speed = Number;
	this.nr = Number;
	this.pts = Number;
	this.Rpts = Number;
	this.moedas = null;
	var tempSprite;
	var flash;
	var fade;
	
};


SceneTwo.prototype = {

	init: function () {
		this.game.world.setSize(1536, 512);
		this.game.camera.setBounds(0, 0, 1536, 512);

		//mapa
        this.game.loader.addTextFile('csvfloor', 'assets/land.csv');//csv
        this.game.loader.addImageFile('csvtiles', 'assets/tiles.png');//tiles
        
        //coin group
        this.game.loader.addImageFile('cash', 'assets/cash.png');
        
        //player
        this.game.loader.addSpriteSheet('sheetplayer', 'assets/herosprite.png', 32, 32);

		//enemy
        this.game.loader.addSpriteSheet('sheetenemy', 'assets/enemysprite.png', 32, 32);

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
        killenemy = 0;
        life = 3;
        speed1 = 1.5;
        speed2 = 1.5;
        speed3 = 1.5;
        
        //grupo moedas
        moedas = this.game.createGroup();
        moedas = this.game.createSprite(55, 315, 'cash');
        moedas = this.game.createSprite(280, 260, 'cash');
        moedas = this.game.createSprite(505, 340, 'cash');
        moedas = this.game.createSprite(505, 435, 'cash');
        moedas = this.game.createSprite(840, 360, 'cash');
        moedas = this.game.createSprite(790, 400, 'cash');
        moedas = this.game.createSprite(890, 400, 'cash');
        moedas = this.game.createSprite(1110, 340, 'cash');
        moedas = this.game.createSprite(1365, 250, 'cash');
        moedas = this.game.createSprite(1040, 100, 'cash');
        
        
        //enemy1
        enemy1 = this.game.createSprite(1365, 300, 'sheetenemy');
        enemy1.acceleration.y = 980;
        enemy1.animations.add('spin', [0, 1], 5, true);
        enemy1.animations.play('spin');
        
        
        //enemy2
        enemy2 = this.game.createSprite(1065, 340, 'sheetenemy');
        enemy2.acceleration.y = 980;
        enemy2.animations.add('spin', [0, 1], 5, true);
        enemy2.animations.play('spin');
        
        
        //enemy3
        enemy3 = this.game.createSprite(700, 340, 'sheetenemy');
        enemy3.acceleration.y = 980;
        enemy3.animations.add('spin', [0, 1], 5, true);
        enemy3.animations.play('spin');
        
        
        
        
        //player
        player = this.game.createSprite(50, 400, 'sheetplayer');
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
        floor.collide(enemy1);
        floor.collide(enemy2);
        floor.collide(enemy3);
        this.game.collide(player, enemy1, this.attack.bind(this));
        this.game.collide(player, enemy2, this.ataq.bind(this));
        this.game.collide(player, enemy3, this.atk.bind(this));
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
        
        if (pts >= 10 && killenemy >= 1){
        	num ++;
        }
        if (num == 10){
    		fade.start(0x000000, 1);
    	}
    	if (num == 50){
        	this.game.switchState(SceneThree);
        }
        
         
        //movimento enemy1        
        enemy1.x += speed1
        //last enemy 
        if (enemy1.x >= 1400 && enemy1.x >= 1275){
        	enemy1.flipped = true;
        	speed1 *= -1;
        }
        if (enemy1.x <= 1280 && enemy1.x <= 1405){
        	enemy1.flipped = false;        	
        	speed1 *= -1;
        }
        
	    //movimento enemy2        
        enemy2.x += speed2
        //last enemy 
        if (enemy2.x >= 1150 && enemy2.x >= 1055){
        	enemy2.flipped = true;
        	speed2 *= -1;
        }
        if (enemy2.x <= 1050 && enemy2.x <= 1155){
        	enemy2.flipped = false;        	
        	speed2 *= -1;
        }
        
        //movimento enemy3        
        enemy3.x += speed3
        //last enemy 
        if (enemy3.x >= 740 && enemy3.x >= 655){
        	enemy3.flipped = true;
        	speed3 *= -1;
        }
        if (enemy3.x <= 650 && enemy3.x <= 745){
        	enemy3.flipped = false;        	
        	speed3 *= -1;
        }    
	    
        
             
	},
	
	
	attack : function()
    {
    	if (player.y < enemy1.y || enemy1.y > player.y){
    		killenemy += 1;
    		enemy1.kill();	
    		//flash.start(0xffff00, 1);
    	} 
    	else {
			life -= 1;
			flash.start(0xff0000, 1);
			player.x = 50;
			player.y = 450;	
		}
    },
    
    
    ataq : function()
    {
    	if (player.y < enemy2.y || enemy2.y > player.y){
    		killenemy += 1;
    		enemy2.kill();	
    		//flash.start(0xffff00, 1);
    	} 
    	else {
			life -= 1;
			flash.start(0xff0000, 1);
			player.x = 50;
			player.y = 450;	
		}
    },
    
    
    atk : function()
    {
    	if (player.y < enemy3.y || enemy3.y > player.y){
    		killenemy += 1;
    		enemy3.kill();	
    		//flash.start(0xffff00, 1);
    	} 
    	else {
			life -= 1;
			flash.start(0xff0000, 1);
			player.x = 50;
			player.y = 450;	
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
		
		this.game.stage.context.fillStyle = 'rgb(0,0,0)';
		this.game.stage.context.font = 'bold 20px Arial';
		this.game.stage.context.textAlign = 'center';
		this.game.stage.context.fillText("COLETE: " + Rpts,  445, 25);
		this.game.stage.context.fillText("CHANCES: " + life,  445, 65);
		this.game.stage.context.fillText("KILLS: " + killenemy,  445, 105);
	},

}

