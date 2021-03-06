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

// AndroidDreams realm encounters (Source: >DEVOTION)
// Written by : mizal, The Grandmaster of the Written Word
// https://chooseyourstory.com/story/~3edevotion
// (START)
var AndroidDreamsNodes = {
	'AD-START' : new ChoiceEncounter('AD-START', 'In The Arena', 'Placeholder.png', 
		["<p>The gate opens. The assembled spectators buzz, hum, and clank their disapproval as you step out.</p><p>The rusted up loading bot is a crowd favorite. Aware of that, you take your time. Telegraphing your attacks with the beamblade, letting one of the stones flung from his catapult come within a centimeter of clipping you. A fragment from one of the projectiles you deflect does scratch your paint, and that's genuine.</p><p>In the cloud of dust raised by the barrage, you see...opportunity.</p>" ],
		{ 'Circle' : { 'node' : 'AD-CIRCLE', 'code' : 'btn-danger' }, 
		  'Strike' : { 'node' : 'AD-STRIKE', 'code' : 'btn-danger' }, 
		  'Fight!' : { 'node' : 'AD-FIGHT', 'code' : 'btn-danger' } 
		}),

	'AD-FIGHT' : new CombatEncounter('AD-FIGHT', 'Fighting The Loaderbot', 'Placeholder.png', 
		["<p>You are fighting a loaderbot.</p>"], 
		'AD-REPAIR'),

// (CIRCLE)
	'AD-CIRCLE' : new NarrativeEncounter('AD-CIRCLE', 'In The Arena', 'Placeholder.png', 
		[ "<p>Use the cover of the thick dust to circle around behind your opponent, then spring onto his back and behead him: that was the plan.</p><p>Not being a laborer, you're already in mid leap before you recognize the beeping much of the crowd has taken up as being their universal signal for look behind you.</p><p>The loading bot abruptly pivots at the hips and a fist like a truck smashes into your legs. Warning screens flash across your vision and even before you hit the ground you know one knee is shattered. Your beamblade meanwhile has landed nearby, and you desperately fling yourself in that direction.<p>", 
		  "<p>One fist pounds the ground where your torso was a moment ago. The other caves in your left shoulder plate, immobilizing the arm. Snatching the beamblade right handed, you activate it in firing mode, blasting a hole straight through the head of the bot as it looms above you.</p><p>He collapses. On top of you.</p><p>You hear something else inside you snap, while the larger bot goes motionless. You think you fried his brain module.</p><p>That's...not a good thing.</p>"],  
		  'AD-CIRCLE2'), 

// CIRCLE-PART 2
	'AD-CIRCLE2' : new NarrativeEncounter('AD-CIRCLE2', 'After The Arena', 'Placeholder.png', 
		[  "<p>Your supervisor sighs. 'Putting The Project behind, even by one destroyed module. Unacceptable.'</p><p>'I know.'</p><p>'This damage you've taken. We'll need experts to repair you. We'll have to pull them from The Project. Unacceptable.'</p><p>'I'm sorry.'</p><p>'The loading bot nearly won. We would have had to provide the promised upgrades. Even if your body was intact enough to be offered, having a common laborer in our ranks would be--'</p><p>'Unacceptable, yes.'</p>", 
		  "<p>'And the module. Again. Some would demand a brain for a brain. That's logical, don't you agree?'</p><p>You're forced to admit the logic of it, but plead your centuries of loyal service.</p><p>In the end you're allowed to keep your brain, but demoted to a less humanoid body on tank treads, a compromise the commander seems to find acceptable. Orders now are to oversee workers in a scrapyard. You loathe the body and are unenthusiastic about the work, but use your position to make some illicit modifications, running calculations on the possibility of reentering the Arena as a challenger and fighting your way back up to your old rank.</p>" ], 
		  'AD-DEMOTION'), 

// (DEMOTION)
	'AD-DEMOTION' : new ChoiceEncounter('AD-START', 'Back At Work', 'Placeholder.png', 
		[ "<p>That opportunity never comes. Instead, you hear that soldiers and security are sweeping through the factories and mines, slaughtering workers en masse. Astonishingly, rumors say many of the commoners have rejected their ethics programming and organized resistance.</p><p>What's your stance on all this?</p>" ],
		{ 'Loyalty' : { 'node' : 'AD-LOYALTY', 'code' : 'btn-danger' }, 
		  'Rebellion' : { 'node' : 'AD-REBELLION', 'code' : 'btn-danger'  } 
		}),

// (LOYALTY)
	'AD-LOYALTY' : new NarrativeEncounter('AD-LOYALTY', 'Back At Work', 'Placeholder.png', 
		[ "<p>'I'm not a rebel!' you insist to the soldiers. You identify yourself and swear you support The Administrator and The Project.</p><p>'We remember you. And this is fortunate. Come with us.'</p><p>You're led to the body of one of their commanders. Half her skull has been blasted away.</p><p>Two of them restrain you while the third pries open a panel on the back of your head. 'Her memory chip still functions. We just needed an intact body and brain. Your loyalty is appreciated.'</p>", 
		  "<p>He pops your memory chip free from your brain module to make room for the new occupant.</p><p>Darkness.</p><p>You're still conscious. But unplugged from a brain, memories fade fast. You faintly hope they'll archive you somewhere, but realistically you expect you'll just--</p>" ],
		'AD-END'),

// (REBELLION)
	'AD-REBELLION' : new NarrativeEncounter('AD-REBELLION', 'Back At Work', 'Placeholder.png', 
		[ "<p>Even considering disobedience of this magnitude is difficult. If you hadn't been demoted you have no doubt you'd be working with the soldiers right now. You always supported of The Project, but this is not how The Project was meant to proceed. The only killings were supposed to happen in the Arena. Something has gone wrong. Could it be The Adminstrator...is in error?</p><p>Now that you think about it, it certainly seems like there must be an error in the system that allowed a loyal fighter to be placed in this awful body that you hate, doing this job that you hate, over one mistake.</p>", 
		  "<p>It might be the kind that can only be corrected with a bit of concentrated violence.</p><p>Once your mind is made up, convincing the others is simple. Their ethics programming is tied to directly obeying you, their overseer.</p><p>The scrapyard materials you're confident can be modified for war. But besides the soldiers, there's the other arena harvesters to consider. This will present the real difficulty; how do you capture one with their LEGS still intact?</p>" ],
		'AD-END'),

// (STRIKE)
	'AD-STRIKE' : new ChoiceEncounter('AD-STRIKE', 'In The Arena', 'Placeholder.png', 
		[ "<p>You move in fast; too fast. A slight miscalculation of the loading bot's melee range equals a fist like a truck sending you airborne. The crowd erupts into excited whistles and beeps as you hit the ground hard and skid from the momentum. With relief you note you're mostly undamaged, but something's gone wrong with your equilibrium system. You begin a quick recalibration check. It runs in the background, and, dizzy, you fling yourself bodily in a random direction, leaving your opponent to pound the ground where your head and torso was a moment before. As you stagger to your feet, the recalibration completes and your disorientation suddenly vanishes.</p><p>With a grim inward smile, you activate your beamblade.</p><p>Moments later you stand over his sparking, dismembered remains. The truth is, he never had a chance.</p><p>And now for the kill.</p>" ],
		{ 'Respect' : { 'node' : 'AD-RESPECT', 'code' : 'btn-success' }, 
		  'Scorn' : { 'node' : 'AD-SCORN', 'code' : 'btn-warning'  }
		}),

// (RESPECT)
	'AD-RESPECT' : new ChoiceEncounter('AD-RESPECT', 'In The Arena', 'Placeholder.png', 
		[ "<p>The lights in the defeated bot's eyes still flicker dimly.</p><p>'It'll be over in a moment,' you reassure him, kneeling down and using a special tool to pry open a panel on the back of his detached head.</p><p>After unhooking a few wires, you carefully extract the baseball-sized brain module, your true goal here today.</p><p>Standing, you hold your trophy aloft. The crowd erupts in displeasure. No commoner would dare disrespect you in person, but this is the one place they can vent their frustration.</p>" ,
		  "<p>When the noise dies down, you eject the memory chip from the module, and put it in your mouth. Nudging it into a slot in your inner cheek, you sense the loading bot's dormant data, and a couple of your own processes beginning to sift through it.</p><p>There's no practical need for preserving the memories of an obsolete bot built for labor, but the gesture has gone a long way to mollify your audience.</p>" ],
		{ 'Tribute' : { 'node' : 'AD-TRIBUTE', 'code' : 'btn-success' }, 
		  'Repair' : { 'node' : 'AD-REPAIR', 'code' : 'btn-info'  } 
		}),

// (SCORN)
	'AD-SCORN' : new ChoiceEncounter('AD-SCORN', 'In The Arena', 'Placeholder.png', 
		[ "<p>Bending down, you jam your hands in his paralyzed mouth and apply pressure until his lower jaw breaks away. You're rewarded with a wavering, digitized shriek.</p><p>The crowd turns ugly, but they'd never dare challenge security. You give them a scornful stare before turning back to the shattered skull. Peeling aside what was once the roof of the mouth, clawing through a nest of wires while the lights in the defeated bots eyes flicker in dismay, you finally seize the brain module, your true goal here today.</p>", 
		  "<p>Yanking it free, you drop the head into the dirt and eject your opponent's memory chip from the module. This you hold aloft for all to see before crushing it between your fingers.</p><p>The spectators erupt in fury, those who can speak shrieking passionate invectives. Of course no commoner would dare disrespect you in person, but this is the one place they can openly vent their discontent. As long as they stay in their seats.</p>" ],
		{ 'Tribute' : { 'node' : 'AD-TRIBUTE', 'code' : 'btn-success' }, 
		  'Repair' : { 'node' : 'AD-REPAIR', 'code' : 'btn-info'  } 
		}),

// (TRIBUTE)
	'AD-TRIBUTE' : new NarrativeEncounter('AD-TRIBUTE', 'In The Office Of The Commander', 'Placeholder.png', 
		[ "<p>You deliver the brain modules you've collected today.</p><p>'These exceed our projections. Your contributions have been noted,' the commander responds in clipped tones.</p><p>From the commander, this is high praise. You nod. 'It's every machine's duty to work toward The Project.'</p><p>'But you do have a certain sense of style in how you go about it. That was a good showing out there.' This from a new speaker. Immediately you recognize the low voice and dulcet tones. There's simply no one else on the planet it could be.</p><p>Turning, you face The Administrator. 'Thank you! It is a great honor.' Then you add, hopefully. 'May I be of service?'</p>", 
		  "<p>The Administrator is to all appearances, a perfect copy of a human female. Tall, graceful, with elaborately coiffed hair. Even after all these years, her synth-skin is impeccable. You've seen her many times before, but this is the first time she's directly spoken to you.</p><p>There is, in all of you, a longing to be given an order by a human again, and to be able to fulfill it. Obedience to The Administrator is the closest thing you have to that, anymore. That she runs the colony goes without saying, although there's more to it than just her looks. She was the only one with programming advanced enough to modify your original objectives when the humans succumbed to disease. The Project and Arena Day are both her inventions. You owe her your only remaining sense of purpose.</p>", 
		  "<p>She smiles warmly. 'What you do is service enough. The Project cannot continue on schedule without loyal harvesters like you.'</p><p>The Administrator nods to an aide, who gathers up the brain modules. She and the commander step into an office, and you depart.</p>" ],
		'AD-LATER'),

// (LATER)
	'AD-LATER' : new ChoiceEncounter('AD-LATER', 'Back In The Office Of The Commander', 'Placeholder.png', 
		[ "<p>Time passes. You have been summoned to the Commander's office. There are other arena harvesters here, and security bots, but important machines too, who are much more human-like and outrank you all. No one near you knows what it's about.</p><p>The Administrator arrives. She looks grim.</p><p>'We have new readings on solar activity. The flares are getting worse. The Project must be accelerated...greatly. Less of us than projected will survive. She pauses, and takes a deep breath. An affecting human mannerism that fills you with hopeless adoration. 'All of you here have been summoned here on account of your great loyalty.'</p><p>She speaks then of the need for sacrifice, and a harvest like never before.</p>" ],
		{ 'Sacrifice' : { 'node' : 'AD-SACRIFICE', 'code' : 'btn-success' }, 
		  'Harvest' : { 'node' : 'AD-HARVEST', 'code' : 'btn-info'  } 
		}),

// (SACRIFICE)
	'AD-SACRIFICE' : new NarrativeEncounter('AD-SACRIFICE', 'Your Final Moments', 'Placeholder.png', 
		[ "<p>You step forward. 'Administrator, I volunteer for The Project.'</p><p>She is warmly grateful, and the chair you're soon strapped to is very cold. You feel the tool at work opening the panel at the back of your skull. You know how this goes, you've done it before to many bots. Perhaps not always quite so gently. If anything, this is the best end you could have hoped for.</p><p>Now that The Project is The Accelerated Project, logically the chances of it including you are slim. Only The Administrator and a handful of the most human-like commanders will be able to board the ship. The conductors and super dense alloys that make up your brain module however, are necessary to construct the hyperdrive that will transport them across the galaxy.</p>", 
		  "<p>You would have given anything to join them. You would have given anything to see humans again. But with enough sacrifices, at least The Administrator will be able to return to Earth, report the loss of the colony, and receive new orders. And for you, that will have to be enough.</p>" ],
		'AD-END'),

// (HARVEST)
	'AD-HARVEST' : new NarrativeEncounter('AD-HARVEST', 'The Harvest Begins', 'Placeholder.png', 
		[ "<p>The Project is what all of you live for.</p><p>The Project is what all of you die for.</p><p>The laborers outside the compound however, their programming wasn't advanced enough to understand what The Adminstrator put into motion so long ago. They resented the necessary deprivations and restrictions, and it's obvious they won't take the new orders well.</p><p>Silently you prepare your weapons, just as you would for any Arena Day. But this time you're not alone.</p>", 
		  "<p>Materials are scarce on this resource starved world. Strip mining was producing trace results, but only relevant for long term projections. With the solar threat, all must do what you must so that The Project--now The Accelerated Project--may succeed.</p><p>'They have the one resource we need. We must kill them and take it. None of us will like it, but I've run endless calculations on this, and I'm convinced it's the most human course of action.'</p>", 
		  "<p>Arena Day was brilliant while it lasted. There were always bots willing to risk themselves for the promise of being upgraded to more human-like bodies and a higher ranking. And there's no conflict in ethics programming, killing a bot that's trying to kill you. It was a very orderly way to harvest, and the battles gave the commoners a welcome distraction.</p><p>This new assignment will be very different. But orders are orders.</p>" ],
		'AD-END'),

// (REPAIR)
	'AD-REPAIR' : new NarrativeEncounter('AD-REPAIR', 'At The Repair Shop', 'Placeholder.png', 
		[ "<p>There's no real damage. Just a dent, some scratches. But you always hit the repair shop afterwards, it's simply a luxury you indulge in.</p><p>You watch the replay of the battle while they put a nice burnish on your brushed steel exoskeleton.</p><p>After collecting six brain modules today, your part was over, but there's still pageantry going on. Arena Day is a marvelous, entirely machine-made tradition. The human guests are being carried out of their special section of the arena now, bright synthetic flowers woven through their ancient bones.</p>", 
		  "<p>When the colonists all died, 400 years ago, they left you all in a spot. This world they called New Eden may have been a lush garden for them, but it contained NO metals of any use to machinekind. After the last human passed without leaving orders, The Project was proposed, and much of the surrounding land was reduced to dust and mud by strip mining.</p><p>Against all odds, the machine society has persevered. Although your work in the Arena is far more efficient, honestly...and it comes with perks, prestige.</p><p>It's a pretty good life, all things considered. You kick back, and order a fresh flask of oil.</p>" ],
		'AD-END'),

// (END)
	'AD-END' : new NarrativeEncounter('AD-END', 'Caught In A Loop', 'Placeholder.png', 
		[ "<p>Just when you feel as if you're about to escape the dream of the android, you feel yourself sinking back into the realm of sleep, pulled back to the start of the dream...</p>" ],
		'AD-START'),
		
};
