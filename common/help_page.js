HelpPages = new Mongo.Collection("help_pages");

Schemas = {};

Schemas.HelpPage = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	urlstring: {
		type: String,
		label: "URL String",
		max: 30,
		regEx: /^[-_a-z0-9]*$/i
	},
	pagenumber: {
		type: Number,
		label: "Page Number"
	},
	body: {
		type: String,
		label: "Body",
		optional: true,
		autoform: {
			rows: 5
		}
	}
});

HelpPages.attachSchema(Schemas.HelpPage);

HelpPages.allow({
	insert: function(userId, doc) {
		return (userId && doc.owner === userId);
	},
	update: function(userId, doc) {
		return (userId && doc.owner === userId);
	},
	remove: function(userId, doc) {
		return (userId && doc.owner === userId);
	}
});