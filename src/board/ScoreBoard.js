
YUI().use('node', function(Y) {

	DH.ScoreBoard = function() {

		this.scoreWriter = new DH.FontWriter({
 		   color : 'white',
 		   appendZeroUntil : 6,
 		   x : AppConf.coordinates.score.x,
 		   y : AppConf.coordinates.score.y,
 		   gap : AppConf.coordinates.score.gap,
		   zIndex : AppConf.zIndex.score
 		  }) ;
	};

	Y.augment(DH.ScoreBoard,  Y.EventTarget);

	DH.ScoreBoard.prototype.update = function() {

		this.scoreWriter.write(DH.gameState.currentScore);
	};

	DH.scoreBoard = new DH.ScoreBoard() ;

	Y.Global.on(DH.Events.SCORE_CHANGED,

			function(evt) {
				this.update() ;
			},
			DH.scoreBoard
	);



});