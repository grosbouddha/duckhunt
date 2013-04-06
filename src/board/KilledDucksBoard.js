YUI().use('node', function(Y) {

	DH.KilledDucksBoard = function() {
		this.duckNodes = [];
	};

	DH.KilledDucksBoard.prototype.update = function() {

		Y.log('Updating killed ducks board', 'info', 'DH.killedDucksBoard');
		DH.killedDucksBoard.cleanKilledDucksBoard();
		DH.killedDucksBoard.draw();
	};

	DH.KilledDucksBoard.prototype.cleanKilledDucksBoard = function() {

		// Clean previous ducks:
		for(var i=0, j=this.duckNodes.length; i<j; i++) {
			DH.gameCanvas.remove(this.duckNodes[i]) ;
		}
		this.duckNodes = [];
	};

	DH.KilledDucksBoard.prototype.draw = function() {

		var redDuck = DH.ImgMngr.getImageObject("red_duck");
		var whiteDuck = DH.ImgMngr.getImageObject("white_duck");
		var duckStates = DH.gameState.killedDucks ;
		var tmpDuck ;

		var tmpDuckPosition = null ;

		for(var i=0, j=duckStates.length; i<j; i++) {

			tmpDuckPosition = {
									x: AppConf.coordinates.killedDucks.x + i*AppConf.coordinates.killedDucks.gap,
									y: AppConf.coordinates.killedDucks.y
								};

			if(duckStates[i]==0) { // 0 : white duck
				tmpDuck = new ImageNode(whiteDuck, tmpDuckPosition) ;
			}
			else if(duckStates[i]==1){ // 1 : red duck
				tmpDuck = new ImageNode(redDuck, tmpDuckPosition) ;
			}
			else { // 2 : flickering white duck
				tmpDuck = new ImageNode(whiteDuck, tmpDuckPosition) ;
				tmpDuck.every(300, function() {
					if(this.visible) {
						this.visible = false ;
					}
					else {
						this.visible = true ;
					}
				});
			}
			tmpDuck.zIndex = AppConf.zIndex.killedDucks ;
			this.duckNodes.push(tmpDuck) ;

			DH.gameCanvas.append(tmpDuck) ;
		}
	};


	DH.killedDucksBoard = new DH.KilledDucksBoard();

	Y.augment(DH.killedDucksBoard, Y.EventTarget);

	Y.Global.on(DH.Events.KILLED_DUCK_CHANGED,

			function(evt) {
				DH.killedDucksBoard.update() ;
			},
			DH.killedDucksBoard
	);
});