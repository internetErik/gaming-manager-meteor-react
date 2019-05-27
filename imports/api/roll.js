import { Mongo } from 'meteor/mongo';

export const Roll = new Mongo.Collection('roll');

Meteor.methods({
	'roll.insert' : roll => {
		roll.createDate = Date.now();
		return Rolls.insert(roll);
	},
	'roll.clear' : campaignId => Rolls.remove({ campaignId }),
});