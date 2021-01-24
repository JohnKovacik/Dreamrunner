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
