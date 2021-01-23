var dictPracticedManeuvers = {
	1 : "Fire Bolt", 
	2 : "Cold Ray", 
	3 : "Bellow of Rage", 
	4 : "Shield of Conviction", 
	5 : "Heal", 
};

var dictPracticedManeuversStatus;

function setPracticedManeuversStatusDictionary() {
	var m1 = new UnleashAttack("Fire", "Strong", 8, true);
	var m2 = new UnleashAttack("Cold", "Strong", 7, true);
	var m3 = new BoostId("Strong", 6, true);
	var m4 = new BoostSuperego("Strong", 5, true);
	var m5 = new RestoreConfidence("Strong", 8, true);
	
	dictPracticedManeuversStatus = {
	1 : m1.getCombatEffectsText(), 
	2 : m2.getCombatEffectsText(), 
	3 : m3.getCombatEffectsText(), 
	4 : m4.getCombatEffectsText(), 
	5 : m5.getCombatEffectsText(), 
};}

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