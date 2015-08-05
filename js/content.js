function yellow() {
	console.log("Entered yellow function!");
	
	$('a').each(function(i, k) {
		$(k).css('color', 'yellow');
	});
}

$(document).ready(function(){
	chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
		
		if (request.method === "yellow") {
			console.log("calling yellow!");
			yellow();
		}		
	});
});