
var encounterState = '';



// Page initialization
$(function () {
	// Make sure combat panels are hidden;
	$('#combatPanel').hide();
	$('#combatButtons').hide();
	$('.combatCustomPanel').hide();
	
	$('[data-toggle="tooltip"]').tooltip();
	
	$('.btn').click(function(){ handleClick(this.id) });
	
	$('label').click(function() {
		var labelID = $(this).attr('for');
		$('#'+labelID).trigger('click');
	});
	
	
	$('#radioExecutePracticed').click( function(){ radioExecutePracticedClick() });
	$('#radioExecuteSpontaneous').click( function(){ radioExecuteSpontaneousClick() });
	$('#ddlSpontaneousType').change( function() { ddlSpontaneousTypeChange(this) });
	$('#ddlPracticed').change( function() { ddlPracticedChange(this) });
	$('.updateCombatEffectsPanel ').change( function() { updateCombatEffectsPanel() });

	$('input[name="radioExecute"]').prop('checked', false);
	$('#ddlSpontaneousType').attr('disabled', true);
	$('#ddlPracticed').attr('disabled', true);
	
	// DEBUG / PROTOTYPE CALLS
	setEncounter('', 'Dream of Freedom City', 'Sanctum of the Gentlemen', 'Encounter_Gentlemen.png', 
		"You have been waylaid by a group of fierce-looking yuppie wizards. You should <b>converse</b> with them, or <b>attack</b> them. It's up to you, really.", '', '', '', '');
	
	setPracticedManeuversStatusDictionary();
})

// encounterPanelTitle
// encounterPanelName
// encounterImage
// encounterText

function setEncounter (state, title, name, imageSrc, text, response1, response2, response3, response4) {
	encounterState = state;
	
	// Set UI to encounter mode
	$('#encounterPanel').show();
	$('#combatPanel').hide();
	
	$('#encounterPanelTitle').html(title);
	$('#encounterPanelName').html(name);
	$('#encounterImage').attr('src', 'img/pics/' + imageSrc);
	$('#combatImage').attr('src', 'img/pics/' + imageSrc); // Set this for combat as well, in case we need to enter that mode.
	$('#encounterText').html(text);
	
	$('.btn-combat').hide();
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
	$('#combatPanel').show();

	$('.btn-action').hide();
	$('.btn-response').hide();
	$('.btn-combat').show();
	$('#execute').attr('disabled', true);
}

function setResponseButton(id, code) {

	var v = code.split(':');
	$(id).html(v[1]);
	$(id).removeClass('btn-light btn-dark btn-primary btn-info btn-success btn-warning btn-danger').addClass(v[0]);
}

function handleClick(id) {
	switch(id) {
		// Encounter Buttons
		case 'converse':
			setEncounter('converse', 'Dream of Freedom City', 'Sanctum of the Gentlemen (In Conversation)', 'Encounter_Gentlemen.png', 
				'The wizard leader says stuff. How do you react?', 'btn-success:Happy', 'btn-warning:Sad', 'btn-danger:Angry', '');
			break;
		case 'attack':
			setEncounter('combat', 'Dream of Freedom City', 'Fighting a Harvester', 'Combat_01.png', 
				'Attacking the wizard was not a wise decision. He summons a viscious-looking spectral creature known as a Harvester. It appears intent on swallowing your soul.', 'btn-danger:Fight!', '', '', '');
			break;
			
		// Combat Buttons
		case 'flee':
			setEncounter('converse', 'Dream of Freedom City', 'Outside the Sanctum', 'Encounter_Hedonists.png', 
				'You flee from the scary-looking Harvester. You find yourself outside on the sidewalk, being approached by some crazy-looking partiers.', '', '', '', '');
			break;
		case 'wait':
			updateCombatText("The Harvester hesitates. He honestly didn't expect you to just sit there.");
			break;
		case 'examine':
			updateCombatText("The Harvester is an embodiment of pure rage.");
			break;
		case 'execute':
			performManeuver();
			break;
			// Response Buttons
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
		// No button handler defined
		default:
			setEncounter('', 'Dream of Freedom City', 'Sanctum of the Gentlemen', 'Encounter_Gentlemen.png', 
				"You have been waylaid by a group of fierce-looking yuppie wizards. You should <b>converse</b> with them, or <b>attack</b> them. It's up to you, really. Seriously. Click either the 'Converse' or 'Attack' button, just below this text.", '', '', '', '');
		break;
	}
}

