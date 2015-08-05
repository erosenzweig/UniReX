var json;

function addSingleCommandToGroupList( cmd ) {
	if(cmd.description != null)
	{
		var desc = cmd.description;

		if(cmd.description.length > 150)
			desc = cmd.description.substring(0,150) + "...";

		$('#listgroup').append("<a href='#' class='list-group-item' data-cmd-name='" + cmd.name + "'>" +
							   "<h4 class='list-group-item-heading'>" + cmd.name + "</h4>" +
							   "<p class='list-group-item-text'>" + desc + "</p>" +
							   "</a>");
	}
}

function addAllCommandsToGroupList() {
	for(var i = 0; i < json.commands.length; i++)
		addSingleCommandToGroupList(json.commands[i]);
}

function populateCommandDetails(cmd) {
	//NOTE: assumes example_desc and examples arrays are of equal size !
	$('#cmdname').text(cmd.name);
	$('#description').text(cmd.description);

	$('#examples-with-descriptions').empty();

	for(var i = 0; i < cmd.examples.length; i++ ) {
		$('#examples-with-descriptions').append("<h5 class='example-description'>" + cmd.example_desc[i] + "</h5>");
		$('#examples-with-descriptions').append("<p class='example'>" + cmd.examples[i].replace(/\n/g,"<br>") + "</p><br/>");
	}
}

function getCommand(name) {
	for(var i = 0; i < json.commands.length; i++)
	{
		if(json.commands[i].name === name)
			return json.commands[i];
	}
}

$(document).ready(function(){
	$.getJSON( "ajax/cande.json", function( data ) {
		json = data;
		addAllCommandsToGroupList();
	});

	$('#listgroup').on('click', '.list-group-item', function(e) {
	  e.preventDefault();
		var name = $(this).data('cmd-name');
		var cmd = getCommand(name);

		populateCommandDetails(cmd);

		$("#container").animate({left: '-450px'}, {duration: 500, queue: false});
	});

	$('#details').click(function(){
		$("#container").animate({left: '0px'}, {duration: 500, queue: false});
	});

	$('#searchbox').click(function(){
		if( $("#searchbox").width() == 74 )
			$("#searchbox").animate({ width: "260px" }, "fast");
	});

	$('#searchbox').keyup(function(){
		var txt = $('#searchbox').val().toUpperCase();
		var possibles = [];

		if(txt.length <= 0)
		{
			$("#listgroup").empty();
			addAllCommandsToGroupList();
		}

		for(var i = 0; i < json.commands.length; i++)
		{
			if(json.commands[i].name.indexOf(txt) >= 0)
				possibles.push(json.commands[i]);
		}

		$("#listgroup").empty();

		for(var i = 0; i < possibles.length; i++)
			addSingleCommandToGroupList(possibles[i]);
	});
});
