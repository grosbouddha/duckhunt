if(typeof(window.DH) != "object") {
	window.DH = {} ;
}

YUI().use('event-custom', function(Y) {

	DH.BulletBoard = function() {
		this.bullet = {} ;
		this.flashScreen = new Rectangle(
				  AppConf.gameCanvasInfo.width,
				  AppConf.gameCanvasInfo.height,
			      {
	        		fill: [256, 256, 256, 1.0]
			      }
	    ) ;
		this.flashScreen.x = 0 ;
		this.flashScreen.y = 0 ;
		this.flashScreen.visible = false;
		this.flashScreen.zIndex = AppConf.zIndex.flashScreen ;


	};

	Y.augment(DH.BulletBoard, Y.EventTarget);

	DH.BulletBoard.prototype.update = function() {

		var tmpBulletVisibility ;
		for(var i=1; i <= AppConf.gameInfo.maxNumberOfBullet ; i++) {

			if(i <= DH.gameState.remainingBullets) {
				tmpBulletVisibility = true ;
			}
			else {
				tmpBulletVisibility = false ;
			}

			this.bullet[(i - 1)+""].visible = tmpBulletVisibility ;
		}
	};

	DH.BulletBoard.prototype.draw = function() {

		DH.gameCanvas.append(this.flashScreen) ;

		var bulletImgObj = DH.ImgMngr.getImageObject("bullet");
		var numberBullets = DH.gameState.remainingBullets ;

		for(var i=0; i<numberBullets; i++) {
			this.bullet[i+""] = new ImageNode(bulletImgObj, {x: 52 + i*16, y: 400}) ;
			this.bullet[i+""].zIndex = AppConf.zIndex.bullet ;
			DH.gameCanvas.append(this.bullet[i+""]) ;
		}
	};

	DH.bulletBoard = new DH.BulletBoard() ;


	Y.Global.on(DH.Events.BULLET_CHANGED,
		function(evt) {
			this.update() ;
    	},
    	DH.bulletBoard
    );

	Y.Global.on(DH.Events.TRIGGER_PULL, function(evt) {

			if(DH.gameState.remainingBullets > 0) {

				// Flashing screen:
				DH.bulletBoard.flashScreen.visible = true ;
				setTimeout(
						function() {
							DH.bulletBoard.flashScreen.visible = false ;
						},
						AppConf.gameInfo.flashScreenDuration
				);

				soundManager.play("shot" + DH.gameState.remainingBullets);
				DH.gameState.removeBullet() ;
			}
	    },
	    DH.bulletBoard
	    );
});