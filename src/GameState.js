
YUI().use('node', function(Y) {

	if(typeof DH == "undefined") {
		window.DH = {} ;
	}

	DH.GameState = function () {

		this.gameStateProperlyInitialized = false ;

		this.currentScore = 0;

		this.currentRound = 0 ;
		this.currentSubRound = 0 ;

		this.killedDuckColors = [];

		this.remainingBullets = null ;
		this.killedDucks = null ;
		this.duckFlyingAway = false ;
		this.duckNumber = 1 ;

	} ;

	DH.GameState.DEFAULT_KILLED_DUCKS = [0,0,0,0,0,0,0,0,0,0] ;

	DH.GameState.prototype.resetGameState = function() {

		this.currentScore = 0;

		this.currentRound = 0 ;
		this.currentSubRound = 0 ;

		this.killedDuckColors = [];

		this.remainingBullets = 3;
		this.killedDuckCounter = 0;
		this.goneDuckCounter = 0;
		this.killedDucks = DH.GameState.DEFAULT_KILLED_DUCKS ;
		DH.publisher.fire(DH.Events.KILLED_DUCK_CHANGED) ;

		this.duckNumber = 1 ;

		this.gameStateProperlyInitialized = true ;

	} ;

	DH.GameState.prototype.initializeRound = function() {

		this.setCurrentRound(++this.currentRound) ;
		Y.log('Current round: '+this.currentRound, 'info', 'DH.gameState') ;

		this.killedDuckColors = [];

		this.setRemainingBullet(3);
		this.currentSubRound = 0;

		// Reseting killedDuckBoard information:
		this.killedDuckCounter = 0 ;
		this.goneDuckCounter = 0;
		this.killedDucks = [0,0,0,0,0,0,0,0,0,0] ;
		DH.publisher.fire(DH.Events.KILLED_DUCK_CHANGED) ;

	};

	DH.GameState.prototype.initializeSubRound = function() {

		this.setRemainingBullet(3);
		this.setDuckFlyingAway(false);
		this.currentSubRound++ ;
		Y.log('Current SUB round: '+this.currentSubRound, 'info', 'DH.gameState') ;
		this.killedDuckColors = [] ;

		this.killedDuckCounter = 0 ;
		this.goneDuckCounter = 0;
		this.removeActiveDucks() ;
	};

	DH.GameState.prototype.setActiveDucks = function(duckIds) {

		for(var i=0; i<duckIds.length; i++) {
			this.killedDucks[duckIds[i] - 1] = 2 ;
		}
		DH.publisher.fire(DH.Events.KILLED_DUCK_CHANGED) ;
	};

	DH.GameState.prototype.removeActiveDucks = function(duckIds) {

		var hasChanged = false ;
		for(var i=0; i<this.killedDucks.length; i++) {
			if(this.killedDucks[i] == 2) {
				this.killedDucks[i] = 0;
				hasChanged = true;
			}
		}

		if(hasChanged) {
			DH.publisher.fire(DH.Events.KILLED_DUCK_CHANGED) ;
		}
	};

	DH.GameState.prototype.setDuckAsGone = function(duckId) {

		this.goneDuckCounter++ ;

		if(this.goneDuckCounter >= this.duckNumber) {
			DH.publisher.fire(DH.Events.NO_MORE_DUCKS_ON_SCENE) ;
		}

		//this._removeDuckIdFromDucksOnScene(duckId) ;
	};

	DH.GameState.prototype.setDuckAsKilled = function(duckConf) {

		// Set duck as killed for killedDuckBoard and notify board:
		this.killedDuckCounter++ ;

		this.killedDuckColors.push(duckConf.color) ;

		this.killedDucks[parseInt(duckConf.id, 10) -1] = 1;
		DH.publisher.fire(DH.Events.KILLED_DUCK_CHANGED) ;

		delete this.currentDuckIds[duckConf.id] ;

		var size = 0, key;
	    for (key in this.currentDuckIds) {
	        if (this.currentDuckIds.hasOwnProperty(key)) size++;
	    }
	    if(size == 0) {

	    	// no more active duck on scene (killed or a flew away)
	    	DH.publisher.fire(DH.Events.NO_MORE_ACTIVE_DUCKS) ;
	    }
	};

	/*
	DH.GameState.prototype._removeDuckId = function(duckId) {


	};
*/


	// Depending on current round, subround and a random component,
	// send back a duck config (black (easy), blue (medium) or brown (very hard to kill))
	DH.GameState.prototype.duckConfigGenerator = function() {

		var randomNumber = Math.random() * 100 ;
		var returnedConfig = DH.Duck.BLACK_DUCK_CONFIG;

		if(this.currentRound < 4) {
			// First 3 round, you should nearly have only black ducks:

			if(randomNumber < 10) {
				returnedConfig = DH.Duck.BLUE_DUCK_CONFIG ;
			}
			else {
				returnedConfig = DH.Duck.BLACK_DUCK_CONFIG ;
			}
		}

		else if(this.currentRound < 8) {

			// Round 4 to 7, you should have often blue ducks and sometimes brown one:
			if(randomNumber < 10) {
				returnedConfig = DH.Duck.BROWN_DUCK_CONFIG ;
			}
			else if(randomNumber < 50) {
				returnedConfig = DH.Duck.BLUE_DUCK_CONFIG ;
			}
			else {
				returnedConfig = DH.Duck.BLACK_DUCK_CONFIG ;
			}
		}
		else {

			// Round 8,9 and 10
			if(randomNumber < 30) {
				returnedConfig = DH.Duck.BROWN_DUCK_CONFIG ;
			}
			else if(randomNumber < 80) {
				returnedConfig = DH.Duck.BLUE_DUCK_CONFIG ;
			}
			else {
				returnedConfig = DH.Duck.BLACK_DUCK_CONFIG ;
			}
		}

		return returnedConfig;

	};

	DH.GameState.prototype.isLastSubRound = function() {

		if(this.currentSubRound * this.duckNumber >= 10) {
			return true;
		}
		return false ;
	};

	DH.GameState.prototype.getNextDuckIds = function() {
		var duckIds  = [] ;
		this.currentDuckIds = {} ;

		for(var i=0; i < this.duckNumber; i++) {
			var currentId = (this.currentSubRound -1) * this.duckNumber + i + 1
			duckIds.push(currentId);

			this.currentDuckIds[currentId] = currentId ;
		}

		return duckIds;
	} ;

	DH.GameState.prototype.setNumberOfDuck = function(number) {
		this.duckNumber = number ;
	};

	DH.GameState.prototype.removeBullet = function() {

		this.setRemainingBullet(this.remainingBullets - 1) ;
	} ;

	DH.GameState.prototype.setRemainingBullet = function(number) {
		this.remainingBullets = number ;
		DH.publisher.fire(DH.Events.BULLET_CHANGED) ;

		if(this.remainingBullets <= 0) {
			DH.publisher.fire(DH.Events.NO_MORE_AMMO) ;
		}
	};

	DH.GameState.prototype.addToScore = function(score) {

		this.currentScore += score ;
		DH.publisher.fire(DH.Events.SCORE_CHANGED) ;
	} ;

	DH.GameState.prototype.setDuckFlyingAway = function(state) {

		this.duckFlyingAway = state ;
		if(this.duckFlyingAway) {
			DH.publisher.fire(DH.Events.FLY_AWAY) ;
		}
		else {
			DH.publisher.fire(DH.Events.NOT_FLY_AWAY) ;
		}
	} ;

	DH.GameState.prototype.setCurrentRound = function(roundNumber) {

		this.currentRound = roundNumber;
		DH.publisher.fire(DH.Events.ROUND_CHANGED) ;
	} ;

	Y.augment(DH.GameState, Y.EventTarget);

	DH.gameState = new DH.GameState() ;
});

