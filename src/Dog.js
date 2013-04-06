
YUI().use('node', function(Y) {

DH.Dog = function() {

	this.currentDogNode = null ;
	this.initialXYPostion = {
			x : Math.floor(AppConf.gameCanvasInfo.width/2 - AppConf.imageDimensions.dog.apparition.width/2),
			y : Math.floor(AppConf.gameCanvasInfo.flyableSkyHeight)
		};

	this.initialWalkingPosition = {
			x: 50,
			y: 275
	};
};



DH.Dog.prototype.makeDogCatchOneDuck = function(finalCallback) {

	var color = DH.gameState.killedDuckColors.sort().join('_');

	if(typeof(color) != 'string') {
		color = 'black' ;
	}

	this.currentDogNode = new ImageNode(DH.ImgMngr.getImageObject(color + "_dog_after_one_kill"),
			this.initialXYPostion
			) ;

	this.currentDogNode.finalCallback = finalCallback ;
	this.currentDogNode.zIndex = AppConf.zIndex.dog ;

	DH.gameCanvas.append(this.currentDogNode);

	soundManager.play("duckRelease") ;
	this.currentDogNode.addFrameListener(DH.Dog.prototype._moveDogUp) ;
};

DH.Dog.prototype.makeDogCatchTwoDucks = function(finalCallback) {

	var colors = DH.gameState.killedDuckColors.sort().join('_');

	/*var finalColor = '' ;
	if(typeof(color1) != 'string' && typeof(color2) != 'string') {

		finalColor = 'black';
	}
	else {
		if(typeof(color2) != 'string') {
			finalColor = color1 ;
		}
		else {
			var colors = [color1, color2] ;
			finalColor = colors.sort().join('_');
		}
	}*/

	Y.log('color: '+colors, 'info', 'DH.dog');
	this.currentDogNode = new ImageNode(DH.ImgMngr.getImageObject(colors + "_dog_after_two_kills"),
			this.initialXYPostion
			) ;

	this.currentDogNode.finalCallback = finalCallback ;
	this.currentDogNode.zIndex = AppConf.zIndex.dog ;

	DH.gameCanvas.append(this.currentDogNode);

	soundManager.play("duckRelease") ;
	this.currentDogNode.addFrameListener(DH.Dog.prototype._moveDogUp) ;
};

DH.Dog.prototype.makeDogLaugh = function(finalCallback) {

	this.currentDogNode = new ImageNode(DH.ImgMngr.getImageObject("laughing_dog"),
			this.initialXYPostion
			) ;
	this.currentDogNode.initAnimationConfig(
			{
				currentFrame : 1 ,
				numberOfFrame : 2 ,
				frameWidth : AppConf.imageDimensions.dog.apparition.width ,
				fps : 10
			}
	);

	this.currentDogNode.finalCallback = finalCallback ;
	this.currentDogNode.zIndex = AppConf.zIndex.dog ;

	DH.gameCanvas.append(this.currentDogNode);

	soundManager.play('laughingDog');
	this.currentDogNode.addFrameListener(DH.Dog.prototype._moveDogUp) ;

};

DH.Dog.prototype.makeDogWalk = function(finalCallback) {

	this.currentDogNode = new ImageNode(DH.ImgMngr.getImageObject("walking_dog"),
			this.initialWalkingPosition
			) ;
	this.currentDogNode.initAnimationConfig(
			{
				currentFrame : 1 ,
				numberOfFrame : 3 ,
				frameWidth : AppConf.imageDimensions.dog.walking.width ,
				fps : 10
			});

	this.currentDogNode.zIndex = AppConf.zIndex.walkingDog ;
	this.currentDogNode.addFrameListener(DH.Dog.prototype._moveDogRight);

	this.currentDogNode.after(
			2000,
			function() {
				this.removeFrameListener(DH.Dog.prototype._moveDogRight);

				this.image = DH.ImgMngr.getImageObject("sniffing_dog");
				this.initAnimationConfig(
						{
							currentFrame : 2 ,
							numberOfFrame : 2 ,
							frameWidth : AppConf.imageDimensions.dog.walking.width ,
							fps : 10
						});

				this.after(1000, function() {
					this.addFrameListener(DH.Dog.prototype._moveDogRight);

					this.image = DH.ImgMngr.getImageObject("walking_dog");
					this.initAnimationConfig(
							{
								currentFrame : 1 ,
								numberOfFrame : 3 ,
								frameWidth : AppConf.imageDimensions.dog.walking.width ,
								fps : 10
							});

					this.after(2000, function() {
						this.removeFrameListener(DH.Dog.prototype._moveDogRight);
						this.image = DH.ImgMngr.getImageObject("sniffing_dog");
						this.initAnimationConfig(
								{
									currentFrame : 2 ,
									numberOfFrame : 2 ,
									frameWidth : AppConf.imageDimensions.dog.walking.width ,
									fps : 10
								});
						this.after(1000, function() {
							this.y -= 10 ;
							this.image = DH.ImgMngr.getImageObject("alert_dog");
							this.initAnimationConfig();
							this.after(600, function() {

								this.image = DH.ImgMngr.getImageObject("jumping_dog_front");
								soundManager.play('waf3') ;
								this.addFrameListener(DH.Dog.prototype._jumpDogUp) ;
							});
						});
					});
				});
			});

	DH.gameCanvas.append(this.currentDogNode);

};

DH.Dog.prototype._jumpDogUp = function(t, dt) {

	if(AppConf.gameCanvasInfo.skyHeight > this.y + 100) {

		// Go behind the hedge:
		this.zIndex = AppConf.zIndex.dog ;

		this.removeFrameListener(DH.Dog.prototype._jumpDogUp) ;
		this.addFrameListener(DH.Dog.prototype._jumpDogDown) ;

	}
	else {
		this.y +=  - 160 * dt/1000;
		this.x +=     55 * dt/1000;
	}

};

DH.Dog.prototype._jumpDogDown = function(t, dt) {

	if(this.y > AppConf.gameCanvasInfo.flyableSkyHeight) {
		this.removeFrameListener(DH.Dog.prototype._jumpDogDown) ;
		DH.gameCanvas.remove(this) ;
		DH.publisher.fire(DH.Events.START_SUBROUND);
	}
	else {
		this.y +=   160 * dt/1000;
		this.x +=    55 * dt/1000;
	}

};

/* Utility method  */
DH.Dog.prototype._moveDogUp = function(t, dt) {

	this.y +=  - 80 * dt/1000;

	if(this.y < (AppConf.gameCanvasInfo.flyableSkyHeight - AppConf.imageDimensions.dog.apparition.height)) {
		this.removeFrameListener(DH.Dog.prototype._moveDogUp) ;
		this.after(500, function() { this.addFrameListener(DH.Dog.prototype._moveDogDown); } );
	}
};

DH.Dog.prototype._moveDogDown = function(t, dt) {

	this.y += 80 * dt/1000;
	if(this.y > AppConf.gameCanvasInfo.flyableSkyHeight) {
		this.removeFrameListener(DH.Dog.prototype._moveDogDown) ;
		DH.gameCanvas.remove(this);
		if((typeof(this.finalCallback) == "function")) {
			this.finalCallback() ;
		}
	}
};

DH.Dog.prototype._moveDogRight = function(t, dt) {

	this.x += 30 * dt/1000;
};


DH.dog = new DH.Dog() ;

});