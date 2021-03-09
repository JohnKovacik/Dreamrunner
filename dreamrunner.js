
var encounterState = '';
var currentEncounter;
var character;
var page = 0;

// Page initialization
$(function () {
	// Site Initialization
	character = new Character('Beta Tester', 100, 100, 100, 0, 0, 2, 2048, 1812);
	updateCharacterDisplay();
	
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
	// setEncounter('', 'Dream of Freedom City', 'Sanctum of the Gentlemen', 'Encounter_Gentlemen.png', 
		// "<p>You have been waylaid by a group of fierce-looking yuppie wizards. You should <b>converse</b> with them, or <b>attack</b> them.</p><p>It's up to you, really.</p>", '', '', '', '');

	currentEncounter = AndroidDreamsNodes['AD-START'];
	displayEncounter();
	
	setPracticedManeuversStatusDictionary();
})

function updateCharacterDisplay() {
	$('#characterName').text(character._name);
	
	$('#lethargyVal').html(formatCharValue(character._lethargy));
	$('#lucidityVal').html(formatCharValue(character._confidence));
	$('#confidenceVal').html(formatCharValue(character._confidence));
	$('#idVal').html(formatCharValue(character._id));
	$('#superegoVal').html(formatCharValue(character._superego));

	$('#lethargyMaxVal').text(character._maxLethargy);
	$('#lucidityMaxVal').text(character._maxLucidity);
	$('#confidenceMaxVal').text(character._maxConfidence);
	$('#idMaxVal').text(character._maxId);
	$('#superegoMaxVal').text(character._maxSuperego);

	$('#egoVal').text(character._ego);
	$('#experiencesVal').text(character._experiences);
	$('#ephemeraVal').text(character._ephemera);
}

function formatCharValue(rawValue) {
	return (rawValue < 100 ? "&nbsp;" : "") + (rawValue < 10 ? "&nbsp;" : "") + rawValue;
}

function displayEncounter() {
	
	// Set UI 
	// TO DO: Get title from Realm object
	$('#encounterPanelTitle').html('Android Dreams'); // Taken from current realm

	$('#encounterPanelName').html(currentEncounter._encounterName);

	console.log(currentEncounter.getPanelType());
	switch (currentEncounter.getPanelType()) {
		case 'narration': 
			$('#encounterPanel').show(); 
			$('#combatPanel').hide(); 
			$('#encounterImage').attr('src', 'img/pics/' + currentEncounter._encounterImage);
			$('#encounterText').html(currentEncounter.getEncounterText(page));
			break;
		case 'combat': 
			$('#encounterPanel').hide(); 
			$('#combatPanel').show(); 
			$('#execute').attr('disabled', true); 
			$('#combatImage').attr('src', 'img/pics/' + currentEncounter._encounterImage); 
			updateCombatText(currentEncounter.getEncounterText(page));
			break;
	}
	


	var hideList = currentEncounter.getHideClassList();
	var showList = currentEncounter.getShowClassList();

	if (hideList != '') { $(hideList).hide(); }
	if (showList != '') { $(showList).show(); }

	var maxPage = currentEncounter.getEncounterMaxPage();
	page > 0 ? $('#prev').show() : $('#prev').hide();
	page < (maxPage - 1) ? $('#next').show() : $('#next').hide();
	var showButton = (page == (maxPage - 1));

	// Update choice buttons
	var i = 1; 
	var choices = currentEncounter.getChoiceDictionary();
	for (var key in choices) {
		if (choices.hasOwnProperty(key)) {
			var o = choices[key];
			setChoiceButton('#response' + i++, key, o.code, showButton);
		}
	}

}

function setChoiceButton(id, text, code, showButton) {
	$(id).html(text);
	$(id).removeClass('btn-light btn-dark btn-primary btn-info btn-success btn-warning btn-danger').addClass(code);
	showButton ? $(id).show() : $(id).hide();
}

function handleClick(id) {
	$('#' + id).blur(); 
	
	switch(id) {
		// Narrative Page Buttons
		case "prev": page--; displayEncounter(); break;
		case "next": page++; displayEncounter(); break;
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
		case 'response1':
		case 'response2':
		case 'response3':
		case 'response4':
			handleResponseClick(id);
			break;
		// No button handler defined
		default:
			setEncounter('', 'Dream of Freedom City', 'Sanctum of the Gentlemen', 'Encounter_Gentlemen.png', 
				"You have been waylaid by a group of fierce-looking yuppie wizards. You should <b>converse</b> with them, or <b>attack</b> them. It's up to you, really. Seriously. Click either the 'Converse' or 'Attack' button, just below this text.", '', '', '', '');
		break;
	}
}

function handleResponseClick(id) {
	var key = $('#' + id).html();
	var choices = currentEncounter.getChoiceDictionary();
	var node = choices[key].node;
	currentEncounter = AndroidDreamsNodes[node];
	page = 0;
	displayEncounter();
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