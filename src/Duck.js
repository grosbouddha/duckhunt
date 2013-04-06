YUI().use('node', function(Y) {

	DH.Duck = function (duckId, jsonDuckConf) {

		if(typeof(jsonDuckConf) == 'undefined' || jsonDuckConf == null) {
			jsonDuckConf = {} ;
		}

		this.conf = Y.merge(
				DH.Duck.BLUE_DUCK_CONFIG,  // Default duck is black type
				jsonDuckConf
		) ;

		this.conf.id = duckId;

		this.init();
	};

	DH.Duck.BLACK_DUCK_CONFIG = {
			color: "black",
			speed: 1,
			crazyness : 1,
			score : 200
	};

	DH.Duck.BLUE_DUCK_CONFIG = {
			color: "blue",
			speed: 1.3,
			crazyness : 1.1,
			score : 400
	};

	DH.Duck.BROWN_DUCK_CONFIG = {
			color: "brown",
			speed: 1.5,
			crazyness : 1.1,
			score : 700
	};

	DH.Duck.prototype.setFleeBehavior = function() {

		if(!this.duckNode.isDead) {
			this.duckNode.removeFrameListener(DH.Duck.prototype.moveDuck) ;
			this.duckNode.addFrameListener(DH.Duck.prototype.fleeingDuck) ;
		}
	};

	DH.Duck.prototype.deactivateDuck = function() {

		this.duckNode.removeEventListener("click", this.startKilledDuckBehvior) ;
	};

	DH.Duck.prototype.startKilledDuckBehvior = function() {


		Y.log('Duck with id: < ' + this.conf.id + ' > was killed','info', 'DH.duck');

		DH.gameState.setDuckAsKilled(this.conf) ;

		DH.gameState.addToScore(this.conf.score) ;

		this.isDead = true ;
		this.removeFrameListener(DH.Duck.prototype.moveDuck);
		this.removeFrameListener(DH.Duck.prototype.fleeingDuck);

		this.deactivateAnimation();

		this.image = DH.ImgMngr.getImageObject(this.conf.color + "_duck_splash") ;

		var duckNode = this ;
		duckNode.after(400, function() {
			duckNode.addFrameListener(DH.Duck.prototype.fallDuck);

			this.image = DH.ImgMngr.getImageObject(this.conf.color + "_cycle_falling") ;

			this.initAnimationConfig(
					{
						currentFrame : 1 ,
						numberOfFrame : 2 ,
						frameWidth : 38 ,
						fps : 15
					}
			);
		});
	};

	DH.Duck.prototype.init = function() {

		// Initialize x and y directions :
		var initialXDir = Math.random() > 0.5?1:-1;
		var initialYDir = Math.random() > 0.5?1:-1;

		var isUpDuck = false ;
		// 20% chance that the duck is looking up:
		if(initialYDir < 0) {
			isUpDuck = false ; //(Math.random() < 0.2) ;

		}

		// Calculate x and y position of duck:
		if(initialXDir > 0) {

			this.duckNode = new ImageNode(DH.ImgMngr.getImageObject(this.conf.color + "_cycle_right_normal")) ;
			this.duckNode.x = 0 ;
			this.duckNode.isLeftToRightDuck = true ;
		}
		else {
			this.duckNode = new ImageNode(DH.ImgMngr.getImageObject(this.conf.color + "_cycle_left_normal")) ;

			this.duckNode.x = AppConf.gameCanvasInfo.width;
			this.duckNode.isLeftToRightDuck = false ;
		}
		this.duckNode.initAnimationConfig(
				{
					currentFrame : 1 ,
					numberOfFrame : 4 ,
					frameWidth : 68 ,
					fps : 15
				}
		);
		this.duckNode.xDir = initialXDir ;
		this.duckNode.yDir = initialYDir ;

		this.duckNode.y = Math.random() * AppConf.gameCanvasInfo.flyableSkyHeight ;
		//this.duckNode.crazyness = this.conf.crazyness
		this.duckNode.initAnimationConfig(
				{
					currentFrame : 1 ,
					numberOfFrame : 4 ,
					frameWidth : 68 ,
					fps : 15
				}
		);

		this.duckNode.zIndex = AppConf.zIndex.duck ;

		this.duckNode.imageWidth = AppConf.imageDimensions.duck.width ;
		this.duckNode.imageHeight = AppConf.imageDimensions.duck.height ;

		this.duckNode.conf = this.conf ;
		this.duckNode.currentStep = 0;

		this.duckNode.addEventListener("click", this.startKilledDuckBehvior);
		this.duckNode.addFrameListener(DH.Duck.prototype.moveDuck);


	};

	DH.Duck.prototype.getDuckNode = function() {
		return this.duckNode ;
	};

	DH.Duck.prototype.fallDuck = function(t, dt) {

		this.y += 200 * dt/1000;

		if(this.y > AppConf.gameCanvasInfo.height - AppConf.gameCanvasInfo.groundHeight -  Math.floor(AppConf.imageDimensions.duck.height)) {
			// The duck hit the ground:
			soundManager.play('duckHittingGround') ;
			this.removeFrameListener(DH.Duck.prototype.fallDuck);


			DH.gameCanvas.remove(this);

			DH.gameState.setDuckAsGone(this.conf) ;
		}

	};

	DH.Duck.prototype.moveDuck = function(t, dt) {

		this.x += this.xDir * this.conf.speed * 140 * dt/1000;
		this.y += this.yDir * this.conf.speed * 140 * dt/1000;

		var chaos = Math.random() * this.conf.crazyness;
		if(chaos > AppConf.gameInfo.chaosParameter.changeDirection) {
			var changeDirection = true ;
		}
		else if(chaos > AppConf.gameInfo.chaosParameter.flipUpDown) {
			var flipUpDown = true;
		}

		var turnLeft = false, turnRight = false, goUp = false, goDown = false ;

		// Modify directions :
		if (changeDirection) {
			if(this.xDir > 0) {
				turnRight = true;
			}
			else {
				turnLeft = true ;
			}
		}
		if (flipUpDown) {
			if(this.yDir > 0) {
				goUp = true;
			}
			else {
				goDown = true ;
			}
		}



		if (turnLeft || this.x >  AppConf.gameCanvasInfo.width - this.imageWidth/2) {
			this.xDir = -1;
			if(this.previousXDir != -1) {
				this.image = DH.ImgMngr.getImageObject(this.conf.color + "_cycle_left_normal") ;
				this.initAnimationConfig(
						{
							currentFrame : 1 ,
							numberOfFrame : 4 ,
							frameWidth : 68 ,
							fps : 15
						}
				);
				this.previousXDir = -1 ;
			}

		}
		else if (turnRight || this.x < - this.imageWidth/2) {
			this.xDir = 1;
			if(this.previousXDir != 1) {
				this.image = DH.ImgMngr.getImageObject(this.conf.color + "_cycle_right_normal") ;
				this.initAnimationConfig(
						{
							currentFrame : 1 ,
							numberOfFrame : 4 ,
							frameWidth : 68 ,
							fps : 15
						}
				);
				this.previousXDir = 1 ;
			}
		}
		if (goUp || this.y > AppConf.gameCanvasInfo.flyableSkyHeight - Math.floor(AppConf.imageDimensions.duck.height / 2)) {
			this.yDir = -1;
		}
		else if (goDown || this.y < - this.imageWidth/2) {
			this.yDir = 1;
		}
	};

	DH.Duck.prototype.fleeingDuck = function(t, dt) {

		this.y += -this.conf.speed * 140 * dt/1000;

		// Duck is outside the screen ?
		if(this.y < -AppConf.imageDimensions.duck.up.height) {
			DH.gameState.setDuckAsGone(this.conf.id) ;
			this.removeFrameListener(DH.Duck.prototype.fleeingDuck) ;
			DH.gameCanvas.remove(this);
		}

		if(!this.fleeBehaviorSet) {
			if(this.xDir > 0) {
				this.image = DH.ImgMngr.getImageObject(this.conf.color + "_cycle_right_up") ;
			}
			else {
				this.image = DH.ImgMngr.getImageObject(this.conf.color + "_cycle_left_up") ;
			}

			this.initAnimationConfig(
					{
						currentFrame : 1 ,
						numberOfFrame : 4 ,
						frameWidth : AppConf.imageDimensions.duck.up.width ,
						fps : 15
					});
			this.fleeBehaviorSet = true ;
		}

	};

});