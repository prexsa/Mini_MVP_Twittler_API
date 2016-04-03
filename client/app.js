var app = {

	init: function(){
		//console.log("inside client.app.init");
		$('.search').on('click', function(event){
			event.preventDefault();
			
			app.getUserTweets();
		})
	},

	getUserTweets: function(){
		var userName = $('.searchInput').val();

		var data = {
			userName: userName
		}
		
		data = JSON.stringify(data);

		$.ajax({
			url: "/twitterler",
			type: "POST",
			data: data,
			contentType: 'application/json',
			success: function(data){
				app.displayTweets(data);
			},
			error: function(err){
				if(err){
					console.log(err);
				}
			}
		})
	},

	displayTweets: function(data){
		console.log("Before loop", data);
		for(var i = 0; i < data.statuses.length; i++){
			var text = data.statuses[i].text

			var $template = $("<div></div>");
			var output = $template.html(text);
			$('.tweets').append(output);
		}
		
	}
}
