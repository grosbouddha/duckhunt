
if(typeof window.DH != "object") {
	window.DH = {} ;
}

DH.ImagePreloader = function() {

	this.imageCounter = 0 ;
	this.imageToLoad = {} ;
	this.imageLoaded = {} ;

	// Main callback to call when every images are loaded.
	// Since cake.js framework need to create ImageNode instances,
	// we have to be sure that images are effectively loaded and ready to be displayed
	// by the browser.
	this.callback = null ;
}

DH.ImagePreloader.prototype.register = function(label, imageURL) {

	this.imageToLoad[label] = imageURL ;

	var imgToLoad = new Image();

	var that = this;
	imgToLoad.onload = function() {

		that.imageLoaded[label] = imgToLoad ;
		that.imageCounter-- ;
		delete that.imageToLoad[label] ;
	} ;

	imgToLoad.src = imageURL ;
	this.imageCounter++ ;

};

DH.ImagePreloader.prototype.startLoading = function() {
	this._checkLoading() ;
};

DH.ImagePreloader.prototype._checkLoading = function() {

	if(this.imageCounter == 0) {

		// launch main init method since every images are loaded:
		this.callback();
	}
	else {
		console.log("ImagePreloader: Still loading images") ;
		for(var i in this.imageToLoad) {
			console.log(" img with label '"+ i+"': "+this.imageToLoad[i]) ;
		}
		// wait for 100ms and relaunch check
		var that = this;
		window.setTimeout(
				function() {

					that._checkLoading()
				},
				1000 ) ;
	}
};
DH.ImagePreloader.prototype.getImageObject = function(label) {

	return this.imageLoaded[label] ;
};

DH.ImagePreloader.prototype.setFirstAction = function(firstActionAsCallback) {

	this.callback = firstActionAsCallback ;
};

DH.ImgMngr = new DH.ImagePreloader();

/*********************************/
/* Background/foreground images  */
/*********************************/

DH.ImgMngr.register(
		"foreground",
		AppConf.serverRoot + "/statics/background/mainBackgroundWithBoards.png");

DH.ImgMngr.register(
		"skyAndTreesBackground",
		AppConf.serverRoot + "/statics/background/skyAndTrees.png");

DH.ImgMngr.register(
		"redSkyAndTreesBackground",
		AppConf.serverRoot + "/statics/background/redSkyAndTrees.png");


/********************************************************/
/* Scoreboard, bulletboard and killedDucksBoard images  */
/********************************************************/

DH.ImgMngr.register(
		"bulletBoardBackground",
		AppConf.serverRoot + "/statics/background/bulletBoardBackground.png");
DH.ImgMngr.register(
		"killedDucksBoardBackground",
		AppConf.serverRoot + "/statics/background/killedDucksBoardBackground.png");
DH.ImgMngr.register(
		"scoreBoardBackground",
		AppConf.serverRoot + "/statics/background/scoreBoardBackground.png");
DH.ImgMngr.register(
		"white_duck",
		AppConf.serverRoot + "/statics/sprites/little_duck_white.png");
DH.ImgMngr.register(
		"red_duck",
		AppConf.serverRoot + "/statics/sprites/little_duck_red.png");
DH.ImgMngr.register(
		"bullet",
		AppConf.serverRoot + "/statics/sprites/bullet.png");

/**********************/
/* Black duck images  */
/**********************/

var duckColours = ['black', 'blue', 'brown'] ;

for(var i=0; i<duckColours.length; i++) {
	DH.ImgMngr.register(
			duckColours[i] +"_duck_splash",
			AppConf.serverRoot + "/statics/sprites/ducks/"+ duckColours[i] +"Duck/splash.png");
	DH.ImgMngr.register(
			duckColours[i] +"_cycle_falling",
			AppConf.serverRoot + "/statics/sprites/ducks/"+ duckColours[i] +"Duck/cycle_falling.png");
	DH.ImgMngr.register(
			duckColours[i] +"_cycle_left_normal",
			AppConf.serverRoot + "/statics/sprites/ducks/"+ duckColours[i] +"Duck/cycle_left_normal.png");
	DH.ImgMngr.register(
			duckColours[i] +"_cycle_right_normal",
			AppConf.serverRoot + "/statics/sprites/ducks/"+ duckColours[i] +"Duck/cycle_right_normal.png");
	DH.ImgMngr.register(
			duckColours[i] +"_cycle_left_up",
			AppConf.serverRoot + "/statics/sprites/ducks/"+ duckColours[i] +"Duck/cycle_left_up.png");
	DH.ImgMngr.register(
			duckColours[i] +"_cycle_right_up",
			AppConf.serverRoot + "/statics/sprites/ducks/"+ duckColours[i] +"Duck/cycle_right_up.png");
}

/**********************/
/* messages   images  */
/**********************/

DH.ImgMngr.register(
		"fly_away",
		AppConf.serverRoot + "/statics/messages/fly_away.png");

DH.ImgMngr.register(
		"round_message",
		AppConf.serverRoot + "/statics/messages/roundMessage.png");

/******************************************************************/
/* numbers    images (for formatting round, score and highscore)  */
/******************************************************************/

DH.ImgMngr.register(
		"green_numbers",
		AppConf.serverRoot + "/statics/font/numbers/green_numbers.png");
DH.ImgMngr.register(
		"white_numbers",
		AppConf.serverRoot + "/statics/font/numbers/white_numbers.png");
DH.ImgMngr.register(
		"dark_green_numbers",
		AppConf.serverRoot + "/statics/font/numbers/dark_green_numbers.png");

/**********************/
/* First screen images*/
/**********************/

DH.ImgMngr.register(
		"firstScreenBackground",
		AppConf.serverRoot + "/statics/firstScreen/firstScreen.png");
DH.ImgMngr.register(
		"arrow",
		AppConf.serverRoot + "/statics/firstScreen/arrow.png");

/***************/
/* Dog images  */
/***************/


DH.ImgMngr.register(
		"black_dog_after_one_kill",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/black_dog_after_one_kill.png");

DH.ImgMngr.register(
		"blue_dog_after_one_kill",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/blue_dog_after_one_kill.png");

DH.ImgMngr.register(
		"brown_dog_after_one_kill",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/brown_dog_after_one_kill.png");

DH.ImgMngr.register(
		"black_black_dog_after_two_kills",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/black_black_dog_after_two_kills.png");
DH.ImgMngr.register(
		"blue_blue_dog_after_two_kills",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/blue_blue_dog_after_two_kills.png");
DH.ImgMngr.register(
		"brown_brown_dog_after_two_kills",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/brown_brown_dog_after_two_kills.png");

DH.ImgMngr.register(
		"black_blue_dog_after_two_kills",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/black_blue_dog_after_two_kills.png");
DH.ImgMngr.register(
		"blue_brown_dog_after_two_kills",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/blue_brown_dog_after_two_kills.png");
DH.ImgMngr.register(
		"black_brown_dog_after_two_kills",
		AppConf.serverRoot + "/statics/sprites/dog/catchingDuck/black_brown_dog_after_two_kills.png");

DH.ImgMngr.register(
		"laughing_dog",
		AppConf.serverRoot + "/statics/sprites/dog/laughing_dog.png");
DH.ImgMngr.register(
		"walking_dog",
		AppConf.serverRoot + "/statics/sprites/dog/walking_dog.png");
DH.ImgMngr.register(
		"sniffing_dog",
		AppConf.serverRoot + "/statics/sprites/dog/sniffing_dog.png");
DH.ImgMngr.register(
		"alert_dog",
		AppConf.serverRoot + "/statics/sprites/dog/alert_dog.png");
DH.ImgMngr.register(
		"jumping_dog_back",
		AppConf.serverRoot + "/statics/sprites/dog/jumping_dog_back.png");
DH.ImgMngr.register(
		"jumping_dog_front",
		AppConf.serverRoot + "/statics/sprites/dog/jumping_dog_front.png");

