var DreamrunnerCombat = DreamrunnerCombat || {};

DreamrunnerCombat.rollDice = function(amount, type, bonus) {
	
	var result = 0;
	for (i = 0; i < amount; i++) {
		result += Math.floor(Math.random() * Math.floor(type)) + 1;
	}
	result += bonus;
	return result;
}