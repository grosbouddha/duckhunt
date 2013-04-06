
YUI().use('node', function(Y) {

	DH.RoundBoard = function() {

		this.roundWriter = new DH.FontWriter({
 		   color : 'dark_green',
 		   appendZeroUntil : 1,
 		   x : AppConf.coordinates.round.x,
 		   y : AppConf.coordinates.round.y,
 		   gap : AppConf.coordinates.round.gap,
 		   zIndex : AppConf.zIndex.round
 		  }) ;
	};

	Y.augment(DH.RoundBoard,  Y.EventTarget);

	DH.RoundBoard.prototype.update = function() {

		this.roundWriter.write(DH.gameState.currentRound);
	};

	DH.roundBoard = new DH.RoundBoard() ;


	Y.Global.on("round_changed",

			function(evt) {
				this.update() ;
			},
			DH.roundBoard
	);

});