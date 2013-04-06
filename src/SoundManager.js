YUI().use('node', function(Y) {

	soundManager.allSongsLoaded = false ;

	soundManager.defaultOptions = {
			autoLoad: true,
			autoPlay: false,
			volume: 50,
			preferFlash: false
	};

	soundManager.loopSound = function (soundID) {
		  window.setTimeout(function() {
		    soundManager.play(soundID, {
		    	"onfinish": function() {
		    		soundManager.loopSound(soundID);
		    	}
		    });
		  },1);
	};

	soundManager.createSoundHelper = function(id, url, customConf) {

		soundManager.defaultOptions.id = id;
		soundManager.defaultOptions.url = AppConf.serverRoot + url;
		soundManager.defaultOptions.autoLoad = true;

		if(typeof(customConf) == 'object') {
			for(var key in customConf) {
				if(customConf.hasOwnProperty(key)) {
					soundManager.defaultOptions[key] = customConf[key] ;
				}
			}

		}

		return soundManager.createSound(soundManager.defaultOptions);
	};

	soundManager.onload = function() {
		soundManager.createSoundHelper('shot1'					, "/statics/sounds/shot.mp3");
		soundManager.createSoundHelper('shot2'					, "/statics/sounds/shot.mp3");
		soundManager.createSoundHelper('shot3'					, "/statics/sounds/shot.mp3");
		soundManager.createSoundHelper('duckHittingGround'		, "/statics/sounds/duckHittingGround.mp3");
		soundManager.createSoundHelper('duckRelease'			, "/statics/sounds/duckRelease.mp3");
		soundManager.createSoundHelper('laughingDog'			, "/statics/sounds/laughingDog.mp3");
		soundManager.createSoundHelper('roundIntroduction'		, "/statics/sounds/roundIntroduction.mp3");
		soundManager.createSoundHelper('mainTheme'				, "/statics/sounds/mainTheme.mp3");
		soundManager.createSoundHelper('waf'					, "/statics/sounds/waf.mp3");
		soundManager.createSoundHelper('waf3'					, "/statics/sounds/waf3.mp3");
		soundManager.createSoundHelper('wingFlap'				, "/statics/sounds/wingFlap20sec.mp3", { volume : 15});
		soundManager.createSoundHelper('coin'			     	, "/statics/sounds/coin.mp3", { volume : 70});

		soundManager.allSongsLoaded = true ;
	};


	DH.soundManager = window.soundManager ;

	DH.soundManager.mute_ = function() {
		DH.soundManager.mute();
	};

	DH.soundManager.unmute_ = function() {
		DH.soundManager.unmute();
	};

	DH.soundManager.removeDuckNoises = function() {

		Y.log('STOPPING duck noises : coin and wing flaps');
		DH.soundManager.stop('wingFlap') ;
		clearInterval(DH.soundManager.coinTimer) ;
	};

	Y.augment(DH.soundManager, Y.EventTarget);

	Y.Global.on(DH.Events.DUCK_APPEAR_ON_SCENE,

			function(evt) {

				Y.log('STARTING duck noises : coin and wing flaps');
				DH.soundManager.loopSound('wingFlap') ;

				if(DH.soundManager.coinTimer != null) {
					DH.soundManager.coinTimer = setInterval(function() {
						DH.soundManager.play('coin');
					},
					5000);
				}
			},
			DH.SoundManager
	);

	Y.Global.on(DH.Events.NO_MORE_DUCKS_ON_SCENE,
			DH.soundManager.removeDuckNoises,
			DH.soundManager
	);

	Y.Global.on(DH.Events.NO_MORE_ACTIVE_DUCKS,
			DH.soundManager.removeDuckNoises,
			DH.soundManager
	);

	Y.Global.on(DH.Events.WINDOW_FOCUS,
			DH.soundManager.unmute_,
			DH.soundManager
	);

	Y.Global.on(DH.Events.WINDOW_BLUR,
			DH.soundManager.mute_,
			DH.soundManager
	);
});