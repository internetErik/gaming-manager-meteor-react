import { Mongo } from 'meteor/mongo';

export const Feats = new Mongo.Collection('feats');

Meteor.methods({
	insertFeat : feat => Feats.insert(feat),
	removeFeat : (_id, feat) => Feats.remove({ _id }),
	updateFeat : (_id, feat) => Feats.update({ _id }, feat),
});