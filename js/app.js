var blogTable;

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
	    blogTable = datastore.getTable('tasks');
	});

	blogList();
});

var blogList = function(){
    var results = blogTable.query();
	for(var i = 0; i < results.length; i++){
		$('#blog-table tr:last').after("<tr><td><a href='#'" + results[i].get('title') + "</a></td></tr>");
	};
}

