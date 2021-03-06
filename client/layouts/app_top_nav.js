// Template.AppTopNav.onRendered(function() {
// 	$('.tooltipped').tooltip({delay: 400});
// });

// Template.AppTopNav.events({
// 	'click .debug-dropdown': function(e, tmpl) {
// 		e.preventDefault();
// 		debugOps();
// 	},
// 	'click .hide-header': function() {
// 		headerVisibility();
// 		// $(window).on('resize', function () {
// 		//     resizeAce();
// 		// });
// 		resizeAce();
// 	}
// });

// Template.AppTopNav.helpers({
// 	currentConnectionName: function() {
// 		app = getCurrentConnection();
// 		if (app) {
// 			return app.title;
// 		} else {
// 			return 'No connection. Have you set a connection in your App settings?';
// 		}
// 	},
// 	isConnected: function() {
// 		if ( Session.get( "ConnectionStatus" ) == true ) {
// 			return 'connected';
// 		} else {
// 			return 'disconnected';
// 		}
// 	}
// });

Template.BreadcrumbsContent.helpers({
	route_base: function() {
		// This function sets the base of the breadcrumb
		var routeName = Router.current().route.getName();
		var routePath = Router.current().route.path();
		var appPrefixRoutes = [ "Connections", "MQTT Connections", "HTTP Connections", "Feeds", "MQTT Feeds", "HTTP Feeds", "Templates", "Themes", "Edit MQTT Feed", "Edit HTTP Feed", "Edit MQTT Connection", "Edit HTTP Connection", "Edit Template", "Safe Edit Template", "Edit Theme" ];
		var nonDisplayRoutes = [ "Dashboard", "View Widget", "Edit App", "View Doc", "New App", "New Widget", "New Template", "New MQTT Feed", "New HTTP Feed", "New MQTT Connection", "New HTTP Connection", "View Tutorial", "View Tutorial" ];
		if ( _.contains( nonDisplayRoutes, routeName ) ) {
			// Applies to: Dashboard, View Widget, Edit App
			return false;
		} else if ( _.contains( appPrefixRoutes, routeName ) ) {
			// If current route is a 'sub-route' of the app, then return the current app as the base of the breadcrumb
			// Applies to: sub-app list pages, edit pages
			var appTreeObj = Session.get("appTreeList")
			appTreeObj[0].path = "/apps/" + appTreeObj[0]._id;
			return appTreeObj;
		// } else if ( routeName == "View Doc" ) {
		// 	// Applies to: Single documentation pages
		// 	return [ { path: '/docs', title: "Documentation" } ];
		// } else if ( routeName == "View Tutorial" ) {
		// 	return [ { path: '/tutorials', title: "Tutorials" } ];
		} else {
			// Applies to: Widgets list, Apps list, Documenation, Support, Settings, Chat, Current Users, Sys admin
			var routeObj = {_id: routePath, title: routeName};
			return [routeObj];
		}
	},
	route_extension: function() {
		// This function provides details of the route, not including the base, which is handled above
		var routeName = Router.current().route.getName();
		var routePath = Router.current().route.path();
		var displayRoutes = [ "Connections", "MQTT Connections", "HTTP Connections", "Feeds", "MQTT Feeds", "HTTP Feeds", "Templates", "Themes", "New App", "New Widget", "New Template", "New MQTT Feed", "New HTTP Feed", "New MQTT Connection", "New HTTP Connection" ];
		var nonDisplayRoutes = [ "Support", "Widgets", "Apps", "Dashboard", "Chat", "Current Users", "System Admin", "Settings", "Documentation", "Debug", "Tutorials", "Welcome" ];

		if ( _.contains( nonDisplayRoutes, routeName ) ) {
			// Applies to: Dashboard, Apps list, Widgets list, Support, Chat, Current Users, System Admin, Settings, Documentation
			return false;
		} else if ( _.contains( displayRoutes, routeName ) ) {
			// Applies to: sub-app list pages
			return [ { item: routeName, path: routePath } ];
		} else if ( routeName == "View Doc" ) {
			// Applies to: Single documentation pages
			return [ { item: "Documentation", path: "/docs" }, { item: this.attributes.title, path: "/docs/" + this.attributes.urlstring} ];
		} else if ( routeName == "View Tutorial" ) {
			// Applies to: Single tutorials pages
			return [ { item: "Tutorials", path: "/tutorials" }, { item: this.title, path: "/tutorials/" + this.urlstring} ];
		} else if ( routeName == "Edit MQTT Feed" ) {
			// Applies to: edit feed page
			return [ { item: "MQTT Feeds", path: "/feeds" }, { item: this.title, path: "/feeds/" + this._id } ];
		} else if ( routeName == "Edit HTTP Feed" ) {
			// Applies to: edit feed page
			return [ { item: "HTTP Feeds", path: "/feeds" }, { item: this.title, path: "/feeds/" + this._id } ];
		} else if ( routeName == "Edit MQTT Connection" ) {
			// Applies to: edit connection page
			return [ { item: "MQTT Connections", path: "/connections" }, { item: this.title, path: "/connections/" + this._id } ];
		} else if ( routeName == "Edit HTTP Connection" ) {
			// Applies to: edit connection page
			return [ { item: "HTTP Connections", path: "/connections" }, { item: this.title, path: "/connections/" + this._id } ];
		} else if ( routeName == "Edit Template" ) {
			// Applies to: edit template page
			return [ { item: "Templates", path: "/templates" }, { item: this.title, path: "/templates/" + this._id + "/edit"} ];
		} else if ( routeName == "Safe Edit Template" ) {
			// Applies to: safe edit template page
			return [ { item: "Templates", path: "/templates" }, { item: this.title + " (Safe Edit)", path: "/templates/" + this._id + "/safeedit"} ];
		} else if ( routeName == "Edit Widget" ) {
			// Applies to: edit widget page, which at the moment (0.2.0), is unused
			return [ { item: "Widgets", path: "/widgets" }, { item: this.title, path: "/widgets/" + this._id + "/edit"} ];
		} else if ( routeName == "View Widget" ) {
			// Applies to: view widget page
			return [ { item: "Widgets", path: "/widgets" }, { item: this.title, path: "/widgets/" + this._id} ];
		} else if ( routeName == "Edit App" ) {
			// Applies to: edit app page
			return [ { item: "Apps", path: "/apps" }, { item: this.title, path: "/apps/" + this._id} ];
		} else if ( routeName == "Edit Theme" ) {
			// Applies to: edit theme page
			return [ { item: "Themes", path: "/themes" }, { item: this.title, path: "/themes/" + this._id } ];
		} else {
			//console.log("from breadcrumb, should not run");
			return [{ item: "None", path: "/none" }, { item: "none", path: "/none/" + 2324 }]
		}
	}
});
