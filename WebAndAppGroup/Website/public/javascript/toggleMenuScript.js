$(window).load(function(){
	$(document).ready(function() {
		sidebarStatus = false;
		$('#sidebar-toggle').click(function() {
			if (sidebarStatus == false) {
				
				$('.sidebar').animate({
					marginLeft: "0px",
					opacity: "1"
				}, 1000);
			
				$('.content').animate({
					marginLeft: "150px",
					opacity: "1"
				}, 1000);
				
				sidebarStatus = true;
			}
			
			else {
				$('.sidebar').animate({
					marginLeft: "-150px",
					opacity: "1"
				}, 1000);
			  
				$('.content').animate({
					marginLeft: "0px",
					opacity: "1"
					}, 1000);
					
				sidebarStatus = false;
			}	
		});
	});
});

$(document).ready(function(){
			$('#sidebar-toggle').click(function(){
				$(this).toggleClass('open');
			});
		});