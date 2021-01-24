/*
	Character Class 
	
	This class defines all of the attribues and abilities of the player character. It is a persistent class, maintained in the database.
	
 */

/*
	Realm classes
	
	Realm classes define the starting encounters, as well as maintain states such as the Id/Superego shift, and what unique encounters have occurred. 
	Realm classes are a semi-persistent state, maintained while the dreamrunner is present, but which resets once they leave.
	
 */

class Realm {
	constructor(nodeId, realmName, initialEncounterNodeId) {
		
		// Increments each time an encounter occurs, based on nodeId. 
		// Unique encounters will only be shown once per Realm instance.
		// Conditional encounters will not be shown unless all of their requirement nodes have been visited. 
		this._encounterCounter = { };
	}
	
}


/*
	Encounter classes
	
	Encounters fall into a few general categories. 
		Narrative encounters have multiple pages of text, and support Previous, Next, and OK options. 
		Combat encounters have a single page of descriptive text, and a number of combat-related options.
		Choice encounters have a single page of descriptive text, and multiple options that lead to other choices, narratives, or combat.
		Random encounters are invisible, and provide a weighted list of other encounters, from which one is randomly selected.
 */
class Encounter {
	constructor(nodeId, encounterName, encounterImage, hideClassList, showClassList, choiceDictionary, buttonConfiguration) {
		this._nodeId = nodeId;
		this._encounterName = encounterName;
		this._encounterImage = encounterImage;
		this._hideClassList = hideClassList;
		this._showClassList = showClassList;
		this._choiceDictionary = choiceDictionary;
		this._buttonConfiguration = buttonConfiguration;
	}
	
	getHideClassList() { return this._hideClassList; }
	getShowClassList() { return this._showClassList; }

	setEncounterText(encounterText) {
		this._encounterTextArray = [ encounterText ];
	}

	setEncounterTextArray(encounterTextArray) {
		this._encounterTextArray = encounterTextArray;
	}
	
	getEncounterText(zeroBasedPage) {
		return this._encounterTextArray[zeroBasedPage];
	}
	
	getEncounterMaxPage() {
		return this._encounterTextArray.length;
	}
	
	getChoiceDictionary() {
		return this._choiceDictionary;
	}
	
	getButtonConfiguration() {
		return this._buttonConfiguration;
	}
}

// TO DO: Combine narrative and choice to single encounter. Allow for page turning until choice is made.
class NarrativeEncounter extends Encounter {
	constructor(nodeId, encounterName, encounterImage, encounterTextArray, conclusionNodeId) {
		var choiceDictionary = { 'OK' : { 'node' : conclusionNodeId, 'code' : 'btn-primary' } };
		super(nodeId, encounterName, encounterImage, '.btn-combat,.btn-response', '.btn-page', choiceDictionary);
		super.setEncounterTextArray(encounterTextArray);
	}
}

class ChoiceEncounter extends Encounter {
	constructor(nodeId, encounterName, encounterImage, encounterTextArray, choiceDictionary) {
		super(nodeId, encounterName, encounterImage, '.btn-combat,.btn-page,.btn-response', '', choiceDictionary);
		super.setEncounterTextArray(encounterTextArray);
	}
	
	
}

class CombatEncounter extends Encounter {
	constructor(nodeId, encounterName, encounterImage, encounterText, conclusionNodeId) {
		super(nodeId, encounterName, encounterImage, '', '', {});
	}
}

class RandomEncounter extends Encounter {
	constructor(nodeId, weightedNodeDictionary) {
		super(nodeId, '', '', '', '', {});
	}
}

/*
	Combat Maneuver classes
 */

class Maneuver {
	constructor(strength, level, isPracticed, effectType, lucidityCost, idCost, superegoCost, dice, dieType, bonus, actionType, altResultText, _incompleteEffectsText) {
		this._strength = strength;
		this._level = level;
		this._isPracticed = isPracticed;
		this._effectType = effectType;
		this._lucidityCost = lucidityCost;
		this._idCost = idCost;
		this._superegoCost = superegoCost;
		this._dice = dice;
		this._dieType = dieType;
		this._bonus = bonus;
		this._actionType = actionType;
		this._altResultText = altResultText;
		this._incompleteEffectsText = _incompleteEffectsText;
	}
	
