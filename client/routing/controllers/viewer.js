AppViewerController = PreloadController.extend({
	layoutTemplate: "ViewerLayout",
	'preload': {
		'styles': [ '/css/viewer.css' ]
	},
	loadingTemplate: "Loading",
	onBeforeAction: function() {
		$( 'body' ).addClass( 'viewer-body' );
		if( this.params.appid ) {
			Session.setPersistent( "currentAppId", this.params.appid );
		}
		//Do not call this.next() SetMQTTCredentials does that.
		SetMQTTCredentials( this );
		inIDE = false;
	},
	subscriptions: function() {
		var self = this;
		var appId = Session.get( "currentAppId" );

		if( appId ) {
			return [
				Meteor.subscribe( 'sharedApps' ),
				Meteor.subscribe( 'apps', appId, {
					onReady: function() {
						Tracker.autorun(function(){
							//If the app properties change re-initialise
							var aid = Session.get("currentAppId");
							app = Apps.findOne({_id: aid});
							InitialiseApps();
							currConn = false;
							Tracker.nonreactive(function() {
								currConn = getCurrentConnection();
							})
							console.log("Connection updated ", currConn)
							newConn = Connections.findOne({_id: app.connection});
							if(currConn != newConn) {
								UnsubscribeAll();
								DisconnectMQTT();
								setCurrentConnection(false);
								Session.set("authReady", false);
								ResetMessages();
								connect(newConn); //App update
							}

						})
					}
				}),
				Meteor.subscribe( 'connections', appId, {
					onReady: function() {
						// console.log("Connections READY!");
					}
				}),
				Meteor.subscribe( 'http_connections', appId ),
				Meteor.subscribe( 'feeds', appId, {
					onReady: function() {
						// console.log("Feeds READY!");
					}
				}),
				Meteor.subscribe( 'http_feeds', appId ),
				Meteor.subscribe( 'screens', appId, {
					onReady: function() {
						// console.log("Screens READY!");
					}
				}),
				Meteor.subscribe( 'widgets', appId, {
					onReady: function() {
						// console.log("Screens READY!");
						InstantiateWidgets();
					}
				})
			];
		} else {
			console.log( "You don't have an app ID. Weird." )
			return false;
		}
	}
});


