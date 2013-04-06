

YUI().use('node', function(Y) {

	DH.GameManager = function() {};

	DH.GameManager.prototype.displayFirstScreen = function() {

		DH.firstScreen.show();
	};

	DH.GameManager.prototype.launchGameA = function(evt) {

		DH.gameState.resetGameState() ;
		DH.gameState.setNumberOfDuck(1);

		DH.gameManager.launchGame();
	};

	DH.GameManager.prototype.launchGameB = function(evt) {

		DH.gameState.resetGameState() ;
		DH.gameState.setNumberOfDuck(2);

		DH.gameManager.launchGame();
	};

	DH.GameManager.prototype.launchGame = function() {

		//Remove first screen:
		DH.firstScreen.clean();

		DH.decor.drawSky();
		DH.decor.drawGround();

		DH.killedDucksBoard.update();
		DH.bulletBoard.draw();

		//DH.dog.makeDogWalk() ;
		//soundManager.play('roundIntroduction');

		DH.gameManager.startRound() ;

		// Start sub round :
		//DH.duckManager.spawnDucksForRound(1) ;
		//DH.gameCanvas.activateGun();

		//DH.dog.makeDogCatchOneDuck() ;
		//DH.dog.makeDogCatchTwoDucks() ;
		//DH.dog.makeDogLaugh();


		DH.publisher.fire(DH.Events.SCORE_CHANGED) ;
		DH.publisher.fire(DH.Events.ROUND_CHANGED) ;

	};

	DH.GameManager.prototype.BOOTSTRAP_startSubRound = function() {

		/*DH.gameState.resetGameState() ;
		DH.gameState.setNumberOfDuck(2);

		DH.decor.drawSky();
		DH.decor.drawGround();

		DH.killedDucksBoard.draw();
		DH.bulletBoard.draw();

		DH.publisher.fire(DH.Events.SCORE_CHANGED) ;
		DH.publisher.fire(DH.Events.ROUND_CHANGED) ;
		DH.publisher.fire(DH.Events.START_SUBROUND);
		*/
	};

	DH.GameManager.prototype.startRound = function() {

		// reset game state for a new round:
		DH.gameState.initializeRound() ;

		DH.messageManager.showRoundMessage(DH.gameState.currentRound);

		DH.dog.makeDogWalk() ;
		soundManager.play('roundIntroduction');




	};

	DH.GameManager.prototype.startSubRound = function() {

		// Start sub round :

		// prepare gun:
		DH.gameCanvas.activateGun();

		DH.gameState.initializeSubRound() ;


		DH.duckManager.spawnDucksForRound(DH.gameState.getNextDuckIds()) ;

		DH.gameManager.currentFlyingAwayTimer = setTimeout(
				function() {
					Y.log('SETTING ducks to flying away state !', 'info', 'DH.gameManager');
					DH.gameState.setDuckFlyingAway(true) ;
				},
				AppConf.gameInfo.timeBeforeFleeing
		);
	};

	DH.GameManager.prototype.endSubRound = function() {

		// Remove any setimeouted subround action:
		Y.log('CLEANING flying away state and timer !', 'info', 'DH.gameManager');
		clearTimeout(DH.gameManager.currentFlyingAwayTimer) ;
		DH.gameState.setDuckFlyingAway(false);

		DH.gameCanvas.deactivateGun();

		var nextStepCallback = DH.gameManager.startSubRound;
		if(DH.gameState.isLastSubRound()) {

			nextStepCallback = DH.gameManager.startRound ;
		}


		if(DH.gameState.killedDuckCounter == 2) {
    		DH.dog.makeDogCatchTwoDucks(nextStepCallback) ;
    	}
    	else if(DH.gameState.killedDuckCounter == 1) {
    		DH.dog.makeDogCatchOneDuck(nextStepCallback) ;
    	}
    	else {
    		DH.dog.makeDogLaugh(nextStepCallback) ;
    	}

	};

	Y.augment(DH.GameManager, Y.EventTarget);

	Y.Global.on(
			DH.Events.LAUNCH_GAME_A,
			DH.GameManager.prototype.launchGameA,
			DH.gameManager
			);

	Y.Global.on(
			DH.Events.LAUNCH_GAME_B,
			DH.GameManager.prototype.launchGameB,
			DH.gameManager
			);

	Y.Global.on(
			DH.Events.START_SUBROUND,
			DH.GameManager.prototype.startSubRound,
			DH.gameManager
			);


	Y.Global.on(
			DH.Events.NO_MORE_DUCKS_ON_SCENE,
			DH.GameManager.prototype.endSubRound,
			DH.gameManager
			);


});