	getCombatEffectsText() {
		if (this._incompleteEffectsText != '') {
			return this._incompleteEffectsText;
		}
		
		var averageResult = Math.floor((((1 + this._dieType) / 2) * this._dice) + parseInt(this._bonus));
		var text = "<b>Cost:</b> " + 
			(this._lucidityCost > 0 ? (this._isPracticed ? Math.floor(this._lucidityCost / 2) : this._lucidityCost) + " Lucidity" : (this._idCost > 0 || this._superegoCost > 0 ? "" : "(No Cost)")) + 
			(this._idCost > 0 ? (this._lucidityCost > 0 ? ", " : "") + this._idCost + " Id" : "") +
			(this._superegoCost > 0 ? (this._lucidityCost > 0 ? ", " : "") + this._superegoCost + " Superego" : "") +
			"<br/><b>Effect: </b>" + this._strength + " Level " + this._level + " " + this._effectType + " " + this._actionType +
			"<br/><b>Result: </b>" + (this._altResultText != "" ? this._altResultText : 
				(this._dice > 0 ? this._dice + "d" + this._dieType + " " : "") + 
				(this._bonus > 0 ? (this._dice > 0 ? "+ " : "" ) + this._bonus + " " : "") + 
				(this._dieType > 0 ? "(<i>Est. " + averageResult + "</i>) "  : "") + this._effectType + " " + this._actionType);
		return text;
	}
}

class RestoreConfidence extends Maneuver {
	constructor(strength, level, isPracticed) {
		var lCost = level;
		var diePerLevel;
		var bonus;
		switch(strength) {
			case "Weak": lCost = Math.floor(lCost / 2); diePerLevel = 1; bonus = 0; break;
			case "Normal" : diePerLevel = 2; bonus = level * 1; break;
			case "Strong" : lCost *= 2; diePerLevel = 3; bonus = level * 2; break;
			case "Epic" : lCost *= 4; diePerLevel = 4; bonus = level * 4; break;
		}
		var incompleteEffectsText = '';
		if (strength == '' || level == '') {
			incompleteEffectsText = "(Select Level and Strength.)";
		}
		
		super(strength, level, isPracticed, 'Confidence', lCost, 0, 0, (diePerLevel * level), 6, bonus, 'Boost', '', incompleteEffectsText);
	}
}

class BoostId extends Maneuver {
	constructor(strength, level, isPracticed) {
		var lCost = level;
		var die;
		var bonus;
		switch(strength) {
			case "Weak": lCost = Math.floor(lCost / 2); die = 4; bonus = 0; break;
			case "Normal" : die = 6; bonus = level * 1; break;
			case "Strong" : lCost *= 2; die = 8; bonus = level * 2; break;
			case "Epic" : lCost *= 4; die = 12; bonus = level * 4; break;
		}
		var incompleteEffectsText = '';
		if (strength == '' || level == '') {
			incompleteEffectsText = "(Select Level and Strength.)";
		}
		
		super(strength, level, isPracticed, 'Id', lCost, 0, level, level, die, bonus, 'Boost', '', incompleteEffectsText);
	}
}

class BoostSuperego extends Maneuver {
	constructor(strength, level, isPracticed) {
		var lCost = level;
		var die;
		var bonus;
		switch(strength) {
			case "Weak": lCost = Math.floor(lCost / 2); die = 4; bonus = 0; break;
			case "Normal" : die = 6; bonus = level * 1; break;
			case "Strong" : lCost *= 2; die = 8; bonus = level * 2; break;
			case "Epic" : lCost *= 4; die = 12; bonus = level * 4; break;
		}
		var incompleteEffectsText = '';
		if (strength == '' || level == '') {
			incompleteEffectsText = "(Select Level and Strength.)";
		}
		
		super(strength, level, isPracticed, 'Superego', lCost, level, 0, level, die, bonus, 'Boost', '', incompleteEffectsText);
	}
}

class UnleashAttack extends Maneuver {
	constructor(type, strength, level, isPracticed) {
		var cost = level;
		var dice;
		var bonus;
		switch(strength) {
			case "Weak": cost = Math.floor(cost / 2); dice = (3 * level) + 1; bonus = 0; break;
			case "Normal" : dice = (3 * level) + 2; bonus = 1; break;
			case "Strong" : cost *= 2; dice = (3 * level) + 2; bonus = 3; break;
			case "Epic" : cost *= 4; dice = (3 * level) + 3; bonus = 5; break;
		}
		var incompleteEffectsText = '';
		if (type == '' || strength == '' || level == '') {
			incompleteEffectsText = "(Select Type, Level and Strength.)";
		}
		
		var lCost = (type == "Physical" ? 0 : cost);
		var idCost = (type == "Physical" ? Math.floor(cost / 2) : 0);
		
		super(strength, level, isPracticed, type, lCost, idCost, 0, dice, 6, bonus, 'Attack', '', incompleteEffectsText);
	}
}

class CreateShield extends Maneuver {
	constructor(type, strength, level, isPracticed) {
		var lCost;
		var bonus;
		switch(strength) {
			case "Weak": bonus = 3 * level; break;
			case "Normal" : bonus = 5 * level; break;
			case "Strong" : bonus = 8 * level; break;
			case "Epic" : bonus = 12 * level; break;
		}
		lCost = Math.floor(bonus / 10);
		var incompleteEffectsText = '';
		if (type == '' || strength == '' || level == '') {
			incompleteEffectsText = "(Select Type, Level and Strength.)";
		}
		
		super(strength, level, isPracticed, type, lCost, 0, 0, 0, 0, bonus, 'Shield', '', incompleteEffectsText);
	}
}