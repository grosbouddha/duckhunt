
YUI().use('node', function(Y) {

	DH.FirstScreen = function() {

		this.init = false ;

		this.position = {
			"GAME_A" : { x: 85, y: 274 },
			"GAME_B" : { x: 85, y: 306 }
		};


	};

	DH.FirstScreen.prototype._buildInvisibleHandler = function(x,y,w,h, callback, gameType) {

		var handler = new Rectangle(w, h,
			      {
			        fill: [0, 0, 0, 0.0]
			      }
			    );
		handler.x = x ;
		handler.y = y ;

		handler.zIndex = AppConf.zIndex.firstScreen + 1 ;
		handler.gameType = "GAME_" + gameType;

		handler.wrapperClass = this ;

		handler.addEventListener(
				 'mouseover',
				 function() {
					 handler.wrapperClass.arrowNode.x =  handler.wrapperClass.position[handler.gameType].x ;
					 handler.wrapperClass.arrowNode.y =  handler.wrapperClass.position[handler.gameType].y ;
					 handler.wrapperClass.selectedGame = handler.gameType ;
				 });

		handler.addEventListener(
				 'click',
				 function(evt) {
					 DH.publisher.fire(DH.Events['LAUNCH_' + handler.gameType]);
					 return false;
				 });

		return handler;
	};

	DH.FirstScreen.prototype.show = function() {

		soundManager.play('mainTheme');

		if(!this.init) {

			this.highscoreWriter = new DH.FontWriter({
		 		   color : 'green',
		 		   appendZeroUntil : 6,
		 		   x : AppConf.coordinates.highscore.x,
		 		   y : AppConf.coordinates.highscore.y,
		 		   gap : AppConf.coordinates.highscore.gap,
				   zIndex : AppConf.zIndex.highscore
		 		  }) ;

			this.timerMainTheme = setInterval(
					function() {
						soundManager.play('mainTheme');
					},
					AppConf.gameInfo.mainThemeTimeInterval);

			this.gameAHandle = this._buildInvisibleHandler(
					110, // x
					270, // y
					350, // w
					23,   // h
					this.highlightGameA,
					"A" // Game type: A,B or C
			);

			this.gameBHandle = this._buildInvisibleHandler(
					110, // x
					302, // y
					350, // w
					23,   // h
					this.highlightGameB,
					"B"
			);

			this.screenNode = new ImageNode(DH.ImgMngr.getImageObject("firstScreenBackground"), {x:0, y:0}) ;
			this.screenNode.zIndex = AppConf.zIndex.firstScreen ;
			this.selectedGame = "GAME_A" ;
			this.arrowNode = new ImageNode(DH.ImgMngr.getImageObject("arrow"), this.position[this.selectedGame]) ;
			this.arrowNode.zIndex = AppConf.zIndex.arrowFirstScreen ;
			this.init = true ;
		}

		this.highscoreWriter.write('0') ;

		DH.gameCanvas.append(this.screenNode);
		DH.gameCanvas.append(this.gameAHandle);
		DH.gameCanvas.append(this.gameBHandle);
		DH.gameCanvas.append(this.arrowNode);
	};

	DH.FirstScreen.prototype.clean = function() {

		this.init = false ;

		soundManager.stop('mainTheme');
		clearInterval(this.timerMainTheme);
		this.timerMainTheme = null;

		// clean scene:
		DH.gameCanvas.remove(this.screenNode);
		DH.gameCanvas.remove(this.gameAHandle);
		DH.gameCanvas.remove(this.gameBHandle);
		DH.gameCanvas.remove(this.arrowNode);
		this.highscoreWriter.clean() ;

		this.highscoreWriter = null;
		this.screenNode = null;
		this.arrowNode = null;
		this.gameAHandle = null;
		this.gameBHandle = null;
	};

	DH.firstScreen = new DH.FirstScreen();



});