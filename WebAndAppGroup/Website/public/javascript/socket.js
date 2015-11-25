$(window).load(function(){
	$(document).ready(function() {

		var socket = io.connect();
		
					
		socket.on('message', function(data){
			console.log(data.message);
		});
		
		$('#searchButton').click(function() {
			queryDatabase();	
		});
				
		function queryDatabase()
		{
			var query = document.getElementById('searchBar').value;
			socket.emit('message', {'message': query});
		}	
	});
});