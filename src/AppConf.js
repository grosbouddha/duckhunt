
YUI().use('node', function(Y) {

 var DefaultAppConf = {

		domRootId : "mainGameSceneContainer",

		debug : false,

		serverRoot : "",
		// Prod:
		//serverRoot : "http://duckhunt.grosbouddha.com/",

		bootstrapLevel : 'default',

		gameCanvasInfo : {
				width : 512,
				height : 448,
				skyHeight : 279 , // 448 - 169
				groundHeight : 98,
				hedgeHeight : 71,
				flyableSkyHeight : 297// skyHeight + hedgeHeight*0.25
		},

		gameInfo : {
				mainThemeTimeInterval : 14000,
				duckSpawingWindowTime : 2,

				maxNumberOfBullet : 3,

				timeBeforeFleeing : 6500, // in ms,
				flyAwayTime : 2200,
				flyAwayMessageDuration : 2000,
				roundMessageDuration : 2000,
				flashScreenDuration : 100,

				chaosParameter : {
					changeDirection : 0.99,
					flipUpDown : 0.96
				}

		},


		coordinates : {
			highscore : {
				x : 312,
				y : 400,
				gap : 2
			},
			score : {
				x : 384,
				y : 400,
				gap : 2
			},
			killedDucks : {
				x : 182,
				y : 402,
				gap : 17
			},
			round : {
				x : 82,
				y : 368,
				gap : 1
			}
		},

		zIndex : {
			sky : 100,
			duck : 200,
			dog : 250,
			ground : 300,
			walkingDog : 350,
			bullet : 400,
			score : 400,
			round : 400,
			killedDucks : 400,
			message : 700,
			messageContent : 720,
			firstScreen : 5000,
			arrowFirstScreen : 5050,
			highscore : 5050,
			flashScreen : 10000

		},

		imageDimensions : {
			duck : {
				width: 66,  // Deprecated
				height : 68, // Deprecated
				side : {
					width: 66,
					height : 68
				},
				up : {
					width : 62,
					height : 66
				}
			},
			message : {
				round : {
					width : 98,
					height : 66
				},
				fly_away : {
					width : 146,
					height : 34
				}
			},
			number : {
				width : 14,
				height : 14
			},
			dog : {
				walking : {
					width : 110,
					height: 86
				},
				apparition : {
					width : 112 ,
					height : 78
				}
			}
		}
};

if(window.AppConf) {
	window.AppConf = Y.merge(DefaultAppConf,  window.AppConf) ;
}

});