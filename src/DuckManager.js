
YUI().use('node', function(Y) {

	DH.DuckManager = function() {

		this.activeDucks = [] ;
	};

	DH.DuckManager.prototype.spawnDucksForRound = function(duckIds) {

		// Unbind any references from previous rounds:
		this.activeDucks = [] ;

		DH.gameState.setActiveDucks(duckIds) ;

		for(var i=0; i<duckIds.length; i++) {
			this.activeDucks.push(
					new DH.Duck(
							duckIds[i],
							DH.gameState.duckConfigGenerator()
							)) ;
		}

		this.tmpActiveDucks = this.activeDucks.slice(0) ;

		for(var i=0; i<this.activeDucks.length; i++) {

			// Randomly delay duck apparitions on the
			// scene (0 to DH.gameInfo.duckSpawingWindowTime seconds window):
			var that= this ;
			setTimeout(
					function() {
						DH.publisher.fire(DH.Events.DUCK_APPEAR_ON_SCENE) ;
						DH.gameCanvas.append(that.tmpActiveDucks[0].getDuckNode()) ;
						that.tmpActiveDucks.splice(0, 1);
					},
					Math.floor(Math.random() * AppConf.gameInfo.duckSpawingWindowTime * 1000)
					);
		}
	};

	DH.DuckManager.prototype.destroyDucksForRound= function() {

		for(var i=0; i<this.activeDucks.length; i++) {
			// TODO: call destroy duck instances here
			;
		}
		this.activeDucks = [] ;
	};

	DH.DuckManager.prototype.setFleeBehavior= function() {

		for(var i=0; i<this.activeDucks.length; i++) {
			this.activeDucks[i].setFleeBehavior() ;
		}
	};

	Y.augment(DH.DuckManager, Y.EventTarget);

	Y.Global.on(DH.Events.NO_MORE_AMMO, function(evt, obj) {

		// Remove click listerner on active ducks:
		for(var i=0; i<DH.duckManager.activeDucks.length; i++) {
			DH.duckManager.activeDucks[i].deactivateDuck() ;
		}

    	},
    	DH.duckManager
    );

	Y.augment(DH.Duck, Y.EventTarget) ;

	DH.duckManager = new DH.DuckManager();

	Y.Global.on(
			DH.Events.FLY_AWAY,
			function(evt) {
				// Remove click listerner on active ducks:
				var that = this;
				setTimeout(
						function() {
							that.setFleeBehavior();
						},
						AppConf.gameInfo.flyAwayTime
				);
			},
			DH.duckManager
			);


});