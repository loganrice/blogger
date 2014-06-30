var blogTable,
		datastoreManager,
		results,
		recordCount,
		client;

var appKey = 'ji7obe86xh5d1nf';



$(function() {
	client = new Dropbox.Client({key: appKey});
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

	datastoreManager = client.getDatastoreManager();

	datastoreManager.openDefaultDatastore(function (error, datastore) {
	    if (error) {
	        alert('Error opening default datastore: ' + error);
	    }

	    // Now you have a datastore. The next few examples can be included here.
	    // define table name
	    blogTable = datastore.getTable('tasks');
	    results = blogTable.query();

	    recordCount = results.length

	    for(var i = 0; i < recordCount; i++){
				$('#blog-table').append("<tr><td><a class='post' href='#'>" + results[i].get('title') + "</a></td></tr>");
			};

	});

	

	


	//authenticate button
	// $('.btn').click(function(){
	// 	client.authenticate();
	// });
});


$(document).ready(function(){

	$("tbody").on("click", ".post", function() {
		var postTitle = $(this).text();
		var postObj = readBlogPost(postTitle);
		$("#post-content").append(postObj[0].get('body'));
	});

	
});


function readBlogPost(postTitle) {
	return blogTable.query( {title: postTitle});
};


