
YUI().use('node', function(Y) {

	DH.Decor = function() {};

	DH.Decor.prototype.updateSky = function() {
		DH.gameCanvas.remove(this.skyNode);
		this.drawSky();
	};


	DH.Decor.prototype.updateGround = function() {
		DH.gameCanvas.remove(this.groundNode);
		this.drawGround();
	};

	DH.Decor.prototype.drawSky = function() {
		if(DH.gameState.duckFlyingAway) {
			this.skyNode = new ImageNode(DH.ImgMngr.getImageObject("redSkyAndTreesBackground"), {x: 0, y: 0});
		} else {
			this.skyNode = new ImageNode(DH.ImgMngr.getImageObject("skyAndTreesBackground"), {x: 0, y: 0});
		}
		this.skyNode.zIndex = AppConf.zIndex.sky ;
		DH.gameCanvas.append(this.skyNode);
	};

	DH.Decor.prototype.drawGround = function() {
		this.groundNode = new ImageNode(DH.ImgMngr.getImageObject("foreground"), {x: 0, y: 278});
		this.groundNode.zIndex = AppConf.zIndex.ground ;
		DH.gameCanvas.append(this.groundNode);
	};

	DH.decor = new DH.Decor();
	Y.augment(DH.Decor, Y.EventTarget);

	Y.Global.on(
			DH.Events.FLY_AWAY,
			function(evt) {
				this.updateSky();
			},
			DH.decor
		);

	Y.Global.on(
			DH.Events.NOT_FLY_AWAY,
			function(evt) {
				this.updateSky();
			},
			DH.decor
		);
});


