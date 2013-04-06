
YUI().use('node', function(Y) {

	DH.MessageManager = function () {
		this.flyAwayMessage = null;
		this.roundMessage = null ;

		this.roundWriter = new DH.FontWriter({
	 		   color : 'white',
	 		   x : Math.floor(AppConf.gameCanvasInfo.width/2 - AppConf.imageDimensions.number.width/2) ,
	 		   y : Math.floor(AppConf.gameCanvasInfo.height/4 + (2/3) * AppConf.imageDimensions.message.round.height - AppConf.imageDimensions.number.height/2),
	 		   zIndex : AppConf.zIndex.messageContent,
	 		   gap : 1
	 		  }) ;
	} ;

	DH.MessageManager.prototype.showRoundMessage = function(roundNumber) {
		if(this.roundMessage == null) {
			this.roundMessage= new ImageNode(
				DH.ImgMngr.getImageObject("round_message"),
				{
					x: Math.floor(AppConf.gameCanvasInfo.width/2  - AppConf.imageDimensions.message.round.width/2) ,
					y: Math.floor(AppConf.gameCanvasInfo.height/4)
				}
				);
		}
		this.roundMessage.zIndex = AppConf.zIndex.message ;

		DH.gameCanvas.append(this.roundMessage) ;
		this.roundWriter.write(roundNumber) ;

		var that = this ;
		setTimeout(
				function() {
					that.roundWriter.clean() ;

					DH.gameCanvas.remove(that.roundMessage) ;
					that.roundMessage = null;

				},
				AppConf.gameInfo.roundMessageDuration
		);
	};

	DH.MessageManager.prototype.showFlyAwayMessage = function() {

		if(this.flyAwayMessage == null) {
			this.flyAwayMessage= new ImageNode(
				DH.ImgMngr.getImageObject("fly_away"),
				{
					x: Math.floor(AppConf.gameCanvasInfo.width/2  - AppConf.imageDimensions.message.fly_away.width/2) ,
					y: Math.floor(AppConf.gameCanvasInfo.height/4)
				}
				);
		}

		this.flyAwayMessage.zIndex = AppConf.zIndex.message ;
		DH.gameCanvas.append(this.flyAwayMessage) ;

		var that = this ;
		setTimeout(
				function() {
					DH.gameCanvas.remove(that.flyAwayMessage) ;
					that.flyAwayMessage = null;
				},
				AppConf.gameInfo.flyAwayMessageDuration
		);
	} ;

	Y.augment(DH.MessageManager, Y.EventTarget);

	DH.messageManager = new DH.MessageManager() ;

	Y.Global.on(DH.Events.FLY_AWAY,

			function(evt) {
				this.showFlyAwayMessage() ;
			},
			DH.messageManager
	);
});