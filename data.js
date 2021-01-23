var dictPracticedManeuvers = {
	1 : "Fire Bolt", 
	2 : "Cold Ray", 
	3 : "Bellow of Rage", 
	4 : "Shield of Conviction", 
	5 : "Invisibility", 
};

var dictPracticedManeuversStatus = {
	1 : "<b>Cost:</b> 20 Lucidity<br /><b>Effect:</b> Strong Level 8 Fire Attack<br /><b>Result:</b> 24d6+24 (<i>Est. 108</i>) Fire Damage", 
	2 : "<b>Cost:</b> 20 Lucidity<br /><b>Effect:</b> Strong Level 8 Cold Attack<br /><b>Result:</b> 24d6+24 (<i>Est. 108</i>) Cold Damage", 
	3 : "<b>Cost:</b> 24 Lucidity, 16 Superego<br /><b>Effect:</b> Strong Level 8 Id Boost<br /><b>Result:</b> 8d8 (<i>Est. 36</i>) Id Boost", 
	4 : "<b>Cost:</b> 6 Lucidity, 12 Id<br /><b>Effect:</b> Weak Level 6 Superego Boost<br /><b>Result:</b> 6d4 (<i>Est. 15</i>) Superego Boost", 
	5 : "Invisibility", 
};

class Maneuver {
	constructor(strength, level, isPracticed, effectType, lucidityCost, idCost, superegoCost, diePerLevel, dieType, bonus, actionType, altResultText, _incompleteEffectsText) {
		this._strength = strength;
		this._level = level;
		this._isPracticed = isPracticed;
		this._effectType = effectType;
		this._lucidityCost = lucidityCost;
		this._idCost = idCost;
		this._superegoCost = superegoCost;
		this._diePerLevel = diePerLevel;
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
		
		var averageResult = Math.floor((((1 + this._dieType) / 2) * this._diePerLevel * this._level) + parseInt(this._bonus));
		var text = "<b>Cost:</b> " + 
			(this._lucidityCost > 0 ? (this._isPracticed ? Math.floor(this._lucidityCost / 2) : this._lucidityCost) + " Lucidity" : (this._idCost > 0 || this._superegoCost > 0 ? "" : "(No Cost)")) + 
			(this._idCost > 0 ? (this._lucidityCost > 0 ? ", " : "") + this._idCost + " Id" : "") +
			(this._superegoCost > 0 ? (this._lucidityCost > 0 ? ", " : "") + this._superegoCost + " Superego" : "") +
			"<br/><b>Effect: </b>" + this._strength + " Level " + this._level + " " + this._effectType + " " + this._actionType +
			"<br/><b>Result: </b>" + (this._altResultText != "" ? this._altResultText : 
				(this._diePerLevel * this._level) + "d" + this._dieType + (this._bonus > 0 ? " + " + this._bonus : "") + " (<i>Est. " + averageResult + "</i>) " + this._effectType + " " + this._actionType);
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
		
		super(strength, level, isPracticed, 'Confidence', lCost, 0, 0, 0, diePerLevel, bonus, 'Boost', '', incompleteEffectsText);
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
		
		super(strength, level, isPracticed, 'Id', lCost, 0, level, 1, die, bonus, 'Boost', '', incompleteEffectsText);
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
		
		super(strength, level, isPracticed, 'Superego', lCost, level, 0, 1, die, bonus, 'Boost', '', incompleteEffectsText);
	}
}