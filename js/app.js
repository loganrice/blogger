var blogTable;
var results;

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

var datastoreManager = client.getDatastoreManager;

datastoreManager.openDefaultDatastore(function (error, datastore) {
    if (error) {
        alert('Error opening default datastore: ' + error);
    }

    // Now you have a datastore. The next few examples can be included here.
    // define table name
    blogTable = datastore.getTable('tasks');
    results = blogTable.query();
});

function blogList(results) {
	for(var i = 0; i < results.length; i++){
		var record = results[i];
		$('#blog-table tr:last').append("<tr><td><a class='post' href='#'" + record.get('title') + "</a></td></tr>");
		};
};

blogList(results);


//authenticate button
// $('.btn').click(function(){
// 	client.authenticate();
// });

$(document).ready(function(){

	$("tbody").on("click", ".post", function() {
		var postTitle = $(this).text();
		var post = blogTable.query( {title: postTitle});
		$("#post-content").append(post[0].get('body'));
	});
});



