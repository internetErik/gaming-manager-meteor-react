import { Mongo } from 'meteor/mongo';

import { simpleRoll } from '../util/dice';

export const Battles = new Mongo.Collection('battles');

Meteor.methods({
	'battle.insert' : battle => {
		if (battle) {
			battle.createDate  = Date.now();
			battle.complete    = false;
			battle.combatPhase = -1;
			return Battles.insert(battle);
		}
	},
	'battle.remove' : _id => Battles.remove({ _id }),
	'battle.update' : (_id, battle) => {
		const { combatPhase, combatants } = battle;
		// if everyone has submitted their action, we roll for their initiative
		if (combatPhase === 0 && combatants.every(c => c.actionSubmitted || c.roundsOccupied > 0 )) {
	    battle.combatants = combatants
		    .map(c => {
		      c.initiative =
		      	(c.roundsOccupied > 0) ?  0 : simpleRoll(100) + (c.bonus || 0);
		      return c;
		    })
		    .sort((a, b) => (
		        (a.initiative > b.initiative) ? -1
		      : (a.initiative < b.initiative) ? 1
		      : 0
		    ));

			battle.combatPhase = 1;
		}

		return Battles.update({ _id }, battle);
	},
	'battle.finish' : _id => Battles.update({ _id }, { $set: { complete : true } }),
});
