
var encounterState = '';

// Page initialization
$(function () {
	// Make sure combat panels are hidden;
	$('#combatPanel').hide();
	$('#combatButtons').hide();
	$('.combatCustomPanel').hide();
	
	$('[data-toggle="tooltip"]').tooltip();
	
	$('.btn').click(function(){ handleClick(this.id) });
	

	
	
	$('#radioExecutePracticed').click( function(){ radioExecutePracticedClick() });
	$('#radioExecuteSpontaneous').click( function(){ radioExecuteSpontaneousClick() });
	$('#ddlSpontaneousType').change( function() { ddlSpontaneousTypeChange(this) });
	
	$('input[name="radioExecute"]').prop('checked', false);
	$('#ddlSpontaneousType').attr('disabled', true);
	$('#ddlPracticed').attr('disabled', true);
	
	setEncounter('', 'Dream of Freedom City', 'Sanctum of the Gentlemen', 'Encounter_Gentlemen.png', 
	"You have been waylaid by a group of fierce-looking yuppie wizards. You should <b>converse</b> with them, or <b>attack</b> them. It's up to you, really.", '', '', '', '');
	
	
})

// encounterPanelTitle
// encounterPanelName
// encounterImage
// encounterText

function setEncounter (state, title, name, imageSrc, text, response1, response2, response3, response4) {
	encounterState = state;
	
	// Set UI to encounter mode
	$('#encounterPanel').show();
	$('#encounterButtons').show();

	$('#combatPanel').hide();
	$('#combatButtons').hide();
	
	$('#encounterPanelTitle').html(title);
	$('#encounterPanelName').html(name);
	$('#encounterImage').attr('src', 'img/pics/' + imageSrc);
	$('#combatImage').attr('src', 'img/pics/' + imageSrc); // Set this for combat as well, in case we need to enter that mode.
	$('#encounterText').html(text);
	
	if (response1 == '') {
		$('.btn-response').hide();
		$('.btn-action').show();
	}
	else {
		$('.btn-action').hide();
		$('.btn-response').show();
		
		
		setResponseButton('#response1', response1);
		
		if (response2 == '') {
			$('#response2').hide();
		} else {
			setResponseButton('#response2', response2);
			$('#response2').show();
		}
		
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

function enterCombat(target) {
	// Set UI to combat mode
	$('#encounterPanel').hide();
	$('#encounterButtons').hide();

	$('#combatPanel').show();
	$('#combatButtons').show();
	
}

function setResponseButton(id, code) {

	var v = code.split(':');
	$(id).html(v[1]);
	$(id).removeClass('btn-light btn-dark btn-primary btn-info btn-success btn-warning btn-danger').addClass(v[0]);
}

function handleClick(id) {
	switch(id) {
		case 'btnSpontaneousTypeHelp':
			
			break;
		case 'btnPracticedHelp':
			
			break;
		case 'converse':
			setEncounter('converse', 'Dream of Freedom City', 'Sanctum of the Gentlemen (In Conversation)', 'Encounter_Gentlemen.png', 
				'The wizard leader says stuff. How do you react?', 'btn-success:Happy', 'btn-warning:Sad', 'btn-danger:Angry', '');
			break;
		case 'response1': // happy
			switch(encounterState) {
				case 'converse':
					setEncounter('start', 'Dream of Freedom City', 'Sanctum of the Gentlemen (In Conversation)', 'Encounter_Gentlemen.png', 
						'The wizard seems pleased as well. How do you react to his reaction?', 'btn-success:Happy', 'btn-warning:Sad', 'btn-danger:Angry', '');
					break;
				case 'combat':
					enterCombat('Harvester');
					break;
			}
			break;
		case 'response2': // Sad
			setEncounter('converse', 'Dream of Freedom City', 'Sanctum of the Gentlemen (In Conversation)', 'Encounter_Gentlemen.png', 
				'The wizard seems sad as well. How do you react to his reaction?', 'btn-success:Happy', 'btn-warning:Sad', 'btn-danger:Angry', '');
			break;
		case 'response3': // Angry
			setEncounter('converse', 'Dream of Freedom City', 'Outside the Sanctum', 'Encounter_Hedonists.png', 
				'The wizard beats you up. You find yourself outside on the sidewalk, being approached by some crazy-looking partiers.', '', '', '', '');
			break;
		case 'response4':
			break;
		case 'attack':
			setEncounter('combat', 'Dream of Freedom City', 'Fighting a Harvester', 'Combat_01.png', 
				'Attacking the wizard was not a wise decision. He summons a viscious-looking spectral creature known as a Harvester. It appears intent on swallowing your soul.', 'btn-danger:Fight!', '', '', '');
			break;
		default:
			setEncounter('', 'Dream of Freedom City', 'Sanctum of the Gentlemen', 'Encounter_Gentlemen.png', 
				"You have been waylaid by a group of fierce-looking yuppie wizards. You should <b>converse</b> with them, or <b>attack</b> them. It's up to you, really. Seriously. Click either the 'Converse' or 'Attack' button, just below this text.", '', '', '', '');
		break;
	}
}

function btnSpontaneousTypeHelpClick() {
	var alertText = '';
	var selectedVal = $('#ddlSpontaneousType').find(':selected').val();
	
	
}

function btnPracticedHelpClick() {
	var alertText = '';
	var selectedVal = $('#ddlPracticed').find(':selected').val();
}

function radioExecutePracticedClick() {
	// Enable Practiced Select control, Disable Custom & hide custom panels;
	$('#ddlPracticed').removeAttr('disabled');
	$("#ddlSpontaneousType option:selected").prop("selected", false);
	$('#ddlSpontaneousType').attr('disabled', true);
	$('.combatCustomPanel').hide();
	
}

function radioExecuteSpontaneousClick() {
	// Enable Practiced Select control, Disable Custom & hide custom panels;
	$('#ddlSpontaneousType').removeAttr('disabled');
	$("#ddlPracticed option:selected").prop("selected", false);
	$('#ddlPracticed').attr('disabled', true);
	
}

function ddlSpontaneousTypeChange(ctrl) {

	var selectedVal = $(ctrl).find(':selected').val();
	var selectedText = $(ctrl).find(':selected').text();

	// Hide all combat panels.
	$('.combatCustomPanel').hide();

	switch(selectedVal) {
		case 'restore':
			$('#combatRestoreConfidencePanel').show();
			break;
		case 'attack':
			$('#combatUnleashAttackPanel').show();
			break;
		case 'shield':
			$('#combatCreateSheildPanel').show();
			break;
		case 'relax':
			$('#combatCalmDownPanel').show();
			break;
		case 'rage':
			$('#combatGetEmotionalPanel').show();
			break;
		case 'wish':
			$('#combatAlterRealityPanel').show();
			break;
		default:
			break;
	}
}