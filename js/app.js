App = Ember.Application.create();

// dropbox app key
var appKey = 'ji7obe86xh5d1nf';


App.Router.map(function() {
	this.resource("about");
	this.resource("posts", function() {
		this.resource("post", { path: ':post_id' });
	});
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		return posts;
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		return posts.findBy('id', params.post_id);
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function() {
			this.set('isEditing', true);
		},

		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
})


// help with formatting date into human readable
Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

// makes safe strings by converting to html
var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
})
// fake data because not using server

var posts = [{
	id: '1',
	title: "Rails is Omakase",
	author: { name: "d2h" },
	date: new Date('12-27-2012'),
	excerpt: "some excerpt Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur voluptatibus nam quae in. Ad, tempore sed optio nulla animi natus laborum corporis, numquam consequuntur culpa eos ullam ex reprehenderit inventore.",
	body: "some body Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur voluptatibus nam quae in. Ad, tempore sed optio nulla animi natus laborum corporis, numquam consequuntur culpa eos ullam ex reprehenderit inventore."
}, {
	id: '2',
	title: "The Parley Letter",
	author: { name: "d2h" },
	date: new Date('12-24-2012'),
	excerpt: "some excerpt Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur voluptatibus nam quae in. Ad, tempore sed optio nulla animi natus laborum corporis, numquam consequuntur culpa eos ullam ex reprehenderit inventore.",
	body: "<h1>some body <a>Lorem ipsum</a> dolor sit amet,</h1> <br> consectetur adipisicing elit. Tenetur voluptatibus nam quae in. Ad, tempore sed optio nulla animi natus laborum corporis, numquam consequuntur culpa eos ullam ex reprehenderit inventore."

}]

var taskTable;

$(document).ready(function(){
	var appKey = 'ji7obe86xh5d1nf';
	var client = new Dropbox.Client({key: appKey});
	// Try to finish OAuth authorization.
	client.authenticate({interactive: false}, function (error) {
	    if (error) {
	        alert('Authentication error: ' + error);
	    }
	});

	if (client.isAuthenticated()) {
	    // Client is authenticated. Display UI.
	    alert("cool it worked");
	}

	//authenticate button
	$('.btn').click(function(){
		client.authenticate();
	});

	var datastoreManager = client.getDatastoreManager();
	datastoreManager.openDefaultDatastore(function (error, datastore) {
	    if (error) {
	        alert('Error opening default datastore: ' + error);
	    }

	    // Now you have a datastore. The next few examples can be included here.
	    // define table name
	    taskTable = datastore.getTable('tasks');
	});

	// reads all tasks and adds them to html
	// taskQuery();
	//add task button
	$('.add').click(function(){
			addTask();
	});
});

var addTask = function(){
	// add a task
    var firstTask = taskTable.insert({
				    taskname: 'Buy bread',
				    completed: false,
				    created: new Date()
				});
    // show task name in list
    var taskname = firstTask.get('taskname');
    $('#tasks').append("<li class='task'>" + taskname + "</li>");
    var results = taskTable.query();
	for(var i = 0; i < results.length; i++){
		$('#tasks').append("<li class='task'>" + results[i].getId() + "</li>");
	};
}

// var taskQuery = function(){
// 	var results = taskTable.query();
// 	for(i; i < results.length; i++){
// 		$('#tasks').append("<li class='task'>" + results[i] + "</li>");
// 	};
// }