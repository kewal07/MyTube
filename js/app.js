$(function(){
	$("#search-term").submit(function(event){
		console.log("Submitted");
		event.preventDefault();
		var searchTerm = $("#query").val();
		getRequest(searchTerm);
	});
});
function getRequest(searchTerm){
	var params = {
		part:'snippet',
		q:searchTerm,
		key:'AIzaSyBKeyfHEiHko2iPyeUgSs0NTSSa30b0szE',
	};
	url = 'https://www.googleapis.com/youtube/v3/search';
	$.getJSON(url,params,function(data){
		console.log(data.items);
		showResults(data.items);
	});
	// $.get('http://www.omdbapi.com/?s='+searchTerm+'&r=json',function(data){
	// 	myData = data.Search;
	// 	showResults(myData);
	// },'json');
}
function showResults(myData){
	var html = "";
	$.each(myData,function(index,value){
		var snippet = value.snippet;
		var thumbnails = snippet.thumbnails;
		html += "<div><p>"+snippet.title+"</p>";
		html += "<p>"+snippet.description+"</p>";
		html += "<p>"+snippet.publishedAt+"</p>";
		var videoUrl = "http://www.youtube.com/embed/"+value.id.videoId;
		html += "<iframe class='playable' width='500' height='400' src='"+videoUrl+"'></iframe></div>";
	});
	$('#search-results').html(html);
}