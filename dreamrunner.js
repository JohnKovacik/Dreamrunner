
var encounterState = '';

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	
	$('.btn').click(function(){ handleClick(this.id) });
	
	setEncounter('', 'Dream of Freedom City', 'Sanctum of the Gentlemen', 'Encounter_Gentlemen.png', 
	'You have been waylaid by a group of fierce-looking yuppie wizards. You should <b>converse</b> with them.', '', '', '', '');
	
	
})

// encounterPanelTitle
// encounterPanelName
// encounterImage
// encounterText

function setEncounter (state, title, name, imageSrc, text, response1, response2, response3, response4) {
	encounterState = state;
	$('#encounterPanelTitle').html(title);
	$('#encounterPanelName').html(name);
	$('#encounterImage').attr('src', 'img/pics/' + imageSrc);
	$('#encounterText').html(text);
	
	if (response1 == '') {
		$('.btn-response').hide();
		$('.btn-action').show();
	}
	else {
		$('.btn-action').hide();
		$('.btn-response').show();
		
		
		setResponseButton('#response1', response1);
		setResponseButton('#response2', response2);
		
		if (response3 == '') {
			$('#response3').hide();
		} else {
			setResponseButton('#response3', response3);
			$('#response3').show();
		}

		if (response4 == '') {
			$('#response4').hide();
		} else {
			setResponseButton('#response4', response4);
			$('#response4').show();
		}
	}
}

function setResponseButton(id, code) {

	var v = code.split(':');
	$(id).html(v[1]);
	$(id).removeClass('btn-default btn-primary btn-info btn-success btn-warning btn-danger').addClass(v[0]);
}

function handleClick(id) {

	switch(id) {
		case 'converse':
			setEncounter('start', 'Dream of Freedom City', 'Sanctum of the Gentlemen (In Conversation)', 'Encounter_Gentlemen.png', 
				'The wizard leader says stuff. How do you react?', 'btn-success:Happy', 'btn-warning:Sad', 'btn-danger:Angry', '');
			break;
		case 'response1': // happy
			setEncounter('start', 'Dream of Freedom City', 'Sanctum of the Gentlemen (In Conversation)', 'Encounter_Gentlemen.png', 
				'The wizard seems pleased as well. How do you react to his reaction?', 'btn-success:Happy', 'btn-warning:Sad', 'btn-danger:Angry', '');
			break;
		case 'response2': // Sad
			setEncounter('start', 'Dream of Freedom City', 'Sanctum of the Gentlemen (In Conversation)', 'Encounter_Gentlemen.png', 
				'The wizard seems sad as well. How do you react to his reaction?', 'btn-success:Happy', 'btn-warning:Sad', 'btn-danger:Angry', '');
			break;
		case 'response3': // Angry
			setEncounter('start', 'Dream of Freedom City', 'Outside the Sanctum', 'Encounter_Hedonists.png', 
				'The wizard beats you up. You find yourself outside on the sidewalk, being approached by some crazy-looking partiers.', '', '', '', '');
			break;
		case 'response4':
			break;
	  default:
		setEncounter('', 'Dream of Freedom City', 'Sanctum of the Gentlemen', 'Encounter_Gentlemen.png', 
			'You have been waylaid by a group of fierce-looking yuppie wizards. You should <b>converse</b> with them. Seriously. Click the "Converse" button, just below this text.', '', '', '', '');
		// code block
		break;
	}
}	