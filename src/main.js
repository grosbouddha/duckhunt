if(typeof DH == "undefined") {
	window.DH = {} ;
}

YUI().use('node', function(Y) {
	Y.on("load", function() {

			DH.gameCanvas = new Canvas(
		    		document.getElementById(AppConf.domRootId),
		    		AppConf.gameCanvasInfo.width,
		    		AppConf.gameCanvasInfo.height,
		    		{'cursor' : 'crosshair'});

			DH.gameCanvas.publishShot = function(evt) {
		    	DH.publisher.fire(DH.Events.TRIGGER_PULL);
		    };

			DH.gameCanvas.activateGun = function() {
				if(!DH.gameCanvas.isGunActive) {
					DH.gameCanvas.addEventListener("click", DH.gameCanvas.publishShot);
					DH.gameCanvas.isGunActive = true ;
				}
			};

			DH.gameCanvas.deactivateGun = function() {
				DH.gameCanvas.removeEventListener("click", DH.gameCanvas.publishShot);
				DH.gameCanvas.isGunActive = false ;
			};

			DH.gameCanvas.onWindowBlur = function() {
				DH.publisher.fire(DH.Events.WINDOW_BLUR);
			};

			DH.gameCanvas.onWindowFocus = function() {
				DH.publisher.fire(DH.Events.WINDOW_FOCUS);
			};

			if (document.onfocusin) {
				document.onfocusin = DH.gameCanvas.onWindowFocus;
				document.onfocusout = DH.gameCanvas.onWindowBlur;
			} else {
				window.onfocus = DH.gameCanvas.onWindowFocus;
				window.onblur = DH.gameCanvas.onWindowBlur;
			}

		    if(AppConf.debug) {
		    	DH.gameCanvas.addEventListener("click", function(evt) {
		    		window.document.title = "x: " + evt.layerX + " - y: "+evt.layerY;
			    });
		    }

		    var initMain = function() {
		    	if(soundManager.allSongsLoaded) {

		    		DH.gameManager = new DH.GameManager() ;

		    		if(AppConf.bootstrapLevel == 'default') {
		    			DH.gameManager.displayFirstScreen();
		    		}
		    		else {
		    			if(typeof(DH.gameManager['BOOTSTRAP_' + AppConf.bootstrapLevel]) == 'function') {
		    				DH.gameManager['BOOTSTRAP_' + AppConf.bootstrapLevel]() ;
		    			}
		    			else {
		    				console.error('Not valid bootstrap DH.gameManager.BOOTSTRAP_' + AppConf.bootstrapLevel  + '() is not a function.') ;
		    			}
		    		}
		    	}
		    	else {
		    		setTimeout(initMain, 500) ;
		    	}
			};
			DH.ImgMngr.setFirstAction(initMain);
			DH.ImgMngr.startLoading();
		});

});
