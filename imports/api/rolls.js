import { Mongo } from 'meteor/mongo';

export const Rolls = new Mongo.Collection('rolls');

Meteor.methods({
	insertRoll : roll => {
		roll.createDate = Date.now();
		return Rolls.insert(roll);
	},
	clearRolls : campaignId => Rolls.remove({campaignId: campaignId}),
});