function updateCombatText(text) {
	$('#combatText').html(text);
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
	
	// Clear all DDLs 
	$('#ddlSimpleStrength').val('');
	$('#ddlSimpleLevel').val('');
	$('#ddlTypedDamage').val('');
	$('#ddlTypedLevel').val('');
	$('#ddlTypedStrength').val('');
	
	// Hide all combat panels.
	$('.combatCustomPanel').hide();
	$('#execute').removeAttr('disabled');

	switch(selectedVal) {
		case 'restore':
			$('#combatConfigureSimplePanel').show();
			break;
		case 'attack':
			$('#combatConfigureTypedPanel').show();
			break;
		case 'shield':
			$('#combatConfigureTypedPanel').show();
			break;
		case 'boostsuperego':
			$('#combatConfigureSimplePanel').show();
			break;
		case 'boostid':
			$('#combatConfigureSimplePanel').show();
			break;
		case 'wish':
			$('#combatAlterRealityPanel').show();
			break;
		default:
			$('#execute').attr('disabled', true);
			break;
	}
	updateCombatEffectsPanel();
}

function ddlPracticedChange(ctrl) {
	var selectedVal = $(ctrl).find(':selected').val();
	var selectedText = $(ctrl).find(':selected').text();
	
	if (selectdVal = '') {
		$('#execute').attr('disabled', true);
	}
	else {
		$('#execute').removeAttr('disabled');
	}
	
	updateCombatEffectsPanel();
}

function updateCombatEffectsPanel() {
	// var newText = "(Select and configure maneuver to see effect and cost.)";
	
	var radioVal = $('input[name="radioExecute"]:checked').val();
	var newText = radioVal;
	
	if (radioVal == "practiced") {
		var selected = $('#ddlPracticed').find(':selected').val();
		if (selected != '') {
			newText = dictPracticedManeuversStatus[selected];
		}
	}
	else if (radioVal == "spontaneous") {
		var m = getSpontaneousManeuver();
		newText = m.getCombatEffectsText();
	}
	
	$('#combatEffectsPanel').html(newText);
}

function getSpontaneousManeuver() {
	var m;
	var chosen = $('#ddlSpontaneousType').find(':selected').val();
	
	var simpleStrength = $('#ddlSimpleStrength').find(':selected').val();
	var simpleLevel = $('#ddlSimpleLevel').find(':selected').val();
	
	var typedDamage = $('#ddlTypedDamage').find(':selected').val();
	var typedLevel = $('#ddlTypedLevel').find(':selected').val();
	var stypedStrength = $('#ddlTypedStrength').find(':selected').val();
	
	
	switch(chosen) {
		case 'restore': m = new RestoreConfidence(simpleStrength, simpleLevel, false); break;
		case 'attack': m = new UnleashAttack(typedDamage, stypedStrength, typedLevel, false); break;
		case 'shield': m = new CreateShield(typedDamage, stypedStrength, typedLevel, false); break;
		case 'boostsuperego': m = new BoostSuperego(simpleStrength, simpleLevel, false); break;
		case 'boostid': m = new BoostId(simpleStrength, simpleLevel, false); break;
		case 'wish':
			newText = "(Misc. effects that target creature or player. Cost is 2x higher than equivalent practiced maneuver.)"; 
			break;
		default:
			break;
	}
	return m;
}

function performManeuver() {
	// Determine maneuver
	var radioVal = $('input[name="radioExecute"]:checked').val();
	
	if (radioVal == "practiced") {
		var selected = $('#ddlPracticed').find(':selected').val();
		updateCombatText("You execute " + dictPracticedManeuvers[selected] + ". The Harvester is unimpressed.");
	}
}