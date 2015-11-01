$(window).load(function(){
	$(document).ready(function() {
		sidebarStatus = false;
		$('#sidebar-toggle').click(function() {
			if (sidebarStatus == false) {
				
				$('.sidebar').animate({
					marginLeft: "0px",
					opacity: "1"
				}, 400);
			
				$('.content').animate({
					marginLeft: "156px",
					opacity: "1"
				}, 400);
				
				sidebarStatus = true;
			}
			
			else {
				$('.sidebar').animate({
					marginLeft: "-156px",
					opacity: "1"
				}, 400);
			  
				$('.content').animate({
					marginLeft: "0px",
					opacity: "1"
					}, 400);
					
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