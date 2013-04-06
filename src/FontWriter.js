
YUI().use('node', function(Y) {

		DH.FontWriter = function(jsonConf) {
			this.conf = jsonConf ;
		};

		DH.FontWriter.prototype._getNumberImageNode = function(color, number) {
			var imgNode = new ImageNode(DH.ImgMngr.getImageObject(color + "_numbers")) ;

			imgNode.sX = parseInt(number, 10) * AppConf.imageDimensions.number.width ;
			imgNode.sY = 0 ;
			imgNode.sWidth = AppConf.imageDimensions.number.width ;
			imgNode.sHeight = AppConf.imageDimensions.number.height ;
			imgNode.dWidth = AppConf.imageDimensions.number.width ;

			return  imgNode;
		};


		DH.FontWriter.prototype.clean = function() {

			if(Y.Lang.isArray(this.references)) {
				for(var i=0, l=this.references.length; i<l; i++) {
					DH.gameCanvas.remove(this.references[i]) ;
				}
			}
			this.references = [];
		};

		/*
		 * jsonConf = {
		 * 	color : green,
		 *  message : "34500",
		 *  x : 200,
		 *  y : 250
		 * }
		 *
		 */
		DH.FontWriter.prototype.write = function(message) {

			/*if(Y.Lang.isArray(this.references)) {
				for(var i=0, l=this.references.length; i<l; i++) {
					DH.gameCanvas.remove(this.references[i]) ;
				}
			}
			*/
			this.clean();

			this.conf.message = (message  + "");

			var msgLength = this.conf.message.length ;
			var characterToDraw = "" ;

			if(typeof(this.conf.appendZeroUntil) == "number") {
				var zeroToPush = this.conf.appendZeroUntil - msgLength ;

				for(var i=0; i<zeroToPush; i++) {
					this.conf.message = "0" + this.conf.message ;
					msgLength++ ;
				}
			}

			for(var i=0; i<msgLength; i++) {
				characterToDraw = this._getNumberImageNode(this.conf.color, this.conf.message[i]) ;
				characterToDraw.x = this.conf.x + i * (AppConf.imageDimensions.number.width + this.conf.gap) ;
				characterToDraw.y = this.conf.y ;
				characterToDraw.zIndex = this.conf.zIndex ;
				this.references.push(characterToDraw) ;
				DH.gameCanvas.append(characterToDraw) ;
			}
		};
		/*
			DH.writer.write({
			color : 'white',
			message : "453450024",
			x : 200,
			y : 350
			}) ;
		 */
});