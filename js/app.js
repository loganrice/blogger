

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