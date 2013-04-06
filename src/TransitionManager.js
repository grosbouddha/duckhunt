
/*
onStart

onEnd

singleton.nextAction
currentState
transitionToState
*/

STATES = {
		splashScreen : "splashScreen",
		startingRound : "startingRound",
		endingRound : "endingRound",
		startingSubround : "startingSubround",
		endingSubround : "endingSubround"
};

DH.TransitionManager = function(conf) {

	if(typeof(STATES[conf.initialState]) != "string") {
		throw "Not valid initial state for DH.TransitionManager";
	}

	this.currentState = conf.initialState;
};

DH.TransitionManager.prototype.transitionTo = function() {

};

DH.transitionManager = new DH.TransitionManager();

