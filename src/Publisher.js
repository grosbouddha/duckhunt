
YUI().use('node', function(Y) {

	DH.Events = {
		TRIGGER_PULL : 'trigger_pull',
		NO_MORE_AMMO : 'no_more_ammo',
		BULLET_CHANGED : 'bullet_changed',
		SCORE_CHANGED : 'score_changed',
		ROUND_CHANGED : 'round_changed',
		FLY_AWAY : 'fly_away',
		START_SUBROUND : 'start_sub_round',
		END_SUBROUND : 'end_sub_round',
		NO_MORE_DUCKS_ON_SCENE : 'no_more_ducks_on_scene',
		NO_MORE_ACTIVE_DUCKS : 'no_more_active_ducks',
		DUCK_APPEAR_ON_SCENE : 'duck_appear_on_scene',
		KILLED_DUCK_CHANGED : 'killed_duck_changed',
		NOT_FLY_AWAY : 'not_fly_away',
		LAUNCH_GAME_A : 'launch_game_A',
		LAUNCH_GAME_B : 'launch_game_B'
	};

	DH.publisher = new Y.EventTarget();

	DH.publisher.name = 'global_publisher';
	DH.publisher.defaultGlobalEventConf = {
		broadcast:  2,   // global notification
		emitFacade: true // emit a facade so we get the event target
	};

	DH.publisher.publish(DH.Events.TRIGGER_PULL , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.NO_MORE_AMMO , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.BULLET_CHANGED , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.SCORE_CHANGED , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.ROUND_CHANGED , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.FLY_AWAY , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.START_SUBROUND , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.NO_MORE_DUCKS_ON_SCENE , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.NO_MORE_ACTIVE_DUCKS , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.DUCK_APPEAR_ON_SCENE , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.KILLED_DUCK_CHANGED , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.NOT_FLY_AWAY , DH.publisher.defaultGlobalEventConf);

	DH.publisher.publish(DH.Events.LAUNCH_GAME_A , DH.publisher.defaultGlobalEventConf);
	DH.publisher.publish(DH.Events.LAUNCH_GAME_B , DH.publisher.defaultGlobalEventConf);
